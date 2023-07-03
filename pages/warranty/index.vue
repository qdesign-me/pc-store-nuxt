<template>
  <main class="container">
    <div class="breadcrumbs"><NuxtLink to="/" class="">Главная </NuxtLink><span>Гарантия</span></div>

    <h1>Гарантия и возврат</h1>
  </main>
</template>
<script setup>
definePageMeta({
  layout: 'default',
});

const meta = {
  title: 'Гарантия и возврат | Интернет-магазин Iven',
  description: 'Гарантийное обслуживание, обмен и возврат товаров, приобретённых в интернет-магазине Iven.',
};

useSeoMeta({
  title: () => meta.title,
  ogTitle: () => meta.title,
  description: () => meta.description,
  ogDescription: () => meta.description,
});
</script>
