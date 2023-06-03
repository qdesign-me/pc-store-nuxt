<template>
  <div class="flex flex-col gap-2 items-center relative px-14 pt-2 pb-10">
    <button @click="emit('remove', props.product.productID)">удалить</button>
    <img src="/img/products/item-1.jpg" loading="lazy" width="136" height="204" alt="" class="mx-auto my-2" />
    <div class="max-w-[240px] mx-auto line-clamp-2">{{ props.product.name }}</div>
    <button class="btn w-full text-white" :class="{ 'is-plain': !store.$state.cart.includes(props.product.productID) }" @click="store.toggleCart(props.product.productID)">
      <CartIcon /> В корзину
    </button>
    <div class="tags absolute right-0">
      <div class="bg-[#4DB732]" v-if="props.product.is_auction > 0">Аукцион</div>
      <div class="bg-[#F54D4D]" v-if="props.product.Price_bn > 500">В рассрочку</div>
      <div class="bg-[#FFAC2F]" v-if="props.product.PriceSale_bn > 0">На акции</div>
    </div>
  </div>
</template>

<script setup>
import { useAppStore } from '~/stores/app';
const store = useAppStore();
const props = defineProps(['product']);
const emit = defineEmits('remove');
</script>
