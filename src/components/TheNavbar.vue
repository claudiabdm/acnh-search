<template>
  <nav class="navbar">
    <router-link v-for="link in links" :key="link.name" :to="link.path">
      <svg class="navbar__icon">
        <use :href="`assets/icons/sprite.svg#${link.name}`" />
      </svg>
      {{ link.name }}
    </router-link>
  </nav>
</template>

<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
  data() {
    return {
      links: [
        {
          name: 'bugs',
          path: '/bugs',
        },
        {
          name: 'fish',
          path: '/fish',
        },
        {
          name: 'sea-creature',
          path: '/sea-creature',
        },
        {
          name: 'search',
          path: '/search',
        },
      ],
    };
  },
});
</script>

<style lang="scss" scoped>
@import '@/styles/global/_variables.scss';
@import '@/styles/mixins/_mixins.scss';

.navbar {
  @include fixed(auto, 0, 0, 0);
  @include flex(center, space-between);
  height: $navbar-height;
  padding: 20px;
  background-color: $primary;
  z-index: 1000;
  font-size: 0;

  &__icon {
    @include size($navbar-height / 1.5);
    color: var(--body-color);
  }

  @media screen and (min-width: $md) {
    @include size($navbar-width-desktop, 100vh);
    position: unset;
    flex-direction: column;
  }
}
</style>
