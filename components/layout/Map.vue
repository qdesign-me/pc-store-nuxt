<template>
  <iframe
    :src="`https://www.google.com/maps/embed?pb=${$state.config.map}`"
    width="100%"
    height="500"
    style="border: 0"
    allowfullscreen=""
    loading="lazy"
    referrerpolicy="no-referrer-when-downgrade"
  ></iframe>
</template>
<script setup>
import { useAppStore } from '~/stores/app';
const { $state } = useAppStore();
</script>
