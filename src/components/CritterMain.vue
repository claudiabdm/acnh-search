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
          @selectCritter="onToggleModal"
          :critterList="crittersEnding"
          :critterType="critterType"
        />
        <CritterList
          title="Appears"
          @selectCritter="onToggleModal"
          :critterList="crittersStarting"
          :critterType="critterType"
        />
        <CritterList
          title="On Season"
          @selectCritter="onToggleModal"
          :critterList="crittersOnSeason"
          :critterType="critterType"
        />
        <CritterList
          title="All Year"
          @selectCritter="onToggleModal"
          :critterList="crittersAllYear"
          :critterType="critterType"
        />
      </div>
    </div>

    <CritterModal
      :title="currentCritter.name"
      :showModal="isModalVisible"
      v-show="isModalVisible"
      @close="onToggleModal"
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

export default Vue.extend({
  name: 'CritterMain',
  components: {
    CritterMonthNavbar,
    CritterList,
    CritterModal,
    CritterInfo,
    CritterSearchForm,
  },
  props: {
    critterType: {
      type: String,
      default: 'fish',
    },
  },
  data() {
    return {
      critterSearch: { lang: {text: 'EU-en', value:'name-EUen'}, hemi: 'northern' },
      critterList: [] as Critter[],
      currentMonth: new Date().getMonth(),
      currentCritter: {} as Critter,
      isModalVisible: false,
    };
  },
  async created(): Promise<void> {
    this.critterList = await this.loadCritters();
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
    onToggleModal(value): void {
      if (!this.isModalVisible) {
        this.currentCritter = value;
        this.isModalVisible = true;
      } else {
        this.isModalVisible = false;
        this.currentCritter = {} as Critter;
      }
    },
  },
});
</script>

<style lang="scss" scoped>
@import '@/styles/global/_variables.scss';
@import '@/styles/mixins/_mixins.scss';

.container {
  @include flex(center, center);
  flex-direction: column;
  background: transparent;
  padding: 0 $padding-sides;
  
  &__legend {
    @include flex(flex-start, center);
    flex-wrap: wrap;
    max-width: rem(375px);
    border-radius: 20px;
    padding: 10px;
    background-color: var(--tertiary);
    font-size: rem(12px);
    font-weight: $font-weight-normal;
    box-shadow: $box-shadow-sharpen;
  }

  &__lists {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: rem(10px);
    align-content: center;
    margin: 20px 0;
    padding: 0;
  }

  &__elem {
    margin: 0;
    & + &:not(.list__elem) {
      margin-left: 10px;
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
