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
  description: 'I-VEN.BY: продажа компьютеров в Минске и Беларуси. Широкий ассортимент, 24 месяца гарантии, быстрая доставка. Экономьте с нами!',
};

useSeoMeta({
  title: () => meta.title,
  ogTitle: () => meta.title,
  description: () => meta.description,
  ogDescription: () => meta.description,
  ogType: 'website',
});
</script>
