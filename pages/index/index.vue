<template>
  <main>
    <h1 class="hidden">Iven — интернет магазин компьютеров и комплектующих</h1>
    <SliderBlock />
    <PromoBlock />
    <div class="container">
      <PopularCatsBlock />
      <TopSalesBlock />
      <PopularSetsBlock v-if="false" />
      <NewItemsBlock />
    </div>
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
