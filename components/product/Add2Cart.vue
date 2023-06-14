<template>
  <button
    v-if="props.variant === 'primary'"
    class="btn w-full text-white"
    :class="{ 'is-plain': !store.$state.cart.includes(props.productID) }"
    @click="store.toggleCart(props.productID)"
  >
    <CartIcon /> В корзину
  </button>
  <div v-else class="ml-auto" :class="{ '!text-blue': store.$state.cart.includes(props.productID) }">
    <CartIcon class="cursor-pointer" @click="store.toggleCart(props.productID)" />
  </div>
</template>

<script setup>
const props = defineProps(['productID', 'variant']);
import { useAppStore } from '~/stores/app';
const store = useAppStore();
</script>
