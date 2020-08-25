import Vue from 'vue';
import Vuex, { Store } from 'vuex';
import totalCrittersModule from './total-critters';
import userModule from './user';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    user: userModule,
    totalCritters: totalCrittersModule,
  },
}) as Store<any>;
