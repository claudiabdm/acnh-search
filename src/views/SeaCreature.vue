<template>
  <CritterMain :critterType="'sea-creature'"/>
</template>

<script lang="ts">
import Vue from 'vue';
import CritterMain from '@/components/CritterMain.vue';

export default Vue.extend({
  name: 'SeaCreature',
  components: {CritterMain}
})
</script>

<style>

</style>