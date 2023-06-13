<template>
  <div class="grid grid-cols-1 gap-5 lg:grid-cols-5 lg:gap-2.5 box">
    <NuxtLink to="/populyarnye-sborki" class="card bg-blue overflow-hidden group promo-link">
      <img src="/img/promo/combo.png" width="296" height="400" loading="lazy" class="promo-bg" />
      <div class="title relative">Популярные сборки</div>
      <ArrowLink class="mt-3 relative"><span class="underline underline-offset-4">Все товары</span></ArrowLink>
    </NuxtLink>
    <div class="col-span-1 lg:col-span-4">
      <div class="flex gap-5 overflow-auto lg:overflow-visible grid-cols-4 lg:grid lg:gap-2.5">
        <ProductComboCard />
        <ProductComboCard />
      </div>
    </div>
  </div>
</template>
