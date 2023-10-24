<template>
  <DefaultLayout>
    <div class="container py-20 pt-10 md:pt-20">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-16 items-center">
        <div>
          <img :src="img" alt="404" width="800" height="645" />
        </div>
        <div class="text">
          <div class="h2">Увы, страница не найдена</div>
          <p>К сожалению, вы зашли на несуществующую страницу. Возможно, вы перешли по старой ссылке или ввели неправильный адрес.</p>
          <p>Попробуйте проверить ссылку или вернитесь на главную страницу</p>
          <NuxtLink to="/" class="btn mt-10 xl:ml-20">Перейти на главную</NuxtLink>
        </div>
      </div>
    </div>
  </DefaultLayout>
</template>

<script setup>
import DefaultLayout from './layouts/default.vue';
import img from '@/assets/img/error404.webp';
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
