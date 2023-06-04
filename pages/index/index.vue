<template>
  <main class="container flex flex-col space-y-10">
    <div class="grid grid-cols-5 gap-2.5">
      <NuxtLink class="col-span-4 card bg-orange py-0" to=""
        ><div class="flex items-center justify-end">
          <div class="title-lg text-center">
            Актуальный аукцион<br />
            или<br />
            новинка
          </div>
          <img src="/img/promo/asus-laptop.png" alt="" loading="lazy" width="450" height="350" class="-ml-6" /></div
      ></NuxtLink>
      <NuxtLink class="card bg-coral pb-0" to="/akcii"
        ><img src="/img/promo/asus-laptop.png" alt="" loading="lazy" width="200" height="155" class="self-end mb-2" />
        <div class="title-lg">Все акции</div></NuxtLink
      >
    </div>
    <PromoBlock />
    <TopSalesBlock />
    <PopularCatsBlock />
    <PopularSetsBlock />
    <NewItemsBlock />
  </main>
</template>

<script setup>
definePageMeta({
  layout: 'default',
});

const meta = {
  title: 'Iven — интернет магазин компьютеров и комплектующих, техники для офиса и электроники. Сборка ПК. Доставка по Беларуси',
  description:
    'Интернет магазин компьютеров и комплектующих, техники для офиса и электроники. Доставка заказов по РБ и самовывоз из пункта выдачи в Минске. Умный конфигуратор на сайте, помощь в подборе комплектующих.',
};

useSeoMeta({
  title: () => meta.title,
  ogTitle: () => meta.title,
  description: () => meta.description,
  ogDescription: () => meta.description,
  ogType: 'website',
});
</script>
