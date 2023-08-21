<template>
  <header>
    <div class="container">
      <div class="grid grid-cols-5 gap-2.5 items-center pt-4">
        <div class="logo">
          <NuxtLink to="/"><img src="/img/logo.svg" alt="Iven" /></NuxtLink>
        </div>

        <MobiMenu />
        <MobiSearch />
        <MobiCall>
          <div class="animate-ping mobi-call"></div>
          <a :href="`tel:${config.mainphone}`" class="mobi-call"><PhoneIcon /></a>
        </MobiCall>
        <nav class="col-span-3">
          <ul class="flex justify-between text-sm">
            <li><NuxtLink class="py-2 px-4" to="/about">О компании</NuxtLink></li>
            <li><NuxtLink class="py-2 px-4" to="/contacts">Контакты</NuxtLink></li>
            <li><NuxtLink class="py-2 px-4" to="/news">Новости</NuxtLink></li>
            <li><NuxtLink class="py-2 px-4" to="/delivery">Доставка</NuxtLink></li>
            <li><NuxtLink class="py-2 px-4" to="/payment">Оплата</NuxtLink></li>
            <li><NuxtLink class="py-2 px-4" to="/warranty">Гарантия</NuxtLink></li>
          </ul>
          <div class="nav-contact">
            <div class="relative -mx-6 bg-white border-1 h-[80px]">
              <div class="flex gap-6 mt-10 social-links"><SocialLinks :social="$state.config.social" /></div>
            </div>
            <div class="py-8">
              <div class="with-icon">
                <MapPinIcon />
                <a href="#" class="underline underline-offset-4">{{ $state.config.address }}</a>
              </div>

              <div class="with-icon">
                <MessageIcon />
                <a :href="`mailto:${$state.config.email}`" class="underline underline-offset-4">{{ $state.config.email }}</a>
              </div>
              <div class="with-icon">
                <ClockIcon />
                <div v-html="$state.config.timetable"></div>
              </div>
            </div>
          </div>
        </nav>

        <div class="flex" v-if="false">
          <NuxtLink class="btn is-large ml-auto" to="/"> <ConfiguratorIcon /> Конфигуратор ПК</NuxtLink>
        </div>
      </div>
    </div>
  </header>
  <div class="sticky top-0 sticky-line" :class="{ 'is-scrolling': y > 130 }">
    <div class="container">
      <div class="flex gap-6 items-center">
        <a :href="`tel:${config.mainphone}`"
          ><span class="mobile-logos hide-if-scroll"></span>

          <NuxtLink to="/" class="max-w-[44px] overflow-hidden show-if-scroll"><img src="/img/logo-sm.png" class="show-if-scroll graceful" alt="Iven" /></NuxtLink>

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
