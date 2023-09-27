<template>
  <div ref="target">
    <button class="btn is-large menu-button" :class="{ opened: showMenu }" @click.stop.prevent="showMenu = !showMenu">
      <div class="w-6 flex items-center justify-center">
        <CatalogIcon class="menu-open-true" />
        <div class="text-2xl menu-open-false"><CloseIcon /></div>
      </div>
      Каталог товров
    </button>
    <div class="menu">
      <div class="only-mobi">
        <div class="border-b leading-[60px] cursor-pointer" v-if="mactive === null" @click.prevent.stop="closeMenu">
          <div class="container flex items-center gap-2 font-bold"><ArrowLeftOutlined /> Каталог товаров</div>
        </div>
        <div class="border-b leading-[60px] cursor-pointer" v-if="mactive === 0" @click="mactive = null">
          <div class="container flex items-center gap-2 font-bold"><ArrowLeftOutlined /> Готовые сборки ПК</div>
        </div>
        <div class="border-b leading-[60px] cursor-pointer" v-if="mactive === 1" @click="mactive = null">
          <div class="container flex items-center gap-2 font-bold"><ArrowLeftOutlined />Комплектующие для ПК</div>
        </div>
        <div class="border-b leading-[60px] cursor-pointer" v-if="mactive === 3" @click="mactive = null">
          <div class="container flex items-center gap-2 font-bold"><ArrowLeftOutlined /> Периферия</div>
        </div>
        <div class="border-b leading-[60px] cursor-pointer" v-if="mactive === 4" @click="mactive = null">
          <div class="container flex items-center gap-2 font-bold"><ArrowLeftOutlined /> Электроника</div>
        </div>
        <div class="border-b py-2">
          <div class="container"><SearchForm /></div>
        </div>
      </div>
      <div class="container">
        <div class="flex gap-2.5" :class="{ 'open-substep': mactive !== null }">
          <div class="part-1">
            <div class="items">
              <div :class="{ active: active === 0 }" @mouseenter="active = 0" @click="mactive = 0"><PCSetsIcon /> Готовые сборки ПК <ChevronRightIcon class="ml-auto -mr-2" /></div>
              <div :class="{ active: active === 1 }" @mouseenter="active = 1" @click="mactive = 1">
                <PCAcessoriesIcon />Комплектующие для ПК <ChevronRightIcon class="ml-auto -mr-2" />
              </div>
              <div :class="{ active: active === 2 }" @click="router.push('/elektronika/noutbuki')"><NotebooksIcon />Ноутбуки</div>
              <div :class="{ active: active === 3 }" @mouseenter="active = 3" @click="mactive = 3"><OthersIcon />Периферия <ChevronRightIcon class="ml-auto -mr-2" /></div>
              <div :class="{ active: active === 4 }" @mouseenter="active = 4" @click="mactive = 4"><ElectronicsIcon />Электроника <ChevronRightIcon class="ml-auto -mr-2" /></div>
              <div :class="{ active: active === 5 }" @click="router.push('/komplektuyuszie/Servernoe-oborydovanie')"><ServersIcon />Серверное оборудование</div>
            </div>
          </div>
          <div class="flex-1 part-2">
            <div
              v-for="(item, index) in data"
              :key="item.name"
              class="flex gap-6 mainmenu-item"
              :class="{ mactive: mactive === index, active: active === index || (!index && !active) }"
            >
              <div class="flex-1">
                <div class="title">
                  <NuxtLink :to="item.uri">{{ item.name }}</NuxtLink>
                </div>

                <ul class="lg:columns-3 gap-6">
                  <li v-for="link in item.nodes" :key="link.uri" class="relative">
                    <NuxtLink :to="link.uri">
                      <component :is="linkIcon(link.uri)" />
                      {{ link.name }}
                    </NuxtLink>
                    <div class="toggle-sublinks" v-if="link.nodes && link.categoryID !== 28" @click="toggleSublinks"><ChevronRightIcon /></div>
                    <div v-if="link.nodes && link.categoryID !== 28" class="sublinks relative">
                      <NuxtLink v-for="childlink in link.nodes" :to="childlink.uri" :key="childlink.name">
                        {{ childlink.name }}
                      </NuxtLink>
                      <NuxtLink :to="link.uri" class="text-[#E5A35B]"> Все категории</NuxtLink>
                    </div>
                  </li>
                </ul>
              </div>
              <div class="w-[300px] hidden lg:block" v-if="item.product">
                <div class="text-[#E5A35B] text-[24px] mb-6">
                  Топ<br class="hidden lg:inline" />
                  продаж
                </div>

                <NuxtLink :to="item.uri" class="!flex gap-6 items-center text-sm font-normal mb-2">
                  <span class="underline underline-offset-4">Все товары</span><ArrowRightIcon
                /></NuxtLink>
                <NuxtLink :to="`/p/${item.product.uri.replace('.html', '')}`">
                  <ProductThumbs :data="{ img: item.product.img }" />
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const router = useRouter();
const OfficeIcon = resolveComponent('OfficeIcon');
const HomeIcon = resolveComponent('HomeIcon');
const GraphicsIcon = resolveComponent('GraphicsIcon');
const PlayIcon = resolveComponent('PlayIcon');
const ServerIcon = resolveComponent('ServerIcon');
const links = [
  {
    title: 'Для офиса',
    icon: OfficeIcon,
    uri: '/elektronika/Gotovie-komputeri/dlya-ofisa',
  },
  {
    title: 'Для дома',
    icon: HomeIcon,
    uri: '/elektronika/Gotovie-komputeri/dlya-doma',
  },
  {
    title: 'Для графики',
    icon: GraphicsIcon,
    uri: '/elektronika/Gotovie-komputeri/dlya-grafiki',
  },
  {
    title: 'Игровые',
    icon: PlayIcon,
    uri: '/elektronika/Gotovie-komputeri/igrovye',
  },
  {
    title: 'Серверы <span>и станции</span>',
    icon: ServerIcon,
    uri: '/elektronika/Gotovie-komputeri/servery-irabochie-stancii',
  },
];
import { onClickOutside } from '@vueuse/core';
const target = ref(null);
onClickOutside(target, (e) => {
  showMenu.value = false;
});
const { data } = await useFetch('/api/categories/menu');
const showMenu = ref(false);

watch(showMenu, () => {
  showMenu.value ? document.querySelector('body').classList.add('with-open-menu') : document.querySelector('body').classList.remove('with-open-menu');
});
const closeMenu = () => document.querySelector('body').classList.remove('with-open-menu');
const toggleSublinks = (event) => {
  event.currentTarget.classList.contains('sublinks-on') ? event.currentTarget.classList.remove('sublinks-on') : event.currentTarget.classList.add('sublinks-on');
};
const active = ref(null);
const mactive = ref(null);
const linkIcon = (uri) => {
  const icon = links.find((item) => item.uri === uri)?.icon;
  return icon;
};
</script>
