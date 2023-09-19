<template>
  <header v-if="config">
    <div class="container">
      <div class="grid grid-cols-5 gap-2.5 items-center pt-4">
        <div class="logo">
          <NuxtLink to="/"><img src="/img/logo.svg" alt="Iven" /></NuxtLink>
        </div>

        <MobiMenu />
        <MobiSearch />
        <MobiCall>
          <div class="animate-ping mobi-call"></div>
          <div class="mobi-call" @click="setMenuMode('show')"><PhoneIcon /></div>
          <div class="mobi-button" @click="setMenuMode('show')"><PhoneIcon /></div>
        </MobiCall>
        <nav class="col-span-3">
          <ul class="mode-1 flex justify-between text-sm" @click="closeMenu">
            <li><NuxtLink class="py-2 px-4" to="/about">О компании</NuxtLink></li>
            <li><NuxtLink class="py-2 px-4" to="/contacts">Контакты</NuxtLink></li>
            <li v-if="false"><NuxtLink class="py-2 px-4" to="/news">Новости</NuxtLink></li>
            <li><NuxtLink class="py-2 px-4" to="/delivery">Доставка</NuxtLink></li>
            <li><NuxtLink class="py-2 px-4" to="/payment">Оплата</NuxtLink></li>
            <li><NuxtLink class="py-2 px-4" to="/warranty">Гарантия</NuxtLink></li>
          </ul>
          <ul class="mode-2 flex justify-between text-sm -mb-5">
            <li><NuxtLink class="py-2 px-4" to="/about">О компании</NuxtLink></li>
            <li><NuxtLink class="py-2 px-4" to="/contacts">Контакты</NuxtLink></li>
            <li>
              <div class="mode-2-items">
                <a class="mode-2-item" :href="`tel:+37529${config.mainphone}`">
                  <img src="/img/logos/a1.png" alt="" />
                  +375-29-{{ formatPhoneNumber(config.mainphone) }}</a
                >

                <a class="mode-2-item" :href="`tel:+37544${config.mainphone}`">
                  <img src="/img/logos/mts.png" alt="" />
                  +375-44-{{ formatPhoneNumber(config.mainphone) }}</a
                >

                <a class="mode-2-item" :href="`tel:+37525${config.mainphone}`">
                  <img src="/img/logos/life.png" alt="" />
                  +375-25-{{ formatPhoneNumber(config.mainphone) }}</a
                >

                <a class="mode-2-item" :href="`tel:+37517${config.mainphone}`">
                  <img src="/img/logos/iven.png" alt="" />
                  +375-17-{{ formatPhoneNumber(config.mainphone) }}</a
                >
                <div class="mode-2-item" @click="setMenuMode('hide')">Закрыть</div>
              </div>
            </li>
          </ul>
          <div class="nav-contact">
            <div class="relative -mx-6 bg-white border-1 h-[80px]">
              <div class="flex gap-6 mt-10 social-links"><SocialLinks :social="config.social" /></div>
            </div>
            <div class="py-8">
              <div class="with-icon">
                <MapPinIcon />
                <a href="#" class="underline underline-offset-4">{{ config.address }}</a>
              </div>

              <div class="with-icon">
                <MessageIcon />
                <a :href="`mailto:${config.email}`" class="underline underline-offset-4">{{ config.email }}</a>
              </div>
              <div class="with-icon">
                <ClockIcon />
                <div v-html="config.timetable"></div>
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
          <Form :model="model" class="relative" :onFinish="onFinish">
            <input class="input" placeholder="Введите наименование или артикул товара" type="text" v-model="model.search" />
            <button type="submit" class="absolute top-4 right-4" :disabled="!model.search.length">
              <SearchIcon />
            </button>
          </Form>
        </div>
        <div class="nav-links">
          <CatalogLink />
          <NuxtLink v-if="false" to="/" class="a"><UserIcon />Войти</NuxtLink>
          <FavoritesLink />
          <CompareLink />
          <MiniCart />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
const DEFAULT_DATA = {
  search: '',
};
const model = useState(() => DEFAULT_DATA);

import { useWindowScroll } from '@vueuse/core';
const router = useRouter();
const { y } = useWindowScroll();

const setMenuMode = (value) => {
  value === 'show'
    ? document.querySelector('body').classList.add('with-open-mmenu', 'menu-mode-2')
    : document.querySelector('body').classList.remove('with-open-mmenu', 'menu-mode-2');
};
const closeMenu = () => setTimeout(() => document.querySelector('body').classList.remove('with-open-mmenu', 'menu-mode-2'), 200);

watch(router.currentRoute, () => {
  document.querySelector('body').classList.remove('with-open-mmenu', 'menu-mode-2');
});

import { useAppStore } from '~/stores/app';
const { $state } = useAppStore();
const config = $state?.config || {};

const onFinish = async (event) => {
  debugger;
};
</script>
