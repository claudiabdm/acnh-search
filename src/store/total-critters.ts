import { crittersData } from '@/shared/critters-data';
import { Critter } from '@/shared/models/critter';

export default {
  namespaced: true,
  state: {
    bugs: [] as Critter[],
    fish: [] as Critter[],
    sea: [] as Critter[],
    critterType: 'bugs',
    lang: { text: 'EU-en', value: 'name-EUen' },
    hemi: 'northern',
  },
  mutations: {
    updateBugsList(state, critterList: Critter[]) {
      state.bugs = critterList;
    },
    updateFishList(state, critterList: Critter[]) {
      state.fish = critterList;
    },
    updateSeaList(state, critterList: Critter[]) {
      state.sea = critterList;
    },
    updateCritterType(state, critterType: string) {
      state.critterType = critterType;
    },
    updateLang(state, lang: { text: string; value: string }) {
      state.lang = lang;
    },
    updateHemi(state, hemi: string) {
      state.hemi = hemi;
    },
  },
  actions: {
    async getCritterList({ commit, state, rootState }, critterType: string = state.critterType) {
      const critterList = await crittersData.loadCritters(
        critterType,
        state.lang.value,
        state.hemi,
      );
      if (rootState.user.user) {
        critterList.map((critter: Critter) => {
          critter.checked =
            rootState.user.user && rootState.user.user[critterType].includes(critter.id.toString())
              ? true
              : false;
          return critter;
        });
        critterList.sort((a: Critter, b: Critter) => (a.checked ? 1 : 0) - (b.checked ? 1 : 0));
      }
      commit(`updateCritterType`, critterType);
      commit(
        `update${critterType.slice(0, 1).toUpperCase() + critterType.slice(1)}List`,
        critterList,
      );
    },
  },
};
