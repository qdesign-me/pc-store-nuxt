<template>
  <MainCategory :data="data" />
</template>
<script setup>
const { data } = await useFetch('/api/categories/maincat', {
  method: 'POST',
  body: {
    categoryID: 364,
  },
});

definePageMeta({
  layout: 'default',
});

const title = `${data.value.name} | Интернет-магазин Iven`;
const description = data.value.meta_description ? data.value.meta_description : `${data.value.name} в интернет-магазине Iven.`;

useSeoMeta({
  title: () => title,
  ogTitle: () => title,
  description: () => description,
  ogDescription: () => description,
});
</script>
