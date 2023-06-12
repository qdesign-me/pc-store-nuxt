<template>
  <div class="title">Популярные категории</div>
  <div class="grid grid-cols-5 gap-2.5">
    <NuxtLink v-for="(link, index) in links" :key="link.uri" :to="link.uri" class="card pt-0 bg-blue group h-[200px]">
      <img :src="link.img" width="296" height="200" loading="lazy" class="promo-bg" />
      <ArrowLink class="absolute bottom-6">{{ link.title }}</ArrowLink>
    </NuxtLink>
  </div>
</template>

<script setup>
const links = [
  { img: '/img/categories/1.png', uri: '/elektronika/Gotovie-komputeri', title: 'Компьютеры' },
  { img: '/img/categories/2.png', uri: '/elektronika/noutbuki', title: 'Ноутбуки' },
  { img: '/img/categories/3.png', uri: '/komplektuyuszie', title: 'Комплектующие' },
  { img: '/img/categories/4.png', uri: '/periferiya-i-aksessuary', title: 'Периферия' },
  { img: '/img/categories/5.png', uri: '/elektronika', title: 'Электроника' },
];
</script>
