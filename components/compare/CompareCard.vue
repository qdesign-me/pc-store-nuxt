<template>
  <div class="flex flex-col gap-2 items-center relative px-14 pt-2 pb-10">
    <button @click="emit('remove', props.product.productID)">удалить</button>
    <NuxtLink :to="uri">
      <ProductThumbs :data="props.product" class="mx-auto my-2" />
    </NuxtLink>

    <NuxtLink :to="uri" class="max-w-[240px] mx-auto line-clamp-2">{{ props.product.name }}</NuxtLink>

    <Add2Cart :productID="props.product.productID" variant="primary" />

    <div class="tags absolute right-0">
      <div class="bg-[#4DB732]" v-if="props.product.is_auction > 0">Аукцион</div>
      <div class="bg-[#F54D4D]" v-if="props.product.Price_bn > 500">В рассрочку</div>
      <div class="bg-[#FFAC2F]" v-if="props.product.PriceSale_bn > 0">На акции</div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps(['product']);
const emit = defineEmits('remove');
const uri = '/p/' + props.product?.uri?.replace('.html', '');
</script>
