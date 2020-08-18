<template>
  <v-app light>
    <div class="layout">
      <router-view :class="['layout__main', searchViewClass]"></router-view>
      <TheNavbar class="layout__navbar" />
    </div>
  </v-app>
</template>

<script lang="ts">
import TheNavbar from '@/components/TheNavbar.vue';
import Vue from 'vue';

export default Vue.extend({
  name: 'acnh-search',
  components: { TheNavbar },
  computed: {
    searchViewClass() {
      return !this.$route.path.includes('/critter') ? 'layout__main--search' : null;
    },
  },
});
</script>

<style lang="scss">
@import '@/styles/styles.scss';

.v-application {
  background-color: var(--v-background-base) !important;
}

.layout {
  @include size(100%, 100%);
  background: transparent;
  background-image: radial-gradient(var(--tertiary) 10%, transparent 10%),
    radial-gradient(var(--tertiary) 10%, transparent 10%);
  background-color: var(--body-bg);
  background-position: 0 0, 50px 50px;
  background-size: 100px 100px;
  color: var(--body-color);
  font-family: $font-family-primary;
  font-weight: $font-weight-bold;
  font-size: $font-size-body;
  line-height: 1;
  overflow: hidden;

  &__main {
    @include size(100%, 100vh);
    padding: $header-height + 10px $padding-sides;
    overflow: auto;

    &--search {
      padding-top: $padding-sides;
    }
  }

  @media screen and (min-width: $md) {
    @include flex(center, flex-end);
    flex-direction: row-reverse;

    &__main {
      width: 100vw - $navbar-width-desktop;
    }
  }
}
</style>
