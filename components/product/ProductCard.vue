<template>
  <div class="card card-product border !pb-[115px] text-black">
    <div class="flex justify-between text-lightgray absolute left-4 right-4 top-3 z-10">
      <Add2Favorites :productID="props.product.productID" />
      <Add2Compare :productID="props.product.productID" />
    </div>

    <div>
      <NuxtLink :to="uri" class="block">
        <ProductThumbs :data="props.product" />
      </NuxtLink>
    </div>

    <NuxtLink :to="uri" class="text-sm font-light mt-4 leading-4 block"
      ><div class="line-clamp-3">{{ props.product.name }}</div>
    </NuxtLink>
    <div class="tags mt-4">
      <div v-if="props.product.is_auction" class="bg-[#4DB732]">Аукцион</div>
      <div v-if="props.product.Price_bn > 500" class="bg-[#F54D4D]">В рассрочку</div>
      <div v-if="props.product.PriceSale_bn > 0" class="bg-[#FFAC2F]">На акции</div>
    </div>

    <div class="price-info">
      <div>
        <div class="w-10">
          <BankIcon class="text-[#E5A35B]" />
        </div>
        <div class="text-2xl whitespace-nowrap">{{ price(props.product.Price_bn) }}</div>

        <Add2Cart class="text-lightgray" :productID="props.product.productID" />
      </div>
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
