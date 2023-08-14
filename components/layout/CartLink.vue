<template>
  <NuxtLink to="/cart" class="a" :class="{ 'text-blue': total > 0 }">
    <div v-if="total" class="count">{{ total }}</div>

    <CartIcon />Купить</NuxtLink
  >
</template>

<script setup>
const { items, total } = useCart();
</script>
