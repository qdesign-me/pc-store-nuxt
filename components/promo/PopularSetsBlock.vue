<template>
  <div class="grid grid-cols-5 gap-2.5">
    <NuxtLink to="/populyarnye-sborki" class="card bg-blue overflow-hidden group">
      <img src="/img/promo/combo.png" width="296" height="400" loading="lazy" class="promo-bg" />
      <div class="title relative">Популярные сборки</div>
      <ArrowLink class="mt-3 relative">Все товары</ArrowLink>
    </NuxtLink>
    <ProductComboCard />
    <ProductComboCard />
  </div>
</template>
