<template>
    <md-list-item class="list" md-expand :md-ripple="false">
      <h2 class="list__title">{{ title }}</h2>
      <md-list slot="md-expand">
        <p v-if="critterList.length === 0" class="list__text">
          Critters not found
        </p>
        <md-list-item v-for="critter in critterList" :key="critter.id">
          <span
            class="list__elem"
            :class="currentCritterColor(critter)"
            @click="onSelectCritter(critter)"
          >
            {{ critter.name }}
          </span>
        </md-list-item>
      </md-list>
    </md-list-item>
</template>

<script>
// Deactivate ts until find solution to import vue material
// import { Critter } from '../shared/models/critter';
import Vue from 'vue';

export default Vue.extend({
  name: 'CritterList',
  props: {
    critterList: {
      type: Array,
      required: true,
      default: () => [],
    },
    title: {
      type: String,
      required: true,
      default: () => '',
    },
  },
  methods: {
    onSelectCritter(critter) {
      this.$emit('selectCritter', critter);
    },
    currentCritterColor(critter) {
      switch (critter.rarity) {
        case 'Common':
          return 'list__elem--common';
        case 'Uncommon':
          return 'list__elem--uncommon';
        case 'Rare':
          return 'list__elem--rare';
        case 'Ultra-rare':
          return 'list__elem--ultra-rare';
        default:
          return '';
      }
    },
  },
});
</script>

<style lang="scss" scoped>
@import '@/styles/global/_variables.scss';
@import '@/styles/mixins/_mixins.scss';

.list {
  background-color: var(--tertiary);
  border-radius: 20px;
  box-shadow: $box-shadow-sharpen;

  &__title {
    color: var(--body-color);
    font-size: rem(20px);
    font-weight: 600;
    letter-spacing: 0.5px;
  }

  &__text {
    padding: 0 16px;
  }

  &__elem {
    @include size(100%, rem(30px));
    @include flex(center, flex-start);
    transition: font-size 0.1s linear;
    font-weight: $font-weight-normal;
    text-transform: capitalize;

    &:hover {
      cursor: pointer;
      font-size: rem(18px);
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
</style>
