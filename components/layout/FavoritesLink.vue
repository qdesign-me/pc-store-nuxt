<template>
  <NuxtLink to="/favorites" class="a" :class="{ 'text-lightblue': store.$state.favorites.length, disabled: !store.$state.favorites.length }">
    <div v-if="store.$state.favorites.length" class="count">{{ store.$state.favorites.length }}</div>
    <FavoritesIcon />
    Сохранить</NuxtLink
  >
</template>

<script setup>
import { useAppStore } from '~/stores/app';
const store = useAppStore();

const items = useCookie('favorites');
items.value = items.value || [];
</script>
