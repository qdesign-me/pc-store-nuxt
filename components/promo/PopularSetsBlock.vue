<template>
  <div class="grid grid-cols-5 gap-2.5">
    <NuxtLink to="/populyarnye-sborki" class="card bg-blue overflow-hidden">
      <div class="title">Популярные сборки</div>
      <div class="note mt-3">
        <span class="underline underline-offset-4">Все товары</span>
        <ArrowRightIcon />
      </div>
      <img src="/img/promo/asus-laptop-cut.png" width="260" height="250" loading="lazy" class="-right-6 -bottom-10 absolute" />
    </NuxtLink>
    <ProductComboCard />
    <ProductComboCard />
  </div>
</template>
