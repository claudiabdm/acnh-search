<template>
  <v-list class="list" :flat="true">
    <v-list-group :ripple="false">
      <template v-slot:activator>
        <v-list-item-title class="list__title">{{ title }}</v-list-item-title>
      </template>
      <p v-if="critterList.length === 0" class="list__text">
        {{ critterType }} not found
      </p>
      <v-list-item v-for="critter in critterList" :key="critter.id">
        <v-list-item-content>
          <v-list-item-title
            class="list__elem"
            :class="currentCritterColor(critter)"
            @click="onSelectCritter(critter)"
          >
            {{ critter.name }}
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list-group>
  </v-list>
</template>

<script lang="ts">
import { Critter } from '@/shared/models/critter';
import Vue from 'vue';

export default Vue.extend({
  name: 'CritterList',
  props: {
    critterType: {
      type: String,
      required: true,
      default: '',
    },
    critterList: {
      type: Array,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
  },
  methods: {
    onSelectCritter(critter: Critter) {
      this.$emit('selectCritter', critter);
    },
    currentCritterColor(critter) {
      switch (critter.rarity) {
        case 'Uncommon':
          return 'list__elem--uncommon';
        case 'Rare':
          return 'list__elem--rare';
        case 'Ultra-rare':
          return 'list__elem--ultra-rare';
        default:
          return 'list__elem--common';
      }
    },
  },
});
</script>

<style lang="scss" scoped>
@import '@/styles/global/_variables.scss';
@import '@/styles/mixins/_mixins.scss';
@import '@/styles/ui/_list.scss';

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
