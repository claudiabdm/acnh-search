<template>
  <CritterMain :critterType="'fish'"/>
</template>

<script lang="ts">
import Vue from 'vue';
import CritterMain from '@/components/CritterMain.vue';

export default Vue.extend({
  name: 'Fish',
  components: {CritterMain}
})
</script>

<style>

</style>