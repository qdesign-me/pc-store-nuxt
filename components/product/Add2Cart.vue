<template>
  <button v-if="props.variant === 'primary'" class="btn w-full text-white" :class="{ 'is-plain': !inCart }"><CartIcon /> В корзину</button>
  <div v-else>
    <button v-if="!inCart" class="btn flex w-full relative is-plain" @click="add(props.productID, 1)"><CartIcon class="cursor-pointer" />В корзину</button>
    <div v-else class="flex gap-2 w-full add2cart">
      <NuxtLink to="/cart" class="btn flex relative flex-1 px-2.5">В корзине</NuxtLink>
      <InputQty :productID="props.productID" v-bind="$attrs" />
    </div>
  </div>
</template>

<script setup>
const props = defineProps(['productID', 'variant']);
const { items, add } = useCart();
const inCart = computed(() => items?.value?.[props.productID] > 0);
</script>
