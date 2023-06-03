<template>
  <main class="container">
    <div class="breadcrumbs">
      <NuxtLink to="/">Главная</NuxtLink>
      <span>Сравнение товаров</span>
    </div>

    <h2 class="mb-10">Сравнение товаров</h2>
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
</script>
