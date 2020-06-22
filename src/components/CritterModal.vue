<template>
  <transition name="fade">
    <div class="modal" @click="onClose()">
      <transition name="slide-fade">
        <div class="modal__container" v-show="visible" @click.stop>
          <div class="modal__bubble">
            {{ title }}
          </div>
          <header class="modal__header">
            <button
              type="button"
              class="btn btn--close modal__close"
              @click="onClose()"
            >
              <svg class="icon icon--sm icon--nofilter">
                <use xlink:href="@/assets/sprite.svg#close" />
              </svg>
            </button>
          </header>

          <div class="modal__body">
            <slot></slot>
          </div>
        </div>
      </transition>
    </div>
  </transition>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  props: {
    title: {
      type: String,
    },
    showModal: {
      type: Boolean,
    },
  },
  data() {
    return {
      visible: false,
    };
  },
  watch: {
    showModal: function(val) {
      this.visible = val;
    },
  },
  methods: {
    onClose() {
      this.visible = false;
      setTimeout(() => this.$emit('close'), 150);
    },
  },
});
</script>

<style lang="scss" scoped>
@import '@/styles/global/_variables.scss';
@import '@/styles/mixins/_mixins.scss';

//------------------------------//
// MODAL                        //
// ---------------------------- //

.modal {
  @include fixed(0, 0, 0, 0);
  @include flex(flex-start, center);

  background-color: rgba(0, 0, 0, 0.8);
  opacity: 1;
  visibility: visible;
  z-index: 1000;
  color: $base;

  @media screen and (min-width: $lg) {
    justify-content: center;
  }

  // MODAL CONTAINER
  // -----------------------------
  &__container {
    @include flex(flex-start, center);
    @include size(rem(320px), auto);

    flex-direction: column;
    min-height: 40vh;
    min-width: 16rem;
    margin: auto 30px;
    transform: translate3d(0, 0, 0);
    // transition: transform 0.35s ease-out;
  }

  // MODAL BUBBLE
  // -----------------------------

  &__bubble {
    @include fixed(-10px, auto, auto, -20px);
    content: 'hola';
    height: auto;
    width: auto;
    border-radius: 20px;
    padding: 15px;
    color: #fff;
    background-color: $primary;
    font-weight: $font-weight-bold;
    transform: rotateZ(-5deg);
    box-shadow: $box-shadow-sharpen;
    z-index: 1000;
  }

  // MODAL HEADER
  // -----------------------------
  &__header {
    @include flex(center, flex-end);
    @include size(100%, rem($header-height));
    padding: 0 10px;
    margin: 0 auto;
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    background-color: var(--tertiary);
    color: $secondary;
    font-weight: $font-weight-bold;
    font-size: ($font-size-base * 2);
    z-index: 10;
  }

  // MODAL TITLE
  // -----------------------------
  &__title {
    font-size: 1.7rem;
  }

  // MODAL BODY
  // -----------------------------
  &__body {
    @include relative(0, 0, 0, 0);
    @include size();
    overflow-y: auto;
    border-bottom-right-radius: 20px;
    border-bottom-left-radius: 20px;
    padding: 0 10px 10px;
    background-color: var(--tertiary);
    box-shadow: $box-shadow-sharpen;
  }

  // MODAL CLOSE BUTTON
  // -----------------------------
  &__close {
    width: auto;
  }
}

//------------------------------//
// TRANSITIONS                  //
// ---------------------------- //

.fade {
  &-enter,
  &-leave-to {
    opacity: 0;
    visibility: hidden;
  }
  &-enter-active {
    transition: opacity 0.35s ease-out, visibility 0.35s;
  }
  &-leave-active {
    transition: opacity 0.35s ease-out, visibility 0.35s;
  }
}

.slide {
  &-fade-enter,
  &-fade-leave-to {
    transform: translate3d(0, -200%, 0);
  }
  &-fade-enter-active {
    transition: all 0.35s ease-out;
  }
  &-fade-leave-active {
    transition: all 0.35s ease-out;
  }
}
</style>
