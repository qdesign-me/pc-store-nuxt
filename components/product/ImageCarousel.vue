<template>
  <div class="carousel">
    <img v-if="images?.length <= 1" :src="images?.[0]" width="200" height="200" alt="" />
    <Swiper class="swiper max-w-[200px]" :modules="[Pagination]" :pagination="{ clickable: true }" v-else>
      <SwiperSlide v-for="img in images" :key="img" class="slide">
        <img :src="img" width="200" height="200" alt="" />
      </SwiperSlide>
    </Swiper>
  </div>
</template>

<script setup>
import { Pagination } from 'swiper';
const props = defineProps(['data']);
const images = computed(() => props.data.img?.split(',').map((img) => `https://win7.by/data/big/${img}`));
</script>
