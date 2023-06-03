<template>
  <div class="ml-auto" :class="{ 'text-lightblue': store.$state.cart.includes(props.productID) }">
    <CartIcon class="cursor-pointer" @click="store.toggleCart(props.productID)" />
  </div>
</template>

<script setup>
const props = defineProps(['productID']);
import { useAppStore } from '~/stores/app';
const store = useAppStore();
</script>
