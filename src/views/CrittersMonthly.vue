<template>
  <div>
    <CritterMonthNavbar
      :currentMonth="currentMonth"
      @changeMonth="onChangeMonth"
    />
    <CritterSearchForm :search="critterSearch" @search="updateList" />

    <div class="container">
      <div class="container__legend">
        <p class="container__elem container__elem--common">Common</p>
        <p class="container__elem container__elem--uncommon">Uncommon</p>
        <p class="container__elem container__elem--rare">Rare</p>
        <p class="container__elem container__elem--ultra-rare">Ultra-rare</p>
      </div>
      <div class="container__lists">
        <CritterList
          title="Dissapears"
          @selectCritter="toggleCritterInfo"
          :critterList="crittersEnding"
          :critterType="critterType"
        />
        <CritterList
          title="Appears"
          @selectCritter="toggleCritterInfo"
          :critterList="crittersStarting"
          :critterType="critterType"
        />
        <CritterList
          title="On Season"
          @selectCritter="toggleCritterInfo"
          :critterList="crittersOnSeason"
          :critterType="critterType"
        />
        <CritterList
          title="All Year"
          @selectCritter="toggleCritterInfo"
          :critterList="crittersAllYear"
          :critterType="critterType"
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
import CritterSearchForm from '@/components/CritterSearchForm.vue';
import CritterMonthNavbar from '@/components/CritterMonthNavbar.vue';
import CritterModal from '@/components/CritterModal.vue';
import CritterList from '@/components/CritterList.vue';
import CritterInfo from '@/components/CritterInfo.vue';
import { Critter } from '@/shared/models/critter';
import { crittersService } from '@/shared/critters.service';
import { Route } from 'vue-router';
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
  name: 'CritteMonthly',
  components: {
    CritterMonthNavbar,
    CritterList,
    CritterModal,
    CritterInfo,
    CritterSearchForm,
  },
  data() {
    return {
      critterSearch: {
        lang: { text: 'EU-en', value: 'name-EUen' },
        hemi: 'northern',
      },
      critterList: [] as Critter[],
      currentMonth: new Date().getMonth(),
      critterType: 'bugs',
      critterTypeList: ['bugs', 'fish', 'sea'],
    };
  },
  async created(): Promise<void> {
    this.critterList = await this.loadCritters();
  },
  watch: {
    async $route(to: Route, from: Route) {
      const param = to.params.critterType;
      if (this.critterTypeList.includes(param)) {
        this.critterType = to.params.critterType;
        this.critterList = await this.loadCritters();
      } else {
        this.$router.push({
          name: 'critters',
          params: { critterType: 'bugs' },
        });
      }
    },
  },
  computed: {
    critterListFiltered(): Critter[] {
      return this.critterList
        .filter(
          (critter: Critter) =>
            !critter.allYear &&
            critter.availableMonths.includes(this.currentMonth),
        )
        .map((critter: Critter) => {
          critter.state = this.getState(critter, this.currentMonth);
          return critter;
        });
    },
    crittersStarting(): Critter[] {
      return this.critterListFiltered.filter(
        (critter: Critter) => critter.state === 'starting',
      );
    },
    crittersEnding(): Critter[] {
      return this.critterListFiltered.filter(
        (critter: Critter) => critter.state === 'ending',
      );
    },
    crittersOnSeason(): Critter[] {
      return this.critterListFiltered.filter(
        (critter: Critter) => critter.state === 'onseason',
      );
    },
    crittersAllYear(): Critter[] {
      return this.critterList.filter((critter: Critter) => critter.allYear);
    },
  },
  methods: {
    async loadCritters(): Promise<Critter[]> {
      const critters = await crittersService.getCritters(
        this.critterType,
        this.critterSearch.lang.value,
        this.critterSearch.hemi,
      );
      return critters;
    },
    async updateList(e): Promise<void> {
      this.critterSearch = e;
      this.critterList = await this.loadCritters();
    },
    getState(critter: Critter, currentMonth: number): string {
      const { startMonth } = critter;
      const { endMonth } = critter;
      return endMonth.includes(currentMonth)
        ? 'ending'
        : startMonth.includes(currentMonth)
        ? 'starting'
        : 'onseason';
    },
    onChangeMonth(value): void {
      this.currentMonth = value;
    },
  },
});
</script>
<style lang="scss" scoped>
@import '@/styles/global/_variables.scss';
@import '@/styles/mixins/_mixins.scss';
@import '@/styles/ui/_container.scss';
@import '@/styles/ui/_form.scss';
</style>
