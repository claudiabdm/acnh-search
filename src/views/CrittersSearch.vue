<template>
  <div>
    <form class="form form--search">
      <CritterSearchForm :search="critterSearch" @search="updateSearch" />
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
      <div class="form__group form__group--range">
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
import { crittersData } from '@/shared/critters-data';
import { Critter } from '@/shared/models/critter';
import { CritterTypeObj } from '@/shared/models/critterTypeObj';
import CritterSearchForm from '@/components/CritterSearchForm.vue';
import CritterModal from '@/components/CritterModal.vue';
import CritterInfo from '@/components/CritterInfo.vue';
import showCritterInfo from '@/shared/useShowCritterInfo';

export default Vue.extend({
  setup() {
    const {
      isModalVisible,
      currentCritter,
      toggleCritterInfo,
    } = showCritterInfo();
    return {
      isModalVisible,
      currentCritter,
      toggleCritterInfo,
    };
  },
  components: { CritterList, CritterSearchForm, CritterModal, CritterInfo },
  data() {
    return {
      critterSearch: {
        lang: { text: 'EU-en', value: 'name-EUen' },
        hemi: 'northern',
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
    critterTypeListFiltered(): CritterTypeObj[] {
      return this.critterTypeList.filter((obj: CritterTypeObj) => {
        if (obj.selected) {
          obj.list = [
            ...obj.list.map(critter => {
              if (!critter.rarity) {
                critter['show'] = 'visible';
                return critter;
              }
              if (
                (critter.availableMonths.some(month =>
                  this.monthsSelected.includes(month),
                ) ||
                  critter.allYear) &&
                this.rarity.includes(critter.rarity.toLowerCase()) &&
                ((critter.price >= this.range[0] &&
                  critter.price <= this.range[1]) ||
                  (critter.priceCjFlick >= this.range[0] &&
                    critter.priceCjFlick <= this.range[1]))
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
    async updateCritterList(e: string): Promise<void> {
      this.critterTypeList.forEach(async critter => {
        if (e.includes(critter.value)) {
          critter.selected = true;
          critter.list = await crittersData.loadCritters(
            critter.value,
            this.critterSearch.lang.value,
            this.critterSearch.hemi,
          );
        } else {
          critter.selected = false;
        }
      });
    },
    async updateSearch(e): Promise<void> {
      this.critterSearch = e;
      this.critterTypeList.forEach(
        async obj =>
          (obj.list = await crittersData.loadCritters(
            obj.value,
            this.critterSearch.lang.value,
            this.critterSearch.hemi,
          )),
      );
    },
    filterByRarity(e: string[]) {
      this.rarity = e;
    },
    filterByMonth(e: number[]) {
      this.monthsSelected = e;
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
