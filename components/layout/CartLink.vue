<template>
  <NuxtLink to="/cart" class="a" :class="{ 'text-blue': total > 0, disabled: total === 0 }">
    <div v-if="total" class="count">{{ total }}</div>

    <CartIcon />Купить</NuxtLink
  >
</template>

<script setup>
import { useAppStore } from '~/stores/app';
const store = useAppStore();
const total = computed(() => Object.values(store.$state.items).reduce((acc, item) => acc + +item, 0));
</script>
