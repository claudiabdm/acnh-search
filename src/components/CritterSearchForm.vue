<template>
  <div class="form">
    <div class="form__group">
      <label for="language" class="form__label">
        Language
      </label>
      <select
        id="language"
        :value="langVal"
        @input="updateSearch"
        class="form__control"
      >
        <option v-for="lang in languages" :key="lang" :value="lang">
          {{ `${lang.slice(5, -2)}-${lang.slice(-2)}` }}
        </option>
      </select>
    </div>
    <div class="form__group">
      <label for="hemisphere" class="form__label">
        Hemisphere
      </label>
      <select
        id="hemisphere"
        :value="hemiVal"
        @input="updateSearch"
        class="form__control"
      >
        <option v-for="hemi in hemispheres" :key="hemi" :value="hemi">
          {{ hemi }}
        </option>
      </select>
    </div>
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
        'name-EUde',
        'name-EUen',
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
      return this.search.lang;
    },
    hemiVal(): string {
      return this.search.hemi;
    },
  },
  methods: {
    updateSearch(e) {
      const updatedValue = {
        lang: e.target.id === 'language' ? e.target.value : this.langVal,
        hemi: e.target.id === 'hemisphere' ? e.target.value : this.hemiVal,
      };
      this.$emit('search', updatedValue);
    },
  },
});
</script>

<style lang="scss" scoped>
@import '@/styles/global/_variables.scss';
@import '@/styles/mixins/_mixins.scss';

.form {
  @include flex(center, center);
  @include size(auto, auto);
  padding: 0 $padding-sides;

  &__group {
    @include flex(center, center);
    @include size(rem(125px), auto);
    flex-direction: column;

    & + & {
      margin-left: 10px;
    }
  }

  &__control {
    @include size(100%, 1.563rem);
    font-size: rem(18px);
    margin-top: 10px;
  }
}
</style>
