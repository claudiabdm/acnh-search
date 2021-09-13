import { artData } from '@/shared/art-data';
import { Art } from '@/shared/models/art';

export default {
  namespaced: true,
  state: {
    artList: [] as Art[],
  },
  mutations: {
    updateArtList(state, artList: Art[]) {
      state.artList = artList;
    },
  },
  actions: {
    async getArtList({ commit, rootState }) {
      const artList = await artData.loadArt(rootState.lang.value);
      commit(`updateArtList`, artList.sort((a, b) => a.type.localeCompare(b.type)));
    },
  },
};
