<template>
  <div class="user-page vue-container">
    <amplify-authenticator username-alias="email">
      <amplify-sign-in slot="sign-in" username-alias="email"></amplify-sign-in>
      <amplify-sign-up
        username-alias="email"
        :form-fields.prop="formFields"
        slot="sign-up"
      ></amplify-sign-up>
    </amplify-authenticator>
    <div v-if="authState === 'signedin' && user" class="user-page__logged">
      <div class="user-page__header">
        <h2>Hello! {{ authData.username }}</h2>
      </div>
      <div class="user-page__buttons">
        <amplify-sign-out class="user-page__button"></amplify-sign-out>
        <amplify-button class="user-page__button" @click="deleteUserAccount"
          >Delete Account</amplify-button
        >
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from 'vue';
import { onAuthUIStateChange, AuthState } from '@aws-amplify/ui-components';
import { Auth } from 'aws-amplify';
import { UserCritterInfo } from '@/shared/models/user-critter-info';

export default Vue.extend({
  name: 'UserPage',
  data() {
    return {
      authState: '' as AuthState,
      authData: {} as any,
      formFields: [{ type: 'email' }, { type: 'password' }],
    };
  },
  computed: {
    user(): UserCritterInfo {
      return this.$store.state.user;
    }
  },
  created() {
    onAuthUIStateChange(async (authState, authData) => {
      this.authState = authState;
      this.authData = authData;
      if (this.authData && this.authData.attributes) {
        this.$store.dispatch('getUserCritterInfo', this.authData.attributes.sub);
      } else {
        this.$store.dispatch('deleteUserCritterInfo');
      }
    });
  },
  methods: {
    async deleteUserAccount() {
      try {
        const user = await Auth.currentAuthenticatedUser();
        user.deleteUser((error, data) => {
          if (error) {
            throw error;
          }
        });
        await Auth.signOut();
        this.$store.dispatch('deleteUserCritterInfo');
      } catch (err) {
        console.log(err);
      }
    },
  },
});
</script>
<style lang="scss" scoped>
.user-page {
  display: flex;
  justify-content: center;
  &__logged {
    @include flex(center, space-between);
    flex-direction: column;
    @include size(100%, auto);
  }
  &__header {
    @include flex(center, space-between);
    @include size(100%, auto);
  }
  &__buttons {
    @include flex(center, space-between);
    flex-direction: column;
  }

  &__button {
    max-width: max-content;
    margin-top: 10px;
  }
}
</style>
