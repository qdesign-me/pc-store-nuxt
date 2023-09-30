<template>
  <ImageSlider :images="images" class="select-none" />
</template>

<script setup>
const props = defineProps(['data', 'size']);
const images = computed(() => {
  return props.data.img?.length
    ? props.data.img?.split(',').map((img) => ({ img: `https://win7.by/data/big/${img}`, width: props.size ?? 200, height: props.size ?? 200 }))
    : [
        {
          img: '/img/no-image.jpg',
          width: 200,
          height: 200,
        },
      ];
});
</script>
