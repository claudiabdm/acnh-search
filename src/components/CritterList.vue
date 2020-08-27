<template>
  <v-list class="list" :flat="true">
    <v-list-group :ripple="false">
      <template v-slot:activator>
        <v-list-item-title class="list__title">{{ title }}</v-list-item-title>
      </template>
      <p v-if="visibleCritters <= 0" class="list__text">{{ critterType }} not found</p>
      <template v-for="critter in critterList">
        <v-list-item v-show="critter['show'] !== 'hide'" :key="critter.id">
          <v-list-item-content>
            <v-list-item-title class="list__elem-group">
              <div class="list__elem">
                <template v-if="user">
                  <v-checkbox
                    @click="checkCritter(critter)"
                    :value="critter.checked"
                    v-model="critter.checked"
                    :id="critter.id.toString()"
                    :ripple="false"
                  ></v-checkbox>
                </template>
                <label :for="critter.id" :class="['list__elem', currentCritterColor(critter)]">
                  {{ critter.name }}
                </label>
              </div>
              <button
                type="button"
                class="btn btn--sm btn--base btn--open-modal list__btn"
                @click="onSelectCritter(critter)"
              >
                <img :src="critter.icon" :alt="currentCritter + 'icon'" class="list__icon" />
              </button>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </template>
    </v-list-group>
  </v-list>
</template>

<script lang="ts">
import { Critter } from '@/shared/models/critter';
import Vue from 'vue';
import { mapActions, mapState } from 'vuex';

export default Vue.extend({
  name: 'CritterList',
  data() {
    return {
      selectedCritters: [] as Critter[],
    };
  },
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
  computed: {
    visibleCritters(): number {
      let countVisible = this.critterList.length;
      this.critterList.forEach((critter: any) => {
        if (critter['show'] === 'hide') {
          countVisible--;
        }
      });
      return countVisible;
    },
    ...mapState({ user: (state: any): string => state.user.user }),
  },
  methods: {
    ...mapActions('user', ['updateUserCritterInfo']),

    async checkCritter(critter: Critter) {
      await this.updateUserCritterInfo({ id: critter.id.toString(), type: this.critterType });
    },

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
