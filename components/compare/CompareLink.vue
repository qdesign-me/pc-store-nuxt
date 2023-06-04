<template>
  <NuxtLink :to="link" class="a" :class="{ 'text-lightblue': store.$state.compare.length, disabled: store.$state.compare.length < 2 }">
    <div v-if="store.$state.compare.length > 0" class="count">{{ store.$state.compare.length }}</div>

    <CompareIcon />
    Сравнить</NuxtLink
  >
</template>

<script setup>
import { useAppStore } from '~/stores/app';
const store = useAppStore();
const link = computed(() => `/compare/${store.$state.compare.join('+')}`);
</script>
