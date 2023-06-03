<template>
  <div class="title">Популярные категории</div>
  <div class="grid grid-cols-5 gap-2.5">
    <NuxtLink v-for="(link, index) in links" :key="link.uri" :to="link.uri" :class="['card  pt-0', bgs[index]].join(' ')">
      <img :src="link.thumb" width="200" height="155" loading="lazy" class="mx-auto" />
      <div class="note">{{ link.name }} <ArrowRightIcon /></div>
    </NuxtLink>
  </div>
</template>

<script setup>
const links = [
  { thumb: '/img/promo/asus-laptop.png', uri: '/elektronika/Gotovie-komputeri', name: 'Компьютеры' },
  { thumb: '/img/promo/asus-laptop.png', uri: '/elektronika/noutbuki', name: 'Ноутбуки' },
  { thumb: '/img/promo/asus-laptop.png', uri: '/komplektuyuszie', name: 'Комплектующие' },
  { thumb: '/img/promo/asus-laptop.png', uri: '/periferiya-i-aksessuary', name: 'Периферия' },
  { thumb: '/img/promo/asus-laptop.png', uri: '/elektronika', name: 'Электроника' },
];
const bgs = ['bg-orange', 'bg-coral', 'bg-sea', 'bg-blue', 'bg-yellow'];
</script>
