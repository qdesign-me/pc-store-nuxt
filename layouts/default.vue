<template>
  <div>
    <img v-if="show" src="/img/temp/2.png" alt="" class="temp" />
    <Header />
    <slot />
    <Footer />
  </div>
</template>

<script setup>
const show = ref(false);
import { onKeyStroke } from '@vueuse/core';

onKeyStroke(['q'], (e) => {
  show.value = !show.value;
});
</script>
