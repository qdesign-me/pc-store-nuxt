<template>
  <button
    v-if="props.variant === 'primary'"
    class="w-10 flex-1 btn is-transparent leading-[50px]"
    :class="{ '!text-blue': store.$state.favorites.includes(props.productID) }"
    @click="store.toggleFavorites(props.productID)"
  >
    <FavoritesIcon />
    Сохранить
  </button>
  <button v-else class="is-transparent p-2 cursor-pointer" :class="{ 'text-blue': store.$state.favorites.includes(props.productID) }">
    <FavoritesIcon @click="store.toggleFavorites(props.productID)" />
  </button>
</template>

<script setup>
const props = defineProps(['productID', 'variant']);
import { useAppStore } from '~/stores/app';
const store = useAppStore();
</script>
