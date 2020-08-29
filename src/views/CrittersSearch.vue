<template>
  <div>
    <form class="form form--search">
      <CritterBasicSelect :search="critterSearch" @search="updateSearch" />

      <!-- CRITTER TYPE -->
      <div class="form__group">
        <v-select
          v-model="types"
          :items="critterTypeList"
          :item-text="critterTypeList.text"
          :item-value="critterTypeList.text"
          :multiple="true"
          filled
          rounded
          dense
          clearable
          label="Critter Type"
          class="form__text"
          item-color="accent"
          background-color="secondary"
          color="primary"
          @change="updateCritterList($event)"
        >
          <template v-slot:selection="{ item }">
            <v-chip small color="accent" text-color="secondary">
              <v-icon>{{ item.icon }}</v-icon>
              <strong>{{ item.text }}</strong
              >&nbsp;
            </v-chip>
          </template>
        </v-select>
      </div>
      <!-- // CRITTER TYPE -->

      <!-- CRITTER RARITY -->
      <div class="form__group">
        <v-select
          v-model="rarity"
          :items="critterRarityList"
          :item-text="critterRarityList.text"
          :item-value="critterRarityList.value"
          :multiple="true"
          filled
          rounded
          clearable
          dense
          label="Critter Rarity"
          class="form__text"
          item-color="accent"
          background-color="secondary"
          color="primary"
          @change="filterByRarity($event)"
        >
          <template v-slot:selection="{ item }">
            <v-chip small :color="item.color" text-color="secondary">
              <v-icon>{{ item.icon }}</v-icon>
              <strong>{{ item.text }}</strong
              >&nbsp;
            </v-chip>
          </template>
        </v-select>
      </div>
      <!-- // CRITTER RARITY -->

      <!-- CRITTER MONTH -->
      <div class="form__group">
        <v-select
          :items="months"
          :item-value="months.value"
          :item-text="months.text"
          :multiple="true"
          filled
          rounded
          clearable
          dense
          :menu-props="{ offsetOverflow: true }"
          label="Month"
          class="form__text"
          item-color="accent"
          background-color="secondary"
          color="primary"
          @change="filterByMonth($event)"
        >
          <template v-slot:selection="{ item }">
            <v-chip small color="accent" text-color="secondary">
              <strong>{{ item.value | formatMonth }}</strong
              >&nbsp;
            </v-chip>
          </template>
        </v-select>
      </div>
      <!-- // CRITTER MONTH -->

      <!-- CRITTER PRICE -->
      <div class="form__group form__slider">
        <label class="v-label v-label--active theme--light">Bells</label>
        <v-range-slider
          v-model="range"
          :max="max"
          :min="min"
          hide-details
          dense
          step="100"
          class="align-center"
        >
          <template v-slot:prepend>
            <v-text-field
              :value="range[0]"
              class="mt-0 pt-0"
              hide-details
              single-line
              type="number"
              style="width: 60px"
              @change="$set(range, 0, $event)"
            ></v-text-field>
          </template>
          <template v-slot:append>
            <v-text-field
              :value="range[1]"
              class="mt-0 pt-0"
              hide-details
              single-line
              type="number"
              style="width: 60px"
              @change="$set(range, 1, $event)"
            ></v-text-field>
          </template>
        </v-range-slider>
      </div>
      <!-- // CRITTER PRICE -->

      <!-- CRITTER TIME -->
      <div class="form__group form__slider form__slider--time">
        <div class="form__label">
          <label class="v-label v-label--active theme--light">Time</label>
          <div class="form__btns">
            <button class="btn btn--sm" type="button" @click="timeRange = [1, 24]">All Day</button>
            <button
              class="btn btn--sm"
              type="button"
              @click="timeRange = [new Date().getHours(), new Date().getHours() + 1]"
            >
              Now
            </button>
          </div>
        </div>
        <v-range-slider
          :tick-labels="ticksLabels"
          v-model="timeRange"
          min="1"
          max="24"
          ticks="always"
          tick-size="4"
        ></v-range-slider>
      </div>
      <!-- // CRITTER TIME -->
    </form>
    
    <div class="vue-container">
      <div class="vue-container__lists">
        <CritterList
          v-for="critterObj in critterTypeListFiltered"
          :key="critterObj.value"
          :critterType="critterObj.value"
          :title="critterObj.text"
          :critterList="critterObj.list"
          @selectCritter="toggleCritterInfo"
        />
      </div>
    </div>
    <CritterModal
      :title="currentCritter.name"
      :showModal="isModalVisible"
      v-show="isModalVisible"
      @close="toggleCritterInfo"
    >
      <CritterInfo v-if="isModalVisible" :currentCritter="currentCritter" />
    </CritterModal>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import CritterList from '@/components/CritterList.vue';
import { Critter } from '@/shared/models/critter';
import { CritterTypeObj } from '@/shared/models/critterTypeObj';
import CritterBasicSelect from '@/components/CritterBasicSelect.vue';
import CritterModal from '@/components/CritterModal.vue';
import CritterInfo from '@/components/CritterInfo.vue';
import showCritterInfo from '@/shared/useShowCritterInfo';
import { mapActions, mapMutations, mapState } from 'vuex';

