<template>
  <main class="container">
    <div class="breadcrumbs"><NuxtLink to="/" class="">Главная </NuxtLink><span>Доставка</span></div>

    <h1>Доставка</h1>
  </main>
</template>
<script setup>
definePageMeta({
  layout: 'default',
});

const meta = {
  title: 'Доставка | Интернет-магазин Iven',
  description: 'Узнать стоимость, сроки доставки и адрес пункта выдачи интернет-магазина Iven.',
};

useSeoMeta({
  title: () => meta.title,
  ogTitle: () => meta.title,
  description: () => meta.description,
  ogDescription: () => meta.description,
});
</script>
