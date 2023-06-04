<template>
  <NuxtLayout> <NuxtLoadingIndicator color="orange" /> <NuxtPage /> </NuxtLayout>
</template>

<script setup>
const route = useRoute();
const hostname = process.env?.BASE_URL;

const path = route.path;

useSeoMeta({
  ogImage: `${hostname}/img/logo.png`,
  twitterCard: 'summary_large_image',
  canonical: `${hostname}${path}`,
});
</script>
