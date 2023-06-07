<template>
  <main class="container">
    <div class="breadcrumbs">
      <NuxtLink to="/">Главная </NuxtLink>
      <span>Корзина</span>
    </div>
    <h1>Сравнение товаров</h1>

    <CompareTable :data="data.data" />
  </main>
</template>
<script setup>
definePageMeta({
  layout: 'default',
});

const route = useRoute();
const id = route.params.ids.split('+');
const { data } = await useFetch('/api/products/compare', {
  method: 'POST',
  body: {
    id,
  },
});

const meta = {
  title: 'Сравнение товаров | Интернет-магазин Iven',
  description: 'Сравнение товаров.',
};

useSeoMeta({
  title: () => meta.title,
  ogTitle: () => meta.title,
  description: () => meta.description,
  ogDescription: () => meta.description,
  robots: 'noindex',
});
</script>
