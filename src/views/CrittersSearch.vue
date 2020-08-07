<template>
  <div>
    <form class="form form--selected">
      <CritterSearchForm :search="critterSearch" @search="updateSearch" />
      <div class="form__group">
        <v-select
          :items="critterTypeList"
          :item-text="critterTypeList.text"
          :item-value="critterTypeList.value"
          :multiple="true"
          filled
          rounded
          label="Critter Type"
          class="form__text"
          item-color="accent"
          background-color="secondary"
          color="primary"
          @change="updateCritterList($event)"
        >
          <template v-slot:selection="{ item }">
            <v-chip color="accent" text-color="secondary">
              <v-icon>{{ item.icon }}</v-icon>
              <strong>{{ item.text }}</strong
              >&nbsp;
            </v-chip>
          </template>
        </v-select>
      </div>
    </form>
    <div class="container">
      <div
        :key="critterObj"
        v-for="critterObj in critterTypeListFiltered"
        class="container__lists"
      >
        <div :key="critter" v-for="critter in critterObj.list">
          <CritterInfo :currentCritter="critter" />
        </div>
        <CritterList
          v-for="critter in critterTypeListFiltered"
          :key="critter.value"
          :critterType="critter.value"
          :title="critter.text"
          :critterList="critter.list"
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
import { crittersService } from '@/shared/critters.service';
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
          selected: false,
        },
        {
          text: 'Fish',
          value: 'fish',
          icon: '$vuetify.fish',
          list: [] as Critter[],
          selected: false,
        },
        {
          text: 'Sea',
          value: 'sea',
          icon: '$vuetify.seaCreature',
          list: [] as Critter[],
          selected: false,
        },
      ],
      currentCritter: {},
      isModalVisible: false,
    };
  },
  computed: {
    critterTypeListFiltered(): CritterTypeObj[] {
      return this.critterTypeList.filter(critter => critter.selected);
    },
  },
  methods: {
    async updateCritterList(e): Promise<void> {
      this.critterTypeList.forEach(async critter => {
        if (e.includes(critter.value)) {
          critter.selected = true;
          critter.list = await this.loadCritters(
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
          (obj.list = await this.loadCritters(
            obj.value,
            this.critterSearch.lang.value,
            this.critterSearch.hemi,
          )),
      );
    },
    async loadCritters(critterType, lang, hemi): Promise<Critter[]> {
      const critters = await crittersService.getCritters(
        critterType,
        lang,
        hemi,
      );
      return critters;
    },
  },
});
</script>

<style lang="scss" scoped>
@import '@/styles/global/_variables.scss';
@import '@/styles/mixins/_mixins.scss';
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
