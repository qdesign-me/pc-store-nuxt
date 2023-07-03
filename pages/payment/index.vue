<template>
  <main class="container">
    <div class="breadcrumbs"><NuxtLink to="/" class="">Главная </NuxtLink><span>Оплата</span></div>

    <h1>Оплата заказов</h1>
  </main>
</template>
<script setup>
definePageMeta({
  layout: 'default',
});

const meta = {
  title: 'Оплата заказов | Интернет-магазин Iven',
  description: 'Оплата заказов на нашем сайте возможна наличными при получении, с помощью системы Расчет“ ЕРИП, webmoney и по безналу.',
};

useSeoMeta({
  title: () => meta.title,
  ogTitle: () => meta.title,
  description: () => meta.description,
  ogDescription: () => meta.description,
});
</script>
