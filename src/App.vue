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
import { Auth } from 'aws-amplify';
import { mapActions } from 'vuex';
import { Route } from 'vue-router';

export default Vue.extend({
  name: 'acnh-search',
  components: { TheNavbar },
  data() {
    return {
      critterType: this.$route.params.critterType,
      critterTypeList: ['bugs', 'fish', 'sea'],
    };
  },
  async created() {
    try {
      const user = await Auth.currentAuthenticatedUser();
      if (user) {
        await this.getUserCritterInfo(user.attributes.sub);
      } else {
        await this.deleteUserCritterInfo();
      }
    } catch (err) {
      console.log(err);
    }
    this.critterTypeList.forEach(
      async (critterType: string) => await this.getCritterList(critterType),
    );
    await this.getArtList();
  },
  computed: {
    searchViewClass() {
      return !this.$route.path.includes('/critter') ? 'layout__main--search' : null;
    },
  },
  watch: {
    async $route(to: Route) {
      if (to.params.hasOwnProperty('critterType')) {
        this.critterType = to.params.critterType;
        await this.getCritterList(this.critterType);
      }
    },
  },
  methods: {
    ...mapActions('user', ['getUserCritterInfo', 'deleteUserCritterInfo']),
    ...mapActions('totalCritters', ['getCritterList']),
    ...mapActions('totalArt', ['getArtList']),
  },
});
</script>

<style lang="scss">
@import '@/styles/styles.scss';

.v-application {
  background-color: var(--v-background-base) !important;
}

.layout {
  @include size(100vw, 100vh);
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
  overflow: auto;

  &__main {
    @include size(100%, auto);
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
      @include size(100vw - $navbar-width-desktop, 100vh);
    }
  }
}
</style>
