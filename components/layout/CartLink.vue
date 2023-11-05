<template>
  <div class="a" :class="{ 'text-blue': total > 0 }">
    <div v-if="total" class="count">{{ total }}</div>
    <CartIconAlt />Купить
  </div>
</template>

<script setup>
const { total } = useCart();
</script>
