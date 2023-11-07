<template>
  <div class="container can-expand" v-if="links">
    <div class="grid grid-cols-1 lg:grid-cols-5 lg:gap-2.5 box lg:mt-4">
      <div class="lg:col-span-4 slider relative">
        <NuxtErrorBoundary>
          <Swiper class="swiper rounded overflow-hidden hover:shadow" :pagination="{ clickable: true }" :modules="[Pagination]">
            <SwiperSlide class="slide" v-for="(link, index) in links" :key="index">
              <NuxtLink class="card more-padding bg-blue py-0 height-sm justify-center relative" :to="link.uri">
                <picture>
                  <source media="(max-width: 1024px)" :srcset="link.mobi" />
                  <img :src="link.img" :alt="link.title" loading="lazy" width="450" height="350" class="slider-bg" />
                </picture>
                <div class="slider-bg"></div>

                <div class="text-white absolute top-8 bottom-8 left-6 flex flex-col lg:text-[24px] leading-[1.3]" v-html="link.title" />
              </NuxtLink>
            </SwiperSlide>
          </Swiper>
        </NuxtErrorBoundary>
      </div>
      <NuxtLink class="card pt-5 px-4 rounded overflow-hidden more-padding bg-blue pb-0 height-sm link-alt hidden lg:block" to="/payment#credit">
        <picture>
          <source media="(max-width: 1024px)" srcset="/img/promo/sale-mobi.png" />
          <img src="/img/promo/zero.png" alt="Скидка" loading="lazy" width="190" height="200" class="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 mt-4" />
        </picture>
        <div class="h2 text-white relative">РАССРОЧКА <br />БЕЗ ПЕРЕПЛАТ!</div>

        <div class="flex justify-between absolute left-5 right-5 bottom-5">
          <img src="/img/info/vtb.png" loading="lazy" width="64" height="40" alt="ВТБ" data-v-inspector="pages/payment/index.vue:20:17" /><img
            src="/img/info/halva.png"
            loading="lazy"
            width="64"
            height="40"
            alt="Халва"
          /><img src="/img/info/magnit.png" loading="lazy" width="64" height="40" alt="Магнит" />
        </div>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Pagination } from 'swiper/modules';
import { useAppStore } from '~/stores/app';

const { $state } = useAppStore();
const links = $state.config?.['slider'] ? JSON.parse($state.config['slider']) : null;
</script>
