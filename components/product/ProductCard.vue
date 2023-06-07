<template>
  <div class="card border !pb-[115px] text-black">
    <div class="flex justify-between mb-8 -mt-2 text-lightgray">
      <Add2Favorites :productID="props.product.productID" />
      <Add2Compare :productID="props.product.productID" />
    </div>

    <div>
      <NuxtLink :to="uri" class="block">
        <ImageCarousel :data="props.product" />
      </NuxtLink>
    </div>
    <NuxtLink :to="uri" class="text-sm font-light leading-4 mt-4">{{ props.product.name }}</NuxtLink>

    <div class="price-info">
      <div>
        <div class="w-10">
          <ValetIcon />
        </div>
        <div class="font-sm">{{ price(props.product.Price_bn) }}</div>
      </div>

      <div>
        <div class="w-10">
          <BankIcon />
        </div>
        <div class="text-2xl">{{ price(props.product.Price_bn) }}</div>

        <Add2Cart :productID="props.product.productID" />
      </div>
    </div>

    <div class="info">
      <OkIcon v-if="props.product.is_new" />
      <PercentIcon v-if="props.product.is_sale" />
    </div>

    <div class="tags">
      <div v-if="props.product.is_auction" class="bg-[#4DB732]">Аукцион</div>
      <div v-if="props.product.Price_bn > 500" class="bg-[#F54D4D]">В рассрочку</div>
      <div v-if="props.product.PriceSale_bn > 0" class="bg-[#FFAC2F]">На акции</div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps(['product']);
const uri = '/p/' + props.product?.uri?.replace('.html', '');
</script>
