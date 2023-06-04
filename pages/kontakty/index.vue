<template>
  <main class="container">
    <div class="breadcrumbs">
      <NuxtLink to="/">Главная </NuxtLink>
      <span>Контактная информация</span>
    </div>
    <h1>Контактная информация</h1>
  </main>
</template>
<script setup>
definePageMeta({
  layout: 'default',
});

const meta = {
  title: 'Контактная информация | Интернет-магазин Iven',
  description: 'Контактный телефон: 541-80-80. Адрес:	Минск, ул.Репина 4, пом.475. Режим работы: пн.-пт.: 10.00 - 19.00, сб: 11.00 - 14.00, вс: выходной.',
};

useSeoMeta({
  title: () => meta.title,
  ogTitle: () => meta.title,
  description: () => meta.description,
  ogDescription: () => meta.description,
});
</script>
