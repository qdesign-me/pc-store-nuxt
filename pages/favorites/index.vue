<template>
  <main class="container">
    <div class="breadcrumbs">
      <NuxtLink to="/">Главная </NuxtLink>
      <span>Отложенные</span>
    </div>
    <h1>Отложенные товары</h1>
    <div v-if="!items.length" class="flex flex-col items-center justify-center">
      <FavoritesIcon width="100" height="90" class="text-blue mb-6" />
      <div class="mb-2">В избранном пока ничего нет</div>
      <div class="opacity-50">Нажмите <FavoritesIcon class="inline -mt-1" width="21" height="19" /> для добавления в избранное</div>
      <NuxtLink to="/catalog" class="btn is-large mt-10 xl:mb-20 min-w-[300px]">Перейти в каталог</NuxtLink>
    </div>
    <pre v-else>{{ data }}</pre>
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
