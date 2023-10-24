<template>
  <NuxtLayout> <NuxtLoadingIndicator color="orange" /> <NuxtPage /> </NuxtLayout>
</template>

<script setup>
const route = useRoute();
const hostname = 'https://i-ven.by';

const path = route.path;

useSeoMeta({
  ogImage: `${hostname}/img/logo.png`,
  twitterCard: 'summary_large_image',
  canonical: `${hostname}${path}`.toLowerCase(),
});
</script>
