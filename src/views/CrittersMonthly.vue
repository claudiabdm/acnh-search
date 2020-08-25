<template>
  <div>
    <CritterMonthNavbar :currentMonth="currentMonth" @changeMonth="onChangeMonth" />
    <div class="vue-container">
      <CritterMonthSelect class="form" :search="critterSearch" @search="updateList" />
      <div class="vue-container__legend">
        <p class="vue-container__elem vue-container__elem--common">Common</p>
        <p class="vue-container__elem vue-container__elem--uncommon">
          Uncommon
        </p>
        <p class="vue-container__elem vue-container__elem--rare">Rare</p>
        <p class="vue-container__elem vue-container__elem--ultra-rare">
          Ultra-rare
        </p>
      </div>
      <div class="vue-container__lists">
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
import CritterMonthSelect from '@/components/CritterMonthSelect.vue';
import CritterMonthNavbar from '@/components/CritterMonthNavbar.vue';
import CritterModal from '@/components/CritterModal.vue';
import CritterList from '@/components/CritterList.vue';
import CritterInfo from '@/components/CritterInfo.vue';
import showCritterInfo from '@/shared/useShowCritterInfo';
import { Critter } from '@/shared/models/critter';
import { mapState, mapActions, mapMutations } from 'vuex';

export default Vue.extend({
  name: 'CritteMonthly',
  components: {
    CritterMonthNavbar,
    CritterList,
    CritterModal,
    CritterInfo,
    CritterMonthSelect,
  },
  props: {
    critterType: {
      type: String,
      required: true,
    },
  },
  setup() {
    const { isModalVisible, currentCritter, toggleCritterInfo } = showCritterInfo();
    return {
      isModalVisible,
      currentCritter,
      toggleCritterInfo,
    };
  },
  data() {
    return {
      critterSearch: {
        lang: {
          text: this.$store.state.totalCritters.lang.text,
          value: this.$store.state.totalCritters.lang.value,
        },
        hemi: this.$store.state.totalCritters.hemi,
      },
      currentMonth: new Date().getMonth(),
    };
  },
  computed: {
    ...mapState({
      critterList(state: any): Critter[] {
        return state.totalCritters[this.critterType];
      },
    }),
    critterListFiltered(): Critter[] {
      return this.critterList
        .filter(
          (critter: Critter) =>
            !critter.allYear && critter.availableMonths.includes(this.currentMonth),
        )
        .map((critter: Critter) => {
          critter.state = this.getState(critter, this.currentMonth);
          return critter;
        });
    },
    crittersStarting(): Critter[] {
      return this.critterListFiltered.filter((critter: Critter) => critter.state === 'starting');
    },
    crittersEnding(): Critter[] {
      return this.critterListFiltered.filter((critter: Critter) => critter.state === 'ending');
    },
    crittersOnSeason(): Critter[] {
      return this.critterListFiltered.filter((critter: Critter) => critter.state === 'onseason');
    },
    crittersAllYear(): Critter[] {
      return this.critterList.filter((critter: Critter) => critter.allYear);
    },
  },
  methods: {
    ...mapMutations('totalCritters', ['updateLang', 'updateHemi']),
    ...mapActions('totalCritters', ['getCritterList']),

    async updateList(e): Promise<void> {
      this.critterSearch = e;
      this.updateLang(e.lang);
      this.updateHemi(e.hemi);
      await this.getCritterList(this.critterType);
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
@import '@/styles/ui/_container.scss';
@import '@/styles/ui/_form.scss';
</style>
