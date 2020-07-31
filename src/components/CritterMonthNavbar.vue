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
        <use xlink:href="assets/icons/sprite.svg#prev-arrow" />
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
        <use href="assets/icons/sprite.svg#next-arrow" />
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
@import '@/styles/global/_variables.scss';
@import '@/styles/mixins/_mixins.scss';

.month-navbar {
  @include fixed($top: 0);
  @include flex(center, space-between);
  width: 100vw;
  border-radius: 20px;
  padding: 10px;
  background-color: var(--body-bg);
  box-shadow: $box-shadow-sharpen;
  z-index: 1000;

  &__title {
    @include flex(center, flex-start);

    font-size: rem(24px);
    font-weight: 700;
  }

  &__button {
    font-size: 0;
    & + & {
      margin-left: 20px;
    }
  }
}
</style>
