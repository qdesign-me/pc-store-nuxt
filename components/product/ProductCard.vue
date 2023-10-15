<template>
  <div class="card card-product border !pb-[115px] text-black">
    <div class="tags min-h-[21px] -mb-3 absolute z-10">
      <div v-if="props.product.is_auction" class="bg-[#4DB732]">Аукцион</div>
      <div v-if="props.product.Price_bn > 500" class="bg-[#F54D4D]">В рассрочку</div>
      <div v-if="props.product.PriceSale_bn > 0" class="bg-[#FFAC2F]">На акции</div>
    </div>
    <div>
      <NuxtLink :to="uri" class="block">
        <ProductThumbs :data="props.product" />
      </NuxtLink>
    </div>

    <NuxtLink :to="uri" class="text-sm font-light leading-4 block mt-2">
      <div class="mb-2">{{ props.product.productID }}</div>
      <div class="line-clamp-3">{{ props.product.name }}</div>
    </NuxtLink>

    <div class="price-info">
      <div class="flex justify-between gap-2 my-2">
        <div class="text-2xl whitespace-nowrap">
          <span class="line-through text-sm mr-2" v-if="props.product.PriceSale_bn">{{ price(props.product.PriceSale_bn) }} </span>
          <span :class="{ 'text-red-600': props.product.PriceSale_bn > 0 }">{{ price(props.product.Price_bn) }}</span>
        </div>
        <div class="flex justify-between text-lightgray -mr-2">
          <Add2Favorites :productID="props.product.productID" />
          <Add2Compare :productID="props.product.productID" />
        </div>
      </div>
      <Add2Cart :productID="props.product.productID" />
    </div>

    <div class="info">
      <OkIcon v-if="props.product.is_new" />
      <PercentIcon v-if="props.product.is_sale" />
    </div>
  </div>
</template>

<script setup>
const props = defineProps(['product']);
const uri = '/p/' + props.product?.uri?.replace('.html', '');
</script>
