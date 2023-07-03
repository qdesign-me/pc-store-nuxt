<template>
  <main class="container">
    <div class="breadcrumbs">
      <NuxtLink to="/">Главная </NuxtLink>
      <span>Корзина</span>
    </div>
    <h1>Сравнение товаров</h1>
    <div class="flex flex-col items-center justify-center">
      <CompareIcon width="100" height="90" class="text-blue mb-6" />
      <div class="mb-2">В сравнении пока ничего нет</div>
      <div class="opacity-50">Нажмите <CompareIcon class="inline -mt-1" width="21" height="19" /> для сравнения товаров</div>
      <NuxtLink to="/catalog" class="btn is-large mt-10 xl:mb-20 min-w-[300px]">Перейти в каталог</NuxtLink>
    </div>
  </main>
</template>
<script setup>
definePageMeta({
  layout: 'default',
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
