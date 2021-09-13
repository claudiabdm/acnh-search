<template>
  <article class="card">
    <span class="card__property card__property--title">{{ artItem.name }}</span>
    <div class="card__group card__group">
      <img :src="artItem.img" class="card__img card__img--art" :alt="artItem.name + 'image'" />
      <div class="card__group card__group--inner">
        <p class="card__text">
          <span class="card__property">Has a fake: </span>
          <span class="card__value">{{ artItem.hasFake ? 'Yes' : 'No' }}</span>
        </p>
        <p class="card__text">
          <span class="card__property">Sell Price: </span>
          <span class="card__value">{{ artItem.sellPrice }}</span>
        </p>
        <p class="card__text">
          <span class="card__property">Buy Price: </span>
          <span class="card__value">{{ artItem.buyPrice }}</span>
        </p>
        <!-- <p class="card__text card__text--flex" v-if="user">
          <label class="card__property" :for="artItem.id">Purchased:</label>
          <v-checkbox
            class="card__value"
            @click="checkArtItem(artItem)"
            :value="artItem.checked"
            v-model="artItem.checked"
            :id="artItem.id.toString()"
            :ripple="false"
          ></v-checkbox>
        </p> -->
      </div>
    </div>
  </article>
</template>
<script lang="ts">
import { Art } from '@/shared/models/art';
import Vue from 'vue';
import { mapActions, mapState } from 'vuex';
export default Vue.extend({
  props: {
    artItem: {
      type: Object,
    },
  },
  computed: {
    ...mapState({ user: (state: any): string => state.user.user }),
  },
  methods: {
    ...mapActions('user', ['updateUserCritterInfo']),
    async checkArtItem(artItem: Art) {
      await this.updateUserCritterInfo({ id: artItem.id.toString(), type: 'art' });
    },
  },
});
</script>
<style lang="scss" scoped>
.card {
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: rem(20px);
  &__img {
    width: 100%;
    max-width: rem(128px);
    filter: drop-shadow(2px 2px 2px rgba(0, 0, 0, 0.5%));
  }
  &__property--title {
    white-space: pre-wrap;
    border-radius: rem(20px);
    margin-bottom: rem(16px);
    padding: rem(5px) rem(10px);
    color: #fff;
    background-color: $primary;
    font-weight: $font-weight-bold;
    text-transform: capitalize;
  }
  &__group {
    @include flex(center, space-between, row-reverse);
    width: 100%;
    color: $base;
    &--inner {
      width: auto;
      align-items: flex-start;
      flex-direction: column;
    }
  }
}
</style>
