<template>
  <div class="critter">
    <img :src="currentCritter.img" class="critter__img" />
    <template v-if="!currentCritter.allYear">
      <p class="critter__text">
        <span class="critter__property">Start Month:</span>
        {{ currentCritter.startMonth | formatMonth }}
      </p>
      <p class="critter__text">
        <span class="critter__property">End Month:</span>
        {{ currentCritter.endMonth | formatMonth }}
      </p>
      <p class="critter__text">
        <span class="critter__property">Available Months:</span>
        {{ currentCritter.availableMonths | formatMonth }}
      </p>
    </template>
    <p class="critter__text" v-if="currentCritter.allYear">All year</p>
    <p class="critter__text">
      <span class="critter__property">Time:</span> {{ currentCritter.time }}
    </p>
    <p class="critter__text"  v-if="currentCritter.location">
      <span class="critter__property">Location:</span>
      {{ currentCritter.location }}
    </p>
    <p class="critter__text" v-if="currentCritter.rarity">
      <span class="critter__property">Rarity:</span> {{ currentCritter.rarity }}
    </p>
    <p class="critter__text" v-if="currentCritter.shadow">
      <span class="critter__property">Shadow:</span> {{ currentCritter.shadow }}
    </p>
    <p class="critter__text">
      <span class="critter__property">Price:</span>
      {{ currentCritter.price }} bells
    </p>
    <p class="critter__text" v-if="buyerType">
      <span class="critter__property">Price {{ buyerType }}:</span>
      {{ currentCritter.priceCjFlick }} bells
    </p>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
  props: {
    currentCritter: {
      type: Object,
    },
  },
  computed: {
    buyerType(): string {
      if (this.currentCritter.type === 'fish') {
        return 'Cj';
      }
      if (this.currentCritter.type === 'bugs') {
        return 'Flick';
      }
      return '';
    },
  },
});
</script>

<style lang="scss" scoped>
@import '@/styles/global/_variables.scss';
@import '@/styles/mixins/_mixins.scss';

.critter {
  @include flex(flex-start, flex-start);
  flex-direction: column;

  &__img {
    @include size(auto, 100px);
    align-self: center;
  }

  &__text {
    padding: 5px;
    font-weight: $font-weight-normal;
    line-height: 1.25;
    margin: 0;
  }

  &__property {
    font-weight: $font-weight-bold;
  }
}
</style>
