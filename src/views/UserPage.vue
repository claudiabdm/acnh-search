<template>
  <div class="user-page vue-container">
    <amplify-authenticator username-alias="email">
      <amplify-sign-up
        username-alias="email"
        :form-fields.prop="formFields"
        slot="sign-up"
      ></amplify-sign-up>
    </amplify-authenticator>
    <div v-if="authState === 'signedin' && user" class="user-page__logged">
      <div class="user-page__header">
        <h2 class="user-page__welcome">Hello! {{ authData.username }}</h2>
      </div>
      <div class="user-page__critter" v-for="critterType in critterTypes" :key="critterType">
        You have {{ user[critterType].length }} {{ critterType }} out of
        {{ totalCritters[critterType].length }}
      </div>
      <div class="user-page__buttons">
        <amplify-sign-out class="user-page__button"></amplify-sign-out>
        <amplify-button class="user-page__button" @click="deleteUserAccount">
          Delete Account
        </amplify-button>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from 'vue';
import { onAuthUIStateChange, AuthState } from '@aws-amplify/ui-components';
import { Auth } from 'aws-amplify';
import { mapState, mapActions } from 'vuex';

export default Vue.extend({
  name: 'UserPage',
  data() {
    return {
      authState: '' as AuthState,
      authData: {} as any,
      critterTypes: ['bugs', 'fish', 'sea'],
      formFields: [{ type: 'email' }, { type: 'password' }],
    };
  },
  created() {
    onAuthUIStateChange(async (authState, authData) => {
      this.authState = authState;
      this.authData = authData;
      if (this.authData && this.authData.attributes) {
        await this.getUserCritterInfo(this.authData.attributes.sub);
        this.critterTypes.forEach(
          async (critterName: string) => await this.getCritterList(critterName),
        );
      } else {
        await this.deleteUserCritterInfo();
      }
    });
  },
  computed: {
    ...mapState({
      user: (state: any) => state.user.user,
      totalCritters: (state: any) => state.totalCritters,
    }),
  },
  methods: {
    ...mapActions('user', ['getUserCritterInfo', 'deleteUserCritterInfo']),
    ...mapActions('totalCritters', ['getCritterList']),
    async deleteUserAccount() {
      try {
        const user = await Auth.currentAuthenticatedUser();
        user.deleteUser(error => {
          if (error) {
            throw error;
          }
        });
        await Auth.signOut();
        await this.deleteUserCritterInfo();
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

  &__welcome {
    margin-bottom: 20px;
  }

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
  &__critter {
    & + & {
      margin-top: 10px;
    }
  }
}
</style>
