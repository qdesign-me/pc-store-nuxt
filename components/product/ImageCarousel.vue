<template>
  <div class="carousel">
    <Swiper class="swiper" :modules="[Pagination]" :pagination="{ clickable: true }">
      <SwiperSlide v-for="img in images" :key="img" class="slide">
        <NuxtLink :to="props.to" class="mb-8 block">
          <img :src="img" width="200" height="200" alt="" />
        </NuxtLink>
      </SwiperSlide>
    </Swiper>
  </div>
</template>

<script setup>
import { Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
import 'swiper/css/pagination';
const props = defineProps(['data', 'to']);
const images = computed(() => props.data.img?.split(',').map((img) => `https://win7.by/data/big/${img}`));
</script>
