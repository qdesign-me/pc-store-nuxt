<template>
  <DefaultLayout>
    <div class="container py-20 pt-10 md:pt-20">
      <div class="text text-center max-w-[450px] mx-auto">
        <div class="h2">Ошибка 404</div>
        <p>Страница, которую Вы запрашиваете, не существует.</p>
        <p>
          Возможно, она была удалена, или Вы набрали неверный адрес. Приглашаем вернуться на
          <NuxtLink to="/" class="text-blue underline underline-offset-2">Главную</NuxtLink> страницу либо
          <span class="inline-block text-blue underline underline-offset-2 cursor-pointer">
            <Consultation title="Бесплатная консультация"> обратиться </Consultation>
          </span>
          к нашему консультанту.
        </p>

        <img :src="img" alt="404" width="180" height="180" class="inline-block mx-auto mt-8" />
      </div>
    </div>
  </DefaultLayout>
</template>

<script setup>
import DefaultLayout from './layouts/default.vue';
import img from '@/assets/img/404.png';
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
