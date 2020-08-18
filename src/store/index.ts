import Vue from 'vue';
import Vuex from 'vuex';
import { UserCritterInfo } from '@/shared/models/user-critter-info';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: {} as UserCritterInfo,
  },
  mutations: {
    updateCurrentUser(state, user) {
      state.user = user;
    },
  },
  actions: {
  },
  modules: {},
});
