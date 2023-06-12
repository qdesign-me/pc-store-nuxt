<template>
  <div class="grid grid-cols-5 gap-2.5">
    <div class="col-span-4">
      <NuxtErrorBoundary>
        <Swiper class="swiper" :modules="[Pagination]" :pagination="{ clickable: true }">
          <SwiperSlide class="slide" v-for="(link, index) in links" :key="index">
            <NuxtLink class="card bg-blue py-0 height-sm justify-center" :to="link.uri">
              <img :src="link.img" alt="" loading="lazy" width="450" height="350" class="slider-bg" />
              <div class="title-lg text-white mb-0 relative" v-html="link.title" />
            </NuxtLink>
          </SwiperSlide>
        </Swiper>
      </NuxtErrorBoundary>
    </div>
    <NuxtLink class="card bg-blue pb-0 height-sm" to="/akcii"
      ><img src="/img/promo/sale.png" alt="" loading="lazy" width="295" height="350" class="promo-bg" />
      <div class="title-lg text-white relative">Все <br />акции</div></NuxtLink
    >
  </div>
</template>

<script setup lang="ts">
import { Pagination } from 'swiper';

const links = [
  { img: '/img/promo/slide1.png', uri: '/elektronika/noutbuki', title: 'ФАНТАСТИЧЕСКИЙ<br />КОРПУС JONSBO D30<br />УЖЕ В ПРОДАЖЕ' },
  { img: '/img/promo/slide1.png', uri: '/elektronika/noutbuki', title: 'Текст 2' },
  { img: '/img/promo/slide1.png', uri: '/elektronika/noutbuki', title: 'Текст 3' },
];
</script>
