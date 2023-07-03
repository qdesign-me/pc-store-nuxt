<template>
  <NuxtLink :to="link" class="a" :class="{ 'text-blue': store.$state.compare.length }">
    <div v-if="store.$state.compare.length > 0" class="count">{{ store.$state.compare.length }}</div>

    <CompareIcon />
    Сравнить</NuxtLink
  >
</template>

<script setup>
import { useAppStore } from '~/stores/app';
const store = useAppStore();
const link = computed(() => {
  const items = store.$state.compare.join('+');
  return items.length ? `/compare/${items}` : '/compare';
});
</script>
