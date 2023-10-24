<template><ImageSlider :images="images" class="select-none" /></template>

<script setup>
const props = defineProps(['data', 'size']);
const images = computed(() => {
  return props.data.img?.length
    ? props.data.img?.split('|').map((img) => ({ img: `http://img.i-ven.by/big/${img}`, width: props.size ?? 200, height: props.size ?? 200, alt: props.data.name }))
    : [
        {
          img: '/img/no-image.jpg',
          width: 200,
          height: 200,
          alt: props.data.name,
        },
      ];
});
</script>
