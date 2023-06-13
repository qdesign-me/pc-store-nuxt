<template>
  <header>
    <div class="container">
      <div class="grid grid-cols-5 gap-2.5 items-center pt-4">
        <div class="logo">
          <NuxtLink to="/"><img src="/img/logo.svg" alt="Viven" /></NuxtLink>
        </div>

        <MobiMenu />
        <MobiSearch />
        <MobiCall>
          <a :href="`tel:${config.mainphone}`" class="mobi-call"><PhoneIcon /></a>
        </MobiCall>
        <nav class="col-span-3">
          <ul class="flex justify-between text-sm">
            <li><NuxtLink class="py-2 px-4" to="/o-kompanii">О компании</NuxtLink></li>
            <li><NuxtLink class="py-2 px-4" to="/kontakty">Контакты</NuxtLink></li>
            <li><NuxtLink class="py-2 px-4" to="/novosti">Новости</NuxtLink></li>
            <li><NuxtLink class="py-2 px-4" to="/dostavka">Доставка</NuxtLink></li>
            <li><NuxtLink class="py-2 px-4" to="/oplata">Оплата</NuxtLink></li>
            <li><NuxtLink class="py-2 px-4" to="/garantiya">Гарантия</NuxtLink></li>
          </ul>
        </nav>

        <div class="flex">
          <NuxtLink class="btn ml-auto" to="/"> <ConfiguratorIcon /> Конфигуратор ПК</NuxtLink>
        </div>
      </div>
    </div>
  </header>
  <div class="sticky top-0 sticky-line" :class="{ 'is-scrolling': y > 130 }">
    <div class="container">
      <div class="flex gap-6 items-center">
        <a :href="`tel:${config.mainphone}`"
          ><span class="mobile-logos hide-if-scroll"></span>

          <NuxtLink to="/" class="max-w-[44px] overflow-hidden show-if-scroll"><img src="/img/logo-sm.png" class="show-if-scroll graceful" alt="Viven" /></NuxtLink>

          {{ formatPhoneNumber(config.mainphone) }}</a
        >
        <ul>
          <li class="menu-trigger">
            <Menu />
          </li>
        </ul>
        <div class="flex-1">
          <form action="#" class="relative">
            <input class="input" placeholder="Введите наименование или артикул товара" type="text" /><button type="submit" class="absolute top-4 right-4">
              <SearchIcon />
            </button>
          </form>
        </div>
        <div class="nav-links">
          <CatalogLink />
          <NuxtLink to="/" class="a"><UserIcon />Войти</NuxtLink>
          <FavoritesLink />
          <CompareLink />
          <CartLink />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { useWindowScroll } from '@vueuse/core';

const { y } = useWindowScroll();

import { useAppStore } from '~/stores/app';
const { $state } = useAppStore();
const config = $state?.config || {};
</script>
