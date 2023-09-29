<template>
  <div class="carousel">
    <NuxtErrorBoundary>
      <Swiper v-if="images?.length > 1" class="swiper" :modules="[Pagination]" :pagination="{ clickable: true }">
        <SwiperSlide v-for="img in images" :key="img.img" class="slide">
          <img :src="img.img" :width="img.width" :height="img.height" :alt="img.alt" class="aspect-square object-contain" />
        </SwiperSlide>
      </Swiper>
      <img
        v-else
        :src="images[0].img"
        :width="images[0].width"
        :height="images[0].height"
        :alt="images[0].alt"
        class="aspect-square object-contain"
        :class="`w-[${images[0].width}px]`"
      />
    </NuxtErrorBoundary>
  </div>
</template>

<script setup>
import { Pagination } from 'swiper/modules';
const props = defineProps(['images']);
</script>
