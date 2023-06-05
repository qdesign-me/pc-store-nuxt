<template>
  <NuxtLayout> <NuxtLoadingIndicator color="orange" /> <NuxtPage /> </NuxtLayout>
</template>

<script setup>
const route = useRoute();
const hostname = 'https://pc-store-nuxt.vercel.app';

const path = route.path;

useSeoMeta({
  ogImage: `${hostname}/img/logo.png`,
  twitterCard: 'summary_large_image',
  canonical: `${hostname}${path}`,
});
</script>
