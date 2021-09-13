<template>
  <div class="vue-container">
    <div class="vue-container__lists">
      <ArtList :artList="artListPaintings" title="Paintings" />
      <ArtList :artList="artListStatues" title="Statues" />
    </div>
  </div>
</template>
<script lang="ts">
import Vue from 'vue';
import { mapState } from 'vuex';
import { Art } from '@/shared/models/art';
import ArtList from '@/components/ArtList.vue';

export default Vue.extend({
  components: {
    ArtList,
  },
  computed: {
    ...mapState({
      artListPaintings: (state: any): Art[] =>
        state.totalArt.artList.filter(artItem => artItem.type === 'painting'),
      artListStatues: (state: any): Art[] =>
        state.totalArt.artList.filter(artItem => artItem.type === 'statue'),
    }),
  },
});
</script>
<style lang="scss" scoped>
@import '@/styles/ui/_container.scss';
@import '@/styles/ui/_form.scss';
</style>
