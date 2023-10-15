<template>
  <div class="gap-6 select-none hidden lg:flex">
    <div class="border rounded px-8 py-12">
      <img :src="main" alt="" loading="lazy" width="395" height="395" class="block object-contain aspect-square" />
    </div>
    <div v-if="images?.length > 1" class="flex flex-col gap-2">
      <div v-for="image in images" :key="image">
        <img
          :src="image"
          alt=""
          loading="lazy"
          width="68"
          height="68"
          class="cursor-pointer py-[2px] px-[5px] border rounded object-contain aspect-square"
          :class="{ 'shadow-md': main === image }"
          @click="main = image"
        />
      </div>
    </div>
  </div>

  <div class="lg:hidden max-w-[calc(100vw-60px)]">
    <ProductThumbs :data="props.data" :size="395" />
  </div>
</template>

<script setup>
const props = defineProps(['data']);
const images = props.data.img?.split(',')?.map((item) => `https://win7.by/data/big/${item}`);
const main = ref(images?.[0] ?? '/img/no-image.jpg');
</script>
