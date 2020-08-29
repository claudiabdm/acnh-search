import Vue from 'vue';
import Vuex, { Store } from 'vuex';
import totalCrittersModule from './total-critters';
import userModule from './user';
import totalArtModule from './total-art';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    lang: { text: 'EU-en', value: 'name-EUen' },
  },
  mutations: {
    updateLang(state, lang: { text: string; value: string }) {
      state.lang = lang;
    },
  },
  modules: {
    user: userModule,
    totalCritters: totalCrittersModule,
    totalArt: totalArtModule,
  },
}) as Store<any>;
