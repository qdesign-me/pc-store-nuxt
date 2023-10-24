<template>
  <div class="flex flex-col gap-2 relative pt-2 pb-10 text-sm group">
    <button @click="emit('remove', props.product.productID)" class="absolute right-0 top-0 lg:hidden group-hover:block"><CloseIcon /></button>
    <NuxtLink :to="uri">
      <ProductThumbs :data="props.product" class="mx-auto my-2" />
    </NuxtLink>

    <div class="flex gap-2">
      <div class="line-through text-xs translate-y-[7px]" v-if="props.product.PriceSale">{{ price(props.product.PriceSale) }}</div>
      <div class="font-semibold text-lg" :class="{ 'text-red-600': props.product.PriceSale > 0 }">{{ price(props.product.Price) }}</div>
    </div>

    <NuxtLink :to="uri" class="line-clamp-2 min-h-[40px]">{{ props.product.name }}</NuxtLink>

    <Add2Cart :productID="props.product.productID" />
  </div>
</template>

<script setup>
const props = defineProps(['product']);
const emit = defineEmits('remove');
const uri = '/p/' + props.product?.uri?.replace('.html', '');
</script>
