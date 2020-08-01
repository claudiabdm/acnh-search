<template>
  <md-list-item class="list" md-expand :md-ripple="false">
    <h2 class="list__title">{{ title }}</h2>
    <md-list slot="md-expand">
      <p v-if="critterList.length === 0" class="list__text">
        {{ critterType }} not found
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
    font-size: rem(13px);
    font-weight: $font-weight-normal;
    text-transform: capitalize;
    transition: font-size 0.15s linear;
    will-change: font-size;

    &:hover {
      cursor: pointer;
      font-size: rem(15px);
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
