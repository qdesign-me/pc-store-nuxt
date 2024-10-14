<template>
  <div class="container can-expand" v-if="links">
    <div class="lg:mt-4 mb-6 lg:mb-[50px]">
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
            <NuxtLink :to="link.uri.toLowerCase()" ref="nofollow">
              <picture>
                <source media="(max-width: 1024px)" :srcset="link.mobi" />
                <img :src="link.img" :alt="link.title" loading="lazy" class="w-full" />
              </picture>
              <!-- <div class="slider-bg"></div> -->

              <div class="text-white absolute top-8 bottom-8 left-6 flex justify-center flex-col lg:text-[24px] leading-[1.3]" v-html="link.title" v-if="link.title" />
            </NuxtLink>
          </SwiperSlide>
        </Swiper>
      </NuxtErrorBoundary>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Pagination, Autoplay } from 'swiper/modules';
import { useAppStore } from '~/stores/app';

const { $state } = useAppStore();
const links = $state.config?.['slider'] ? JSON.parse($state.config['slider']) : null;
</script>
