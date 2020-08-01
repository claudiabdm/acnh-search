<template>
  <CritterMain :critterType="'bugs'"/>
</template>

<script lang="ts">
import Vue from 'vue';
import CritterMain from '@/components/CritterMain.vue';

export default Vue.extend({
  name: 'Bugs',
  components: {CritterMain}
})
</script>

<style>

</style>