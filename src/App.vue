<template>
  <div class="layout">
    <router-view class="layout__main"></router-view>
    <TheNavbar class="layout__navbar"/>
  </div>
</template>

<script>
import TheNavbar from '@/components/TheNavbar.vue';

export default {
  name: 'acnh-search',
  components: { TheNavbar },
};
</script>

<style lang="scss">
@import '@/styles/styles.scss';

.layout {
  @include size(100vw, 100vh);
  overflow: hidden;
  background: transparent;

  &__main {
    @include size(100%, 100%);
    padding: $header-height+10px 0 $navbar-height;
    overflow: auto;
  }

  @media screen and (min-width: $md){
    @include flex(center, flex-end);
    flex-direction: row-reverse;

    &__main {
      width: 80vw;
    }
  }
}
</style>
