<template>
  <nav class="month-navbar">
    <button
      type="button"
      class="btn month-navbar__button"
      id="buttonPrev"
      @click="prevMonth()"
    >
      Previous Month
      <svg class="icon icon--sm">
        <use href="assets/svgs/sprite.svg#prev-arrow" />
      </svg>
    </button>
    <h2 class="month-navbar__title">{{ month | formatMonth }}</h2>
    <button
      type="button"
      class="month-navbar__button btn"
      id="buttonNext"
      @click="nextMonth()"
    >
      Next Month
      <svg class="icon icon--sm">
        <use href="assets/svgs/sprite.svg#next-arrow" />
      </svg>
    </button>
  </nav>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'CritterMonthNavbar',
  props: {
    currentMonth: {
      type: Number,
      default: () => new Date().getMonth(),
    },
  },
  data() {
    return {
      month: this.currentMonth,
    };
  },
  methods: {
    prevMonth() {
      this.month < 1 ? (this.month += 11) : (this.month -= 1);
      this.$emit('changeMonth', this.month);
    },
    nextMonth() {
      this.month >= 11 ? (this.month -= 11) : (this.month += 1);
      this.$emit('changeMonth', this.month);
    },
  },
});
</script>

<style lang="scss" scoped>
 
 

.month-navbar {
  @include fixed($top: 0, $left: 0);
  @include size(100%, $header-height);
  @include flex(center, space-between);
  width: 100vw;
  padding: 10px;
  color: var(--body-bg);
  background-color: rgba($color: $brown-100, $alpha: 0.75);
  font-family: $font-secondary;
  letter-spacing: 2px;
  backdrop-filter: blur(8px);
  box-shadow: $box-shadow-sharpen;
  z-index: 1000;

  &__title {
    @include flex(center, flex-start);
    font-size: rem(24px);
    font-weight: 700;
  }

  &__button {
    background-color: var(--body-color);
    font-size: 0;
    & + & {
      margin-left: 20px;
    }
  }

  @media screen and (min-width: $md) {
    width: 100vw - $navbar-width-desktop;
    left: $navbar-width-desktop;
    border-radius: 0;
  }
}
</style>
