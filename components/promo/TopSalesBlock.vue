<template>
  <div class="grid grid-cols-5 gap-2.5">
    <NuxtLink to="/top-prodazh" class="card bg-blue overflow-hidden group">
      <img src="/img/promo/top.png" width="296" height="400" loading="lazy" class="promo-bg" />
      <div class="title relative">Топ продаж</div>
      <ArrowLink class="mt-3 relative">Все новинки</ArrowLink>
    </NuxtLink>
    <ProductCard v-for="product in data.data" :key="product.productID" :product="product" />
  </div>
</template>

<script setup>
const { data } = await useFetch('/api/products', {
  method: 'POST',
  body: { take: 4, sortby: 'popular', sortdir: 'desc' },
});
</script>
