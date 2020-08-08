<template>
  <div class="form__group">
    <v-select
      class="form__control form__text"
      :items="langObj"
      :item-text="langObj.text"
      :item-value="langObj.value"
      append-icon="mdi-translate"
      filled
      rounded
      dense
      label="Language"
      :value="this.search.lang.value"
      @input="updateLang"
      item-color="accent"
      background-color="secondary"
      color="primary"
    ></v-select>
    <v-select
      class="form__control"
      :items="hemispheres"
      append-icon="mdi-map-marker-circle"
      filled
      rounded
      dense
      label="Hemisphere"
      :value="hemiVal"
      @input="updateHemi"
      item-color="accent"
      background-color="secondary"
    ></v-select>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'CritterSearchForm',
  props: {
    search: {
      type: Object,
    },
  },
  data() {
    return {
      languages: [
        'name-CNzh',
        'name-EUen',
        'name-EUde',
        'name-EUes',
        'name-EUfr',
        'name-EUit',
        'name-EUnl',
        'name-EUru',
        'name-JPja',
        'name-KRko',
        'name-TWzh',
        'name-USen',
        'name-USes',
        'name-USfr',
      ],
      hemispheres: ['northern', 'southern'],
    };
  },
  computed: {
    langVal(): string {
      return this.search.lang.text;
    },
    hemiVal(): string {
      return this.search.hemi;
    },
    langObj(): { value: string; text: string }[] {
      const obj: { value: string; text: string }[] = [];
      this.languages.forEach(name =>
        obj.push({
          value: name,
          text: `${name.slice(5, 7)}-${name.slice(-2)}`,
        }),
      );
      return obj;
    },
  },
  methods: {
    updateLang(e) {
      const updatedValue = {
        lang: {
          value: e,
          text: `${e.slice(5, 7)}-${e.slice(-2)}`,
        },
      };
      this.$emit('search', { ...this.search, ...updatedValue });
    },
    updateHemi(e) {
      const updatedValue = {
        hemi: e,
      };
      this.$emit('search', { ...this.search, ...updatedValue });
    },
  },
});
</script>

<style lang="scss" scoped>
 
 
@import '@/styles/ui/_form.scss';

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
