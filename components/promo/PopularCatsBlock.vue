<template>
  <div class="title mb-6">Популярные категории</div>
  <div class="grid gap-2.5 grid-cols-2 lg:grid-cols-5 box">
    <NuxtLink v-for="(link, index) in links" :key="link.uri" :to="link.uri" class="card pt-0 bg-blue group height-xs overflow-hidden">
      <img :src="link.img" width="296" height="200" loading="lazy" class="promo-bg" />
      <ArrowLink class="absolute bottom-6">{{ link.title }}</ArrowLink>
    </NuxtLink>
    <NuxtLink to="/" class="card bg-blue group height-xs overflow-hidden lg:hidden !hidden">
      <div class="title text-white">
        Заказать
        <br />
        сборку
      </div>
      <ArrowRightIcon class="text-white mt-2 block group-hover:translate-x-2" v-if="0" />
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
