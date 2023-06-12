<template>
  <main class="container flex flex-col space-y-10">
    <div class="grid grid-cols-5 gap-2.5">
      <NuxtLink class="col-span-4 card bg-blue py-0 h-[350px] justify-center" to="/">
        <img src="/img/promo/slide1.png" alt="" loading="lazy" width="450" height="350" class="slider-bg" />
        <div class="title-lg text-white mb-0 relative">
          ФАНТАСТИЧЕСКИЙ<br />
          КОРПУС JONSBO D30<br />
          УЖЕ В ПРОДАЖЕ
        </div>
      </NuxtLink>
      <NuxtLink class="card bg-blue pb-0 h-[350px]" to="/akcii"
        ><img src="/img/promo/sale.png" alt="" loading="lazy" width="295" height="350" class="promo-bg" />
        <div class="title-lg text-white relative">Все акции</div></NuxtLink
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
