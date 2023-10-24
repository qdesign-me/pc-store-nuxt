<template>
  <div class="gap-6 select-none hidden lg:flex">
    <div class="border rounded px-8 py-12">
      <!-- <NuxtImg/> -->
      <img :src="main" :alt="props.data.name" width="600" height="600" class="w-[395px] h-[395px] block cursor-pointer object-contain aspect-square" @click="setVisible(main)" />
    </div>
    <div v-if="images?.length > 1" class="flex flex-col gap-2">
      <div v-for="image in images" :key="image">
        <!-- <NuxtImg/> -->
        <img
          :src="image"
          :alt="props.data.name"
          loading="lazy"
          width="600"
          height="600"
          class="cursor-pointer py-[2px] px-[5px] border rounded object-contain aspect-square w-[68px] h-[68px]"
          :class="{ 'shadow-md': main === image }"
          @click="main = image"
        />
      </div>
    </div>
  </div>

  <div class="lg:hidden max-w-[calc(100vw-60px)]">
    <ProductThumbs :data="props.data" :size="600" />
  </div>

  <a-image
    v-if="!!visible"
    :width="100"
    :style="{ display: 'none' }"
    :preview="{
      visible,
      onVisibleChange: () => setVisible(false),
    }"
    :src="visible"
  />
</template>

<script setup>
import { ref } from 'vue';
const visible = ref(false);
const props = defineProps(['data']);
const images = props.data.img?.split('|')?.map((item) => `http://img.i-ven.by/big/${item}`);
const main = ref(images?.[0] ?? '/img/no-image.jpg');
const setVisible = (value) => {
  visible.value = value;
};
</script>
