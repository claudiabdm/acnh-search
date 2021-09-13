<template>
  <v-list class="list" :flat="true">
    <v-list-group :ripple="false">
      <template v-slot:activator>
        <v-list-item-title class="list__title">{{ title }}</v-list-item-title>
      </template>
      <template v-for="artItem in artList">
        <v-list-item v-show="artItem['show'] !== 'hide'" :key="artItem.id">
          <v-list-item-content>
            <v-list-item-title class="list__elem-group">
              <div class="list__elem">
                <ArtCard :for="artItem.id" :artItem="artItem"/>
              </div>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </template>
    </v-list-group>
  </v-list>
</template>

<script lang="ts">
import Vue from 'vue';
import ArtCard from '@/components/ArtCard.vue';

export default Vue.extend({
  name: 'ArtList',
  components: {
    ArtCard,
  },
  props: {
    artList: {
      type: Array,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
  },
});
</script>

<style lang="scss" scoped>
.theme--light.v-application {
  color: var(--body-color);
}

.theme--light.v-list-item:not(.v-list-item--active):not(.v-list-item--disabled) {
  color: var(--body-color);
}
.theme--light.v-sheet {
  background-color: var(--tertiary);
  color: var(--body-color);
}
.v-sheet.v-list:not(.v-sheet--outlined) {
  box-shadow: $box-shadow-sharpen;
}
</style>
