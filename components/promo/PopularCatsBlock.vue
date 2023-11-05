<template>
  <div class="title mb-6">Популярные категории</div>
  <div class="grid gap-2.5 grid-cols-1 lg:grid-cols-5 box">
    <NuxtLink v-for="(link, index) in links" :key="link.uri" :to="link.uri" class="card pt-0 bg-blue group height-xs overflow-hidden !min-h-[100px]">
      <div class="text-[20px] font-semibold text-white mt-4">{{ link.title }}</div>
      <img :src="link.img" width="296" height="200" loading="lazy" class="promo-bg" />
      <img :src="`/img/promo/i${index + 1}.png`" loading="lazy" class="absolute bottom-0 right-0" />
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
  { img: '/img/promo/p1.png', uri: '/noutbuki-i-aksessuary/gotovie-komputeri', title: 'Компьютеры' },
  { img: '/img/promo/p2.png', uri: '/noutbuki-i-aksessuary/noutbuki', title: 'Ноутбуки' },
  { img: '/img/promo/p3.png', uri: '/komplektuyuszie', title: 'Комплектующие' },
  { img: '/img/promo/p4.png', uri: '/periferiya-i-aksessuary', title: 'Периферия' },
  { img: '/img/promo/p5.png', uri: '/elektronika', title: 'Электроника' },
];
</script>
