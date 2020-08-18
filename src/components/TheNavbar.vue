<template>
  <nav class="navbar">
    <h2 class="navbar__title">Welcome to ACNH-Search!</h2>
    <router-link
      class="navbar__link"
      v-for="link in links"
      :key="link.name"
      :to="link.path"
    >
      <svg class="navbar__icon">
        <use :href="`assets/svgs/sprite.svg#${link.name}`" />
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
          path: '/critters/bugs',
        },
        {
          name: 'fish',
          path: '/critters/fish',
        },
        {
          name: 'sea',
          path: '/critters/sea',
        },
        {
          name: 'search',
          path: '/search',
        },
        {
          name: 'me',
          path: '/me',
        },
      ],
    };
  },
});
</script>

<style lang="scss" scoped>
.navbar {
  @include fixed(auto, 0, 0, 0);
  @include flex(center, space-between);
  height: $navbar-height;
  padding: 20px;
  background-color: rgba($color: $primary, $alpha: 0.5);
  backdrop-filter: blur(8px);
  z-index: 10;
  font-size: 0;

  &__title {
    display: none;
    font-size: 0;
  }

  &__link {
    @include flex(center, center);
    color: var(--body-bg);
    font-family: $font-secondary;
    transition: color ease-in-out 0.15s;
    will-change: color;

    &:hover {
      text-decoration: none;
    }
    &--active {
      color: var(--body-color);
      .navbar__icon {
        color: var(--body-color);
      }
    }
  }

  &__icon {
    @include size($navbar-height / 1.5);
    color: var(--body-bg);
    transition: color ease-in-out 0.15s;
    will-change: color;
  }

  @media screen and (min-width: $md) {
    @include size($navbar-width-desktop, 100vh);
    position: unset;
    align-items: flex-start;
    justify-content: flex-start;
    flex-direction: column;
    font-size: 1.5rem;
    text-transform: capitalize;
    background-color: rgba($color: $primary, $alpha: 0.5);
    box-shadow: $box-shadow-sharpen-right;
    &__title {
      display: unset;
      margin-bottom: 40px;
      color: var(--body-bg);
      font-size: rem(32px);
      font-family: 'AcnhTitle';
      font-weight: 700;
      line-height: 1.25;
    }

    &__link {
      & + & {
        margin-top: $padding-sides;
      }
    }
    &__icon {
      margin-right: 10px;
    }
  }
}
</style>
