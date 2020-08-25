import { UserCritterInfo } from '@/shared/models/user-critter-info';
import { API } from 'aws-amplify';
import { getUserCritterInfo } from '@/graphql/queries';
import { updateUserCritterInfo } from '@/graphql/mutations';
import { GraphQLResult } from '@aws-amplify/api-graphql/lib-esm/types';

export default {
  namespaced: true,
  state: {
    user: null as UserCritterInfo | null,
  },
  mutations: {
    updateUserCritterInfo(state, user) {
      state.user = user;
    },
    deleteUserCritterInfo(state) {
      state.user = null;
    },
  },
  actions: {
    async getUserCritterInfo({ commit }, id) {
      const user = (await API.graphql({
        query: getUserCritterInfo,
        variables: { id: id },
      })) as GraphQLResult<any>;
      commit('updateUserCritterInfo', user.data.getUserCritterInfo);
    },

    async updateUserCritterInfo(
      { commit, state },
      critterInfo: { type: string; id: string },
    ) {
      const { id } = state.user;
      const critterList: string[] = state.user[critterInfo.type];
      const updatedCritterList = {};
      if (critterList.includes(critterInfo.id)) {
        updatedCritterList[critterInfo.type] = critterList.filter(id => id !== critterInfo.id);
      } else {
        updatedCritterList[critterInfo.type] = [...critterList, critterInfo.id];
      }
      const updatedUser = (await API.graphql({
        query: updateUserCritterInfo,
        variables: {
          input: { id,  ...updatedCritterList},
        },
      })) as GraphQLResult<any>;
      commit('updateUserCritterInfo', updatedUser.data.updateUserCritterInfo);
    },

    async deleteUserCritterInfo({ commit, state }) {
      commit('deleteUserCritterInfo', {});
      // await API.graphql({
      //   query: deleteUserCritterInfo,
      //   variables: { input: { id: state.user.id } },
      // }) as GraphQLResult<any>;
    },
  },
};
