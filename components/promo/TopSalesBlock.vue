<template>
  <div class="grid grid-cols-1 gap-5 lg:grid-cols-5 lg:gap-2.5 box">
    <NuxtLink to="/top-prodazh" class="card bg-blue overflow-hidden group promo-link">
      <img src="/img/promo/top.png" width="296" height="400" loading="lazy" class="promo-bg" />
      <div class="title relative">Топ продаж</div>
      <ArrowLink class="mt-3 relative">
        <span class="underline underline-offset-4">Все новинки</span>
      </ArrowLink>
    </NuxtLink>
    <div class="lg:col-span-4">
      <div class="flex gap-2.5 -mr-5 pr-5 overflow-auto md:overflow-visible md:pr-0 md:mr-0 grid-cols-4 md:grid">
        <ProductCard v-for="product in data?.data" :key="product.productID" :product="product" />
      </div>
    </div>
  </div>
</template>

<script setup>
const { data } = await useFetch('/api/products', {
  method: 'POST',
  body: { take: 4, sortby: 'popular', sortdir: 'desc' },
});
</script>
