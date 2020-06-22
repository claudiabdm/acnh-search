<template>
  <header class="header">
    <h1 class="header__title">ACNH Search</h1>
  </header>
</template>

<style lang="scss">
@import '@/styles/global/_variables.scss';
@import '@/styles/mixins/_mixins.scss';

.header {
  @include flex(center, center);
  min-width: rem(320px);
  padding: 10px;
  color: #fff;
  background-color: $primary;
  font-size: rem(24px);
  font-weight: $font-weight-bold;
  letter-spacing: 2px;

  &__subtitle {
    font-size: rem(12px);
  }

  &__link {
    font-weight: $font-weight-bold;
  }
}
</style>
