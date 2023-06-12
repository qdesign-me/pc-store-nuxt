<template>
  <NuxtLink to="/cart" class="a" :class="{ 'text-blue': store.$state.cart.length, disabled: !store.$state.cart.length }">
    <div v-if="store.$state.cart.length" class="count">{{ store.$state.cart.length }}</div>

    <CartIcon />Купить</NuxtLink
  >
</template>

<script setup>
import { useAppStore } from '~/stores/app';
const store = useAppStore();
</script>
