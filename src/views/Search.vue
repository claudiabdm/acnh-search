<template>
  <div class="message">
    Working on it!
    <!-- <form class="form">
      <div class="form__group">
        <v-select
          v-model="chips"
          :items="critterTypeList"
          :item-text="critterTypeList.text"
          :item-value="critterTypeList.value"
          :multiple="true"
          filled
          rounded
          chips
          label="Critter Type"
          class="form__text"
          item-color="accent"
          background-color="secondary"
          color="primary"
        >
          <template v-slot:selection="{ attrs, item, select, selected }">
            <v-chip
              v-bind="attrs"
              :input-value="selected"
              color="accent"
              text-color="secondary"
              close
            >
              <v-icon>{{ item.icon }}</v-icon>
              <strong>{{ item.text }}</strong
              >&nbsp;
            </v-chip>
          </template>
        </v-select>
      </div>
    </form> -->
    <!-- <div class="container">
      <CritterList :critterType="'bugs'" title="bugs" :critterList="[]" />
    </div> -->
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
// import CritterList from '@/components/CritterList.vue';

export default Vue.extend({
  // components: { CritterList },
  data() {
    return {
      critterTypeList: [
        { text: 'Bugs', value: 'bugs', icon: '$vuetify.bugs' },
        { text: 'Fish', value: 'fish', icon: '$vuetify.fish' },
        { text: 'Sea', value: 'sea', icon: '$vuetify.seaCreature' },
      ],
      chips: ['bugs', 'fish', 'sea'],
    };
  },
  methods: {
    remove(item) {
      this.chips.splice(this.chips.indexOf(item), 1);
      this.chips = [...this.chips];
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

// .theme--light.v-application {
//   color: var(--body-color);
// }

// .theme--light.v-list-item:not(.v-list-item--active):not(.v-list-item--disabled) {
//   color: var(--body-color);
// }
// .theme--light.v-sheet {
//   background-color: var(--tertiary);
//   color: var(--body-color);
// }
</style>
