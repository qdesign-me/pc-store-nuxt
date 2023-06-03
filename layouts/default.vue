<template>
  <div>
    <Header />
    <slot />
    <Footer />
  </div>
</template>

<script setup>
import { useAppStore } from '~/stores/app';
const store = useAppStore();
const cart = useCookie('cart', {
  default: () => [],
  watch: false,
}).value;
const compare = useCookie('compare', {
  default: () => [],
  watch: false,
}).value;
const favorites = useCookie('favorites', {
  default: () => [],
  watch: false,
}).value;

store.favorites = favorites;
store.cart = cart;
store.compare = compare;
</script>
