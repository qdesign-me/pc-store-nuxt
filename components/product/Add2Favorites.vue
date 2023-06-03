<template>
  <div :class="{ 'text-lightblue': store.$state.favorites.includes(props.productID) }">
    <FavoritesIcon class="cursor-pointer" @click="store.toggleFavorites(props.productID)" />
  </div>
</template>

<script setup>
const props = defineProps(['productID']);
import { useAppStore } from '~/stores/app';
const store = useAppStore();
</script>
