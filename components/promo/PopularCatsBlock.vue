<template>
  <div class="title mb-6">Популярные категории</div>
  <div class="grid gap-2.5 grid-cols-1 lg:grid-cols-5 box">
    <NuxtLink v-for="(link, index) in links" :key="link.uri" :to="link.uri.toLowerCase()" class="card px-5 pt-0 bg-blue group height-xs overflow-hidden !min-h-[100px] group">
      <div class="text-[20px] font-semibold text-white mt-4 relative z-[2]">{{ link.title }}</div>
      <img :src="`/img/promo/p${index + 1}.png`" width="296" height="200" loading="lazy" class="promo-bg" />
      <img :src="link.img" loading="lazy" class="h-[60px] lg:h-auto absolute transition duration-300 group-hover:scale-[1.1]" :class="link.class" />
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
  { class: 'right-5 bottom-5 lg:bottom-5 lg:right-8', img: '/img/promo/ssd.png', uri: '/komplektuyuszie/zhestkie-diski/solid-state-drive', title: 'SSD' },
  { class: 'right-5 bottom-5 lg:bottom-5 lg:right-5', img: '/img/promo/proc.png', uri: '/komplektuyuszie/processory', title: 'Процессоры' },
  {
    class: 'right-5 bottom-5 lg:right-auto lg:left-1/2 lg:top-1/2 lg:-translate-x-1/2 lg:-translate-y-1/3',
    img: '/img/promo/videocard.png',
    uri: '/komplektuyuszie/videokarty-videozahvat',
    title: 'Видеокарты',
  },
  { class: 'right-5 bottom-5 lg:bottom-2 lg:right-5', img: '/img/promo/corpus.png', uri: '/komplektuyuszie/korpusa', title: 'Корпуса' },
  {
    class: 'right-5 bottom-5 lg:right-auto lg:left-1/2 lg:top-1/2 lg:-translate-x-1/2 lg:-translate-y-1/3',
    img: '/img/promo/monoblock.png',
    uri: '/noutbuki-i-aksessuary/Monobloki',
    title: 'Моноблоки',
  },
];
</script>
