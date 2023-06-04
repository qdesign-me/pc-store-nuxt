<template>
  <div class="grid grid-cols-5 gap-2.5">
    <NuxtLink :href="props.data.link" class="card bg-coral overflow-hidden">
      <div class="title">Сопутствующие товары</div>
      <div class="note mt-3">
        <span class="underline underline-offset-4">Все товары</span>
        <ArrowRightIcon />
      </div>
      <img src="/img/promo/asus-laptop-cut.png" width="260" height="250" loading="lazy" class="-right-6 -bottom-4 absolute" />
    </NuxtLink>
    <ProductCard v-for="product in props.data.products" :key="product.productID" :product="product" />
  </div>
</template>

<script setup>
const props = defineProps(['data']);
</script>
