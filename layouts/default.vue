<template>
  <div>
    <img v-if="show" src="/img/temp/1.png" alt="" class="temp" />
    <Header />
    <slot />
    <Footer />
  </div>
</template>

<script setup>
const show = ref(false);
import { onKeyStroke } from '@vueuse/core';
import { useAppStore } from '~/stores/app';
const store = useAppStore();
const items = useCookie('items', {
  default: () => {},
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
store.items = items;
store.compare = compare;
onKeyStroke(['q'], (e) => {
  show.value = !show.value;
});
</script>
