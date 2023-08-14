<template>
  <NuxtLink to="/favorites" class="a" :class="{ 'text-blue': items.length }">
    <div v-if="items.length" class="count">{{ items.length }}</div>
    <FavoritesIcon />
    Сохранить</NuxtLink
  >
</template>

<script setup>
const { items } = useFavorites();
</script>
