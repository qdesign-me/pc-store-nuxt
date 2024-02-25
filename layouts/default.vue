<template>
  <Header />
  <slot />
  <Footer />
</template>

<script setup>
const nuxtApp = useNuxtApp();
nuxtApp.hook('page:finish', () => document.querySelector('body').classList.remove('with-open-mmenu', 'with-open-menu', 'menu-mode-2'));
</script>
