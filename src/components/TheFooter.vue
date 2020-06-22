<template>
<footer class="footer">
  <address>
    Developed by <a href="https://github.com/claudiabdm/" class="footer__link">Claudia Benito</a>
  </address>
</footer>
</template>

<style lang="scss">
@import '@/styles/global/_variables.scss';
@import '@/styles/mixins/_mixins.scss';

.footer {
  @include flex(center, flex-start);
  padding: 10px $padding-sides;
  color: #fff;
  background-color: $primary;

  &__link {
    color: #fff;
    font-weight: $font-weight-bold;
  }
}
</style>
