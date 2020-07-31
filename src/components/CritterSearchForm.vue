<template>
  <div class="form">
    <div class="form__group">
      <label for="currentSearch" class="form__label">
        Select Language:
      </label>
      <select
        id="currentSearch"
        :value="inputVal"
        @input="updateSearch"
        class="form__control"
      >
        <option value="fishES"> Peces - ES </option>
        <option value="bugsES"> Insectos - ES </option>
        <option value="fishEN"> Fish - EN </option>
        <option value="bugsEN"> Bugs - EN </option>
      </select>
    </div>
     <div class="form__group">
      <label for="currentSearch" class="form__label">
        Select Hemisphere:
      </label>
      <select
        id="currentSearch"
        :value="inputVal"
        @input="updateSearch"
        class="form__control"
      >
        <option value="fishES"> Peces - ES </option>
        <option value="bugsES"> Insectos - ES </option>
        <option value="fishEN"> Fish - EN </option>
        <option value="bugsEN"> Bugs - EN </option>
      </select>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'CritterSearchForm',
  props: {
    value: {
      type: String,
    },
  },
  data() {
    return {
      inputVal: this.value,
    };
  },
  methods: {
    updateSearch(e) {
      this.$emit('input', e.target.value);
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

  padding: $padding-sides;
  padding-bottom: 0;

  &__group {
    @include flex(center, center);
    flex-direction: column;
  }

  &__control {
    @include size(100%, 1.563rem);

    font-size: rem(18px);
    margin-top: 10px;
  }
}
</style>
