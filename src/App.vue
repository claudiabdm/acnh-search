<template>
  <div class="layout">
    <TheHeader />
    <CritterMain class="layout__main" />
    <TheFooter />
  </div>
</template>

<script>
import TheHeader from '@/components/TheHeader.vue';
import TheFooter from '@/components/TheFooter.vue';
import CritterMain from '@/components/CritterMain.vue';

export default {
  name: 'acnh-search',
  components: { TheHeader, TheFooter, CritterMain },
};
</script>

<style lang="scss">
@import '@/styles/styles.scss';

.layout {
  @include size(100vw, 100vh);
  display: grid;
  grid-template-rows: min-content 1fr min-content;
  background-color: var(--body-bg);

  &__main {
    background-color: var(--body-bg);
  }
}
</style>
