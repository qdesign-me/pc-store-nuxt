<template>
  <div class="grid grid-cols-1 gap-5 lg:grid-cols-5 lg:gap-2.5 box">
    <NuxtLink :href="props.data.link" class="card bg-[#00B3D7] overflow-hidden group promo-link">
      <img src="/img/promo/similar.png" width="296" height="263" loading="lazy" class="right-0 bottom-0 absolute" />

      <div class="title relative text-white">Похожие товары</div>
      <ArrowLink class="mt-3 relative">
        <span class="underline underline-offset-4">Все товары</span>
      </ArrowLink>
    </NuxtLink>
    <div class="lg:col-span-4">
      <div class="flex gap-2.5 -mr-5 pr-5 overflow-auto md:overflow-visible md:pr-0 md:mr-0 grid-cols-4 md:grid">
        <ProductCard v-for="product in props.data.products" :key="product.productID" :product="product" />
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps(['data']);
</script>