export default Vue.extend({
  setup() {
    const { isModalVisible, currentCritter, toggleCritterInfo } = showCritterInfo();
    return {
      isModalVisible,
      currentCritter,
      toggleCritterInfo,
    };
  },
  components: { CritterList, CritterBasicSelect, CritterModal, CritterInfo },
  data() {
    return {
      timeRange: [1, 24],
      ticksLabels: [...Array(24).keys()].map(num => {
        num += 1;
        return num % 2 ? num : '';
      }),
      critterSearch: {
        lang: {
          text: this.$store.state.totalCritters.lang.text,
          value: this.$store.state.totalCritters.lang.value,
        },
        hemi: this.$store.state.totalCritters.hemi,
      },
      critterTypeList: [
        {
          text: 'Bugs',
          value: 'bugs',
          icon: '$vuetify.bugs',
          list: [] as Critter[],
          selected: true,
        },
        {
          text: 'Fish',
          value: 'fish',
          icon: '$vuetify.fish',
          list: [] as Critter[],
          selected: true,
        },
        {
          text: 'Sea Creatures',
          value: 'sea',
          icon: '$vuetify.seaCreature',
          list: [] as Critter[],
          selected: true,
        },
      ],
      critterRarityList: [
        {
          text: 'Common',
          value: 'common',
          color: 'primary',
          selected: false,
        },
        {
          text: 'Uncommon',
          value: 'uncommon',
          color: '#72e67d',
          selected: false,
        },
        {
          text: 'Rare',
          value: 'rare',
          color: 'accent',
          selected: false,
        },
        {
          text: 'Ultra-Rare',
          value: 'ultra-rare',
          color: '#ea526f',
          selected: false,
        },
      ],
      types: ['bugs', 'fish', 'sea'],
      min: 0,
      max: 30000,
      range: [0, 30000],
      rarity: ['common', 'uncommon', 'rare', 'ultra-rare'],
      months: [
        { value: 0, text: 'January' },
        { value: 1, text: 'February' },
        { value: 2, text: 'March' },
        { value: 3, text: 'April' },
        { value: 4, text: 'May' },
        { value: 5, text: 'June' },
        { value: 6, text: 'July' },
        { value: 7, text: 'August' },
        { value: 8, text: 'September' },
        { value: 9, text: 'October' },
        { value: 10, text: 'November' },
        { value: 11, text: 'December' },
      ],
      monthsSelected: [] as number[],
    };
  },
  created() {
    this.updateSearch(this.critterSearch);
  },
  computed: {
    ...mapState({
      bugs: (state: any): Critter[] => state.totalCritters.bugs,
      fish: (state: any): Critter[] => state.totalCritters.fish,
      sea: (state: any): Critter[] => state.totalCritters.sea,
    }),
    critterTypeListFiltered(): CritterTypeObj[] {
      return this.critterTypeList.filter((obj: CritterTypeObj) => {
        if (obj.selected) {
          obj.list = [
            ...this[obj.value].map(critter => {
              if (!critter.rarity) {
                critter['show'] = 'visible';
                return critter;
              }
              if (
                (critter.availableMonths.some(month => this.monthsSelected.includes(month)) ||
                  critter.allYear) &&
                this.rarity.includes(critter.rarity.toLowerCase()) &&
                this.filterByPrice(critter.price, critter.priceCjFlick, this.range) &&
                this.filterByTime(critter.timeArray, this.timeRange)
              ) {
                critter['show'] = 'visible';
              } else {
                critter['show'] = 'hide';
              }
              return critter;
            }),
          ];
        }
        return obj.selected;
      });
    },
  },
  methods: {
    ...mapMutations('totalCritters', ['updateLang', 'updateHemi']),
    ...mapActions('totalCritters', ['getCritterList']),
    async updateCritterList(e: string): Promise<void> {
      this.critterTypeList.forEach(async critterListObj => {
        if (e.includes(critterListObj.value)) {
          critterListObj.selected = true;
          await this.getCritterList(critterListObj.value);
          critterListObj.list = this[critterListObj.value];
        } else {
          critterListObj.selected = false;
        }
      });
    },
    async updateSearch(e: { lang: { text: string; value: string }; hemi: string }): Promise<void> {
      this.critterSearch = e;
      this.updateLang(e.lang);
      this.updateHemi(e.hemi);
      this.critterTypeList.forEach(
        async (critterListObj: CritterTypeObj) => await this.getCritterList(critterListObj.value),
      );
    },
    filterByRarity(e: string[]) {
      this.rarity = e;
    },
    filterByMonth(e: number[]) {
      this.monthsSelected = e;
    },
    filterByPrice(
      critterPrice: number,
      critterPriceCjFlick: number,
      selectedPriceRange: number[],
    ): boolean {
      return (
        (critterPrice >= selectedPriceRange[0] && critterPrice <= selectedPriceRange[1]) ||
        (critterPriceCjFlick >= selectedPriceRange[0] &&
          critterPriceCjFlick <= selectedPriceRange[1])
      );
    },
    filterByTime(critterTimeArr: number[], selectedTimeRange: number[]): boolean {
      if (critterTimeArr.length === 24) {
        return true;
      }
      return (
        (critterTimeArr[0] >= selectedTimeRange[0] && critterTimeArr[0] <= selectedTimeRange[1]) ||
        (critterTimeArr[critterTimeArr.length - 1] >= selectedTimeRange[0] &&
          critterTimeArr[critterTimeArr.length - 1] <= selectedTimeRange[1])
      );
    },
  },
});
</script>

<style lang="scss" scoped>
@import '@/styles/ui/_container.scss';
@import '@/styles/ui/_form.scss';

.message {
  height: 100%;
  text-align: center;
  font-size: 2rem;
}

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
</style>
