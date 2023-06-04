<template>
  <main class="container">
    <div class="breadcrumbs">
      <NuxtLink to="/">Главная </NuxtLink>
      <span>О компании</span>
    </div>
    <h1>О компании</h1>
  </main>
</template>
<script setup>
definePageMeta({
  layout: 'default',
});

const meta = {
  title: 'О компании | Интернет-магазин Iven',
  description: 'Iven успешно работает в сфере компьютеров и комплектующих для ПК с 1998 года. Доставка по Беларуси.',
};

useSeoMeta({
  title: () => meta.title,
  ogTitle: () => meta.title,
  description: () => meta.description,
  ogDescription: () => meta.description,
});
</script>
