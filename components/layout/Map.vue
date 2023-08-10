<template>
  <div style="position: relative; overflow: hidden">
    <iframe
      src="https://yandex.by/map-widget/v1/?ll=27.526095%2C53.912334&mode=poi&poi%5Bpoint%5D=27.525665%2C53.912620&poi%5Buri%5D=ymapsbm1%3A%2F%2Forg%3Foid%3D235734011408&z=19.01"
      width="100%"
      height="500"
      frameborder="1"
      allowfullscreen="true"
      style="position: relative"
    ></iframe>
  </div>
</template>
<script setup>
import { useAppStore } from '~/stores/app';
const { $state } = useAppStore();
</script>
