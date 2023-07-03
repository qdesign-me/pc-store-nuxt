<template>
  <main class="container">
    <div class="breadcrumbs"><NuxtLink to="/" class="">Главная </NuxtLink><span>Новости</span></div>

    <h1>Новости</h1>
  </main>
</template>
<script setup>
definePageMeta({
  layout: 'default',
});

const meta = {
  title: 'Новости | Интернет-магазин Iven',
  description: 'Новости и анонсы интернет-магазина Iven.',
};

useSeoMeta({
  title: () => meta.title,
  ogTitle: () => meta.title,
  description: () => meta.description,
  ogDescription: () => meta.description,
});
</script>
