<template>
  <div class="container can-expand" v-if="links">
    <div class="grid grid-cols-1 lg:grid-cols-5 lg:gap-2.5 lg:mt-4 mb-3 lg:mb-[50px]">
      <div class="lg:col-span-4 slider relative">
        <NuxtErrorBoundary>
          <Swiper
            class="swiper rounded overflow-hidden hover:shadow"
            :pagination="{ clickable: true }"
            :modules="[Pagination, Autoplay]"
            :autoplay="{
              delay: 35000,
              disableOnInteraction: false,
            }"
          >
            <SwiperSlide class="slide" v-for="(link, index) in links" :key="index">
              <NuxtLink class="card more-padding bg-blue py-0 height-sm justify-center relative" :to="link.uri.toLowerCase()">
                <picture>
                  <source media="(max-width: 1024px)" :srcset="link.mobi" />
                  <img :src="link.img" :alt="link.title" loading="lazy" width="450" height="350" class="slider-bg" />
                </picture>
                <div class="slider-bg"></div>

                <div class="text-white absolute top-8 bottom-8 left-6 flex justify-center flex-col lg:text-[24px] leading-[1.3]" v-html="link.title" />
              </NuxtLink>
            </SwiperSlide>
          </Swiper>
        </NuxtErrorBoundary>
      </div>
      <div class="px-5 pt-3 lg:p-0">
        <NuxtLink
          class="card pt-5 px-4 !rounded overflow-hidden more-padding pb-0 height-sm bg-cover bg-no-repeat bg-center"
          to="/p/30-xiaomi-mi-curved-gaming-30-bhr5116gl--2560x1440--va--200hz--2xhdmi--dp-_161008"
          style="background-image: url(/img/promo/bg.png)"
        >
          <img
            src="/img/promo/curved-monitor.jpg"
            alt="Скидка"
            loading="lazy"
            width="260"
            height="250"
            class="absolute lg:left-5 right-2 lg:right-5 top-2 bottom-2 lg:bottom-5 lg:top-auto h-[calc(100%-16px)] lg:h-auto"
          />

          <div class="text-white relative text-[20px] sm:text-[30px] font-extrabold leading-[1.2] mb-2">Изогнутый<br class="hidden sm:block" />30" монитор</div>

          <div class="text-lg font-semibold relative text-white leading-[1.2]">Идеальное сочетание<br />для гейминга <br />и работы!</div>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Pagination, Autoplay } from 'swiper/modules';
import { useAppStore } from '~/stores/app';

const { $state } = useAppStore();
const links = $state.config?.['slider'] ? JSON.parse($state.config['slider']) : null;
</script>
