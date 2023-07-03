<template>
  <main class="container">
    <div class="breadcrumbs">
      <NuxtLink to="/">Главная </NuxtLink>
      <span>Корзина</span>
    </div>
    <h1>Корзина</h1>
    <div v-if="!total" class="flex flex-col items-center justify-center">
      <CartIcon width="100" height="105" class="text-blue mb-6" />
      <div class="mb-2">В корзине пока ничего нет</div>
      <div class="opacity-50">Нажмите <CartIcon class="inline -mt-1" width="19" height="19" /> для добавления в корзину</div>
      <NuxtLink to="/catalog" class="btn is-large mt-10 xl:mb-20 min-w-[300px]">Перейти в каталог</NuxtLink>
    </div>
    <pre v-else>{{ data }}</pre>
  </main>
</template>
<script setup>
const items = useCookie('items');
items.value = items.value || {};

const { data } = await useFetch('/api/products', {
  method: 'POST',
  body: {
    sortby: 'popular',
    sortdir: 'desc',
    where: {
      'productID:in': Object.keys(items.value) ?? [0],
    },
  },
});

definePageMeta({
  layout: 'default',
});

const meta = {
  title: 'Корзина | Интернет-магазин Iven',
  description: 'Корзина товаров.',
};

useSeoMeta({
  title: () => meta.title,
  ogTitle: () => meta.title,
  description: () => meta.description,
  ogDescription: () => meta.description,
  robots: 'noindex',
});
</script>
