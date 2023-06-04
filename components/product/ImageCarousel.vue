<template>
  <div class="carousel">
    <img :src="data.img" width="200" height="200" alt="" />
  </div>
</template>

<script setup>
const props = defineProps(['data']);
</script>
