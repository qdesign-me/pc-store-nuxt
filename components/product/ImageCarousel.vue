<template>
  <div class="carousel">
    <img :src="images?.[0] ?? '/img/no-image.jpg'" width="200" height="200" alt="" />
  </div>
  <div class="carousel" v-if="0">
    <Swiper class="swiper max-w-[200px]" :modules="[Pagination]" :pagination="{ clickable: true }">
      <SwiperSlide v-for="img in images" :key="img" class="slide">
        <img :src="img" width="200" height="200" alt="" />
      </SwiperSlide>
    </Swiper>
  </div>
</template>

<script setup>
// import { Pagination } from 'swiper';
// import { Swiper, SwiperSlide } from 'swiper/vue';
// import 'swiper/css';
// import 'swiper/css/pagination';
const props = defineProps(['data']);
const images = computed(() => props.data.img?.split(',').map((img) => `https://win7.by/data/big/${img}`));
</script>
