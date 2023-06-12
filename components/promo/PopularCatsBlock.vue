<template>
  <div class="title">Популярные категории</div>
  <div class="grid grid-cols-5 gap-2.5">
    <NuxtLink v-for="(link, index) in links" :key="link.uri" :to="link.uri" class="card pt-0 bg-lightblue group h-[200px]">
      <img :src="link.thumb" width="296" height="200" loading="lazy" class="promo-bg" />
      <ArrowLink class="absolute bottom-6">{{ link.name }}</ArrowLink>
    </NuxtLink>
  </div>
</template>

<script setup>
const links = [
  { thumb: '/img/categories/1.png', uri: '/elektronika/Gotovie-komputeri', name: 'Компьютеры' },
  { thumb: '/img/categories/2.png', uri: '/elektronika/noutbuki', name: 'Ноутбуки' },
  { thumb: '/img/categories/3.png', uri: '/komplektuyuszie', name: 'Комплектующие' },
  { thumb: '/img/categories/4.png', uri: '/periferiya-i-aksessuary', name: 'Периферия' },
  { thumb: '/img/categories/5.png', uri: '/elektronika', name: 'Электроника' },
];
</script>
