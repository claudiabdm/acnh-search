import Vue from 'vue';
import Vuex from 'vuex';
import { UserCritterInfo } from '@/shared/models/user-critter-info';
import { API } from 'aws-amplify';
import {
  updateUserCritterInfo,
  deleteUserCritterInfo,
} from '@/graphql/mutations';
import { getUserCritterInfo } from '@/graphql/queries';
import { GraphQLResult } from '@aws-amplify/api-graphql/lib-esm/types';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: {} as UserCritterInfo,
  },
  mutations: {
    updateUserCritterInfo(state, user) {
      state.user = user;
    },
    deleteUserCritterInfo(state) {
      state.user = {} as UserCritterInfo;
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
    async updateUserCritterInfo({ commit, state }) {
      const updatedUser = (await API.graphql({
        query: updateUserCritterInfo,
        variables: { input: { id: state.user.id } },
      })) as GraphQLResult<any>;
      commit('updateUserCritterInfo', updatedUser.data.getUserCritterInfo);
    },
    async deleteUserCritterInfo({ commit, state }) {
      commit('deleteUserCritterInfo', {});
      // await API.graphql({
      //   query: deleteUserCritterInfo,
      //   variables: { input: { id: state.user.id } },
      // }) as GraphQLResult<any>;
    },
  },
  modules: {},
});
