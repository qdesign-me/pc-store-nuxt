<template>
  <div class="container can-expand" v-if="links">
    <div class="grid grid-cols-1 lg:grid-cols-5 lg:gap-2.5 lg:box lg:mt-4">
      <div class="lg:col-span-4 slider">
        <NuxtErrorBoundary>
          <Swiper class="swiper rounded overflow-hidden hover:shadow" :pagination="{ clickable: true }" :modules="[Pagination]">
            <SwiperSlide class="slide" v-for="(link, index) in links" :key="index">
              <NuxtLink class="card more-padding bg-blue py-0 height-sm justify-center" :to="link.uri">
                <picture>
                  <source media="(max-width: 1024px)" :srcset="link.mobi" />
                  <img :src="link.img" :alt="link.title" loading="lazy" width="450" height="350" class="slider-bg" />
                </picture>

                <div class="title-lg text-white mb-0 relative" v-html="link.title" />
              </NuxtLink>
            </SwiperSlide>
          </Swiper>
        </NuxtErrorBoundary>
      </div>
      <NuxtLink class="card rounded overflow-hidden more-padding bg-blue pb-0 height-sm link-alt" to="/akcii">
        <picture>
          <source media="(max-width: 1024px)" srcset="/img/promo/sale-mobi.png" />
          <img src="/img/promo/sale.png" alt="Скидка" loading="lazy" width="295" height="350" class="promo-bg" />
        </picture>
        <div class="title-lg text-white relative">Все <br />акции</div>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Pagination } from 'swiper/modules';
import { useAppStore } from '~/stores/app';

// const links = [
//   { img: '/img/promo/slide1.png', mobi: '/img/promo/slide1-mobi.png', uri: '/elektronika/noutbuki', title: 'ФАНТАСТИЧЕСКИЙ<br />КОРПУС JONSBO D30<br />УЖЕ В ПРОДАЖЕ' },
//   { img: '/img/promo/slide1.png', mobi: '/img/promo/slide1-mobi.png', uri: '/elektronika/noutbuki', title: 'Текст 2' },
// ];
const { $state } = useAppStore();
const links = $state.config?.['slider'] ? JSON.parse($state.config['slider']) : null;
</script>
