<template>
  <div class="grid grid-cols-5 gap-2.5">
    <NuxtLink to="/top-prodazh" class="card bg-coral overflow-hidden">
      <div class="title">Топ продаж</div>
      <div class="note mt-3">
        <span class="underline underline-offset-4">Все новинки</span>
        <ArrowRightIcon />
      </div>
      <img src="/img/promo/asus-laptop-cut.png" width="260" height="250" loading="lazy" class="-right-6 -bottom-4 absolute" />
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
