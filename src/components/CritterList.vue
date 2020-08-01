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

.list {
  height: max-content;
  background-color: var(--tertiary);
  border-radius: rem(20px);
  box-shadow: $box-shadow-sharpen;
  padding: 0;

  &__title {
    background-color: var(--tertiary);
    color: var(--body-color);
    font-size: rem(20px);
    font-weight: 600;
    letter-spacing: 0.5px;
  }

  &__text {
    padding: 0 16px;
    text-transform: capitalize;
    font-weight: $font-weight-normal;
  }

  &__elem {
    @include size(100%, rem(30px));
    @include flex(center, flex-start);
    font-size: rem(14px);
    font-weight: $font-weight-normal;
    text-transform: capitalize;
    transition: font-size 0.15s linear;
    will-change: font-size;
    padding: 0;

    &:hover {
      cursor: pointer;
      font-size: rem(16px);
    }

    &--common {
      color: $base;
    }

    &--uncommon {
      color: $success;
    }

    &--rare {
      color: $primary;
    }

    &--ultra-rare {
      color: $secondary;
    }
  }
}

.v-sheet.v-list:not(.v-sheet--outlined) {
  box-shadow: $box-shadow-sharpen;
}
</style>
