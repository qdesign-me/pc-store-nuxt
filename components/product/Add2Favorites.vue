<template>
  <button
    v-if="props.variant === 'primary'"
    class="w-10 flex-1 btn is-transparent leading-[50px]"
    :class="{ '!text-lightblue': store.$state.favorites.includes(props.productID) }"
    @click="store.toggleFavorites(props.productID)"
  >
    <FavoritesIcon />
    Сохранить
  </button>
  <div v-else :class="{ 'text-lightblue': store.$state.favorites.includes(props.productID) }">
    <FavoritesIcon class="cursor-pointer" @click="store.toggleFavorites(props.productID)" />
  </div>
</template>

<script setup>
const props = defineProps(['productID', 'variant']);
import { useAppStore } from '~/stores/app';
const store = useAppStore();
</script>
