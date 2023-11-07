<template>
  <div class="grid grid-cols-1 gap-5 lg:grid-cols-5 lg:gap-2.5 box">
    <NuxtLink to="/populyarnye-sborki" class="card pt-5 px-8 bg-blue overflow-hidden group promo-link">
      <img src="/img/promo/combo.png" width="296" height="400" loading="lazy" class="promo-bg" />
      <div class="title relative">Популярные сборки</div>
      <ArrowLink class="mt-3 relative"><span class="underline underline-offset-4">Все товары</span></ArrowLink>
    </NuxtLink>
    <div class="lg:col-span-4">
      <div class="flex gap-2.5 -mr-5 pr-5 overflow-auto md:overflow-visible md:pr-0 md:mr-0 grid-cols-4 md:grid"><ProductComboCard /><ProductComboCard /></div>
    </div>
  </div>
</template>
