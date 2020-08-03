<template>
  <svg class="icon">
    <use :href="`assets/svgs/sprite.svg#${name}`"/>
  </svg>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  props: {
    name: {
      type: String
    }
  }
})
</script>

<style lang="scss" scoped>
.icon {
  width: 20px;
  height: 20px;
  margin-right: 4px;
}
</style>