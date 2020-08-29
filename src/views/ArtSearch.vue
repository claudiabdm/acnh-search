<template>
  <div class="vue-container">
    hola
  </div>
</template>
<script lang="ts">
import Vue from 'vue';
import { mapState } from 'vuex';
import { Art } from '@/shared/models/art';

export default Vue.extend({
  computed: {
    ...mapState({
      artList(state: any): Art[] {
        return state.totalArt;
      },
    }),
  },
});
</script>
