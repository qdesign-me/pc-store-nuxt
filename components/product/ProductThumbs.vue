<template>
  <ImageSlider :images="images" />
</template>

<script setup>
const props = defineProps(['data']);
const images = computed(() => {
  return props.data.img?.length
    ? props.data.img?.split(',').map((img) => ({ img: `https://win7.by/data/big/${img}`, width: 200, height: 200 }))
    : [
        {
          img: '/img/no-image.jpg',
          width: 200,
          height: 200,
        },
      ];
});
</script>
