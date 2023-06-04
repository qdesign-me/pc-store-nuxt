<template>
  <main class="container">
    <div class="breadcrumbs">
      <NuxtLink to="/">Главная </NuxtLink>
      <span>Отложенные</span>
    </div>
    <h1>Отложенные товары</h1>
    <pre>{{ data }}</pre>
  </main>
</template>
<script setup>
const items = useCookie('favorites');
items.value = items.value || [];

const { data } = await useFetch('/api/products', {
  method: 'POST',
  body: {
    sortby: 'popular',
    sortdir: 'desc',
    where: {
      'productID:in': items.value.map((item) => +item),
    },
  },
});

definePageMeta({
  layout: 'default',
});

const meta = {
  title: 'Отложенные товары | Интернет-магазин Iven',
  description: 'Отложенные товары.',
};

useSeoMeta({
  title: () => meta.title,
  ogTitle: () => meta.title,
  description: () => meta.description,
  ogDescription: () => meta.description,
  robots: 'noindex',
});
</script>
