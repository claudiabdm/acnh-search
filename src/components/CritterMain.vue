<template>
  <div>
    <CritterMonthNavbar
      :currentMonth="currentMonth"
      @changeMonth="onChangeMonth"
    />

    <div class="container">
      <div class="container__legend">
        <p class="container__elem container__elem--common">Common</p>
        <p class="container__elem container__elem--uncommon">Uncommon</p>
        <p class="container__elem container__elem--rare">Rare</p>
        <p class="container__elem container__elem--ultra-rare">Ultra-rare</p>
      </div>
      <md-list :md-ripple="false" class="container__lists">
        <CritterList
          title="Dissapears"
          @selectCritter="onToggleModal"
          :critterList="crittersEnding"
        />
        <CritterList
          title="Appears"
          @selectCritter="onToggleModal"
          :critterList="crittersStarting"
        />
        <CritterList
          title="On Season"
          @selectCritter="onToggleModal"
          :critterList="crittersOnSeason"
        />
        <CritterList
          title="All Year"
          @selectCritter="onToggleModal"
          :critterList="crittersAllYear"
        />
      </md-list>
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
// import CritterSearchForm from '@/components/CritterSearchForm.vue';
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
  },
  data() {
    return {
      critterSearch: 'fishES',
      critters: [] as Critter[],
      currentMonth: new Date().getMonth(),
      currentCritter: {} as Critter,
      isModalVisible: false,
    };
  },
  computed: {
    critterList(): Critter[] {
      return crittersService
        .getCritters(this.critterSearch)
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
      return this.critterList.filter(
        (critter: Critter) => critter.state === 'starting',
      );
    },
    crittersEnding(): Critter[] {
      return this.critterList.filter(
        (critter: Critter) => critter.state === 'ending',
      );
    },
    crittersOnSeason(): Critter[] {
      return this.critterList.filter(
        (critter: Critter) => critter.state === 'onseason',
      );
    },
    crittersAllYear(): Critter[] {
      return crittersService
        .getCritters(this.critterSearch)
        .filter((critter: Critter) => critter.allYear);
    },
  },
  methods: {
    getState(critter: Critter, currentMonth: number) {
      const { startMonth } = critter;
      const { endMonth } = critter;
      return endMonth.includes(currentMonth)
        ? 'ending'
        : startMonth.includes(currentMonth)
        ? 'starting'
        : 'onseason';
    },
    onChangeMonth(value) {
      this.currentMonth = value;
    },
    onToggleModal(value) {
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
  background-color: var(--body-bg);

  &__legend {
    @include flex(flex-start, center);
    flex-wrap: wrap;
    max-width: rem(375px);
    margin: 10px $padding-sides;
    border-radius: 20px;
    padding: 10px;
    background-color: var(--tertiary);
    box-shadow: $box-shadow-sharpen;
  }

  &__lists {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: rem(20px);
    align-content: center;
    padding: $padding-sides;
  }

  &__elem {
    font-size: 1rem;
    font-weight: $font-weight-light;

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
