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
              <div :class="{ active: active === 0 }" @mouseenter="active = 0" @click="setActive(0)">
                <PCSetsIcon class="ico" /> Готовые сборки ПК
                <div class="parentcat-icon" @click.prevent.stop="mactive = 0"><ChevronRightIcon class="arr" /></div>
              </div>
              <div :class="{ active: active === 1 }" @mouseenter="active = 1" @click="setActive(1)">
                <PCAcessoriesIcon class="ico" />Комплектующие для ПК
                <div class="parentcat-icon" @click.prevent.stop="mactive = 1"><ChevronRightIcon class="arr" /></div>
              </div>
              <div :class="{ active: active === 2 }" @click="setActive(2)"><NotebooksIcon class="ico" />Ноутбуки</div>
              <div :class="{ active: active === 3 }" @mouseenter="active = 3" @click="setActive(3)">
                <OthersIcon class="ico" />Периферия
                <div class="parentcat-icon" @click.prevent.stop="mactive = 3"><ChevronRightIcon class="arr" /></div>
              </div>
              <div :class="{ active: active === 4 }" @mouseenter="active = 4" @click="setActive(4)">
                <ElectronicsIcon class="ico" />Электроника
                <div class="parentcat-icon" @click.prevent.stop="mactive = 4"><ChevronRightIcon class="arr" /></div>
              </div>
              <div :class="{ active: active === 5 }" @click="setActive(5)"><ServersIcon class="ico" />Серверное оборудование</div>
            </div>
          </div>
          <div class="flex-1 part-2" @click="checkIfCurrent">
            <div
              v-for="(item, index) in data"
              :key="item.name"
              class="flex gap-6 mainmenu-item"
              :class="{ mactive: mactive === index, active: active === index || (!index && !active) }"
            >
              <div class="flex-1">
                <div class="title">
                  <NuxtLink :to="item.uri" class="!text-black">{{ item.name }}</NuxtLink>
                </div>

                <ul class="md:lg:columns-3 gap-6">
                  <li v-for="link in item.nodes" :key="link.uri" class="relative">
                    <NuxtLink :to="link.uri">
                      <component :is="linkIcon(link.uri)" />
                      {{ link.name }}
                    </NuxtLink>
                    <div class="toggle-sublinks" v-if="link.nodes && link.categoryID !== 28" @click="toggleSublinks"><ChevronRightIcon class="arr" /></div>
                    <div v-if="link.nodes && link.categoryID !== 28" class="sublinks relative">
                      <NuxtLink v-for="childlink in link.nodes" :to="childlink.uri" :key="childlink.name">
                        {{ childlink.name }}
                      </NuxtLink>
                      <NuxtLink :to="link.uri" class="!text-[#E5A35B]"> Все категории</NuxtLink>
                    </div>
                  </li>
                </ul>
              </div>
              <div class="w-[300px] hidden xl:block" v-if="item.product?.img">
                <div class="text-[#E5A35B] text-[24px] mb-6">
                  Топ<br class="hidden lg:inline" />
                  продаж
                </div>

                <NuxtLink :to="item.uri" class="!flex gap-6 items-center text-sm font-normal mb-2">
                  <span class="underline underline-offset-4">Все товары</span><ArrowRightIcon class="!text-black"
                /></NuxtLink>
                <NuxtLink :to="`/p/${item.product.uri.replace('.html', '')}`" class="flex flex-col gap-2 !items-start">
                  <div>{{ item.product.name }}</div>

                  <ProductThumbs :data="{ img: item.product.img.split('|')[0] }" />
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
    uri: 'noutbuki-i-aksessuary/gotovie-komputeri/dlya-ofisa',
  },
  {
    title: 'Для дома',
    icon: HomeIcon,
    uri: 'noutbuki-i-aksessuary/gotovie-komputeri/dlya-doma',
  },
  {
    title: 'Для графики',
    icon: GraphicsIcon,
    uri: 'noutbuki-i-aksessuary/gotovie-komputeri/dlya-grafiki',
  },
  {
    title: 'Игровые',
    icon: PlayIcon,
    uri: 'noutbuki-i-aksessuary/gotovie-komputeri/igrovye',
  },
  {
    title: 'Серверы <span>и станции</span>',
    icon: ServerIcon,
    uri: 'noutbuki-i-aksessuary/gotovie-komputeri/servery-irabochie-stancii',
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

const setActive = (value) => {
  const links = {
    0: '/noutbuki-i-aksessuary/gotovie-komputeri',
    1: '/komplektuyuszie',
    2: '/noutbuki-i-aksessuary/noutbuki',
    3: '/periferiya-i-aksessuary',
    4: '/elektronika',
    5: '/komplektuyuszie/servernoe-oborydovanie',
  };
  const url = links[value];
  if (url === router.currentRoute.value.path) return closeMenu();

  router.push(url);
};

const checkIfCurrent = (event) => {
  const href = event.target?.href || event.target.parentElement?.href;
  if (href) {
    const url = href.replace('http://localhost:3000', '').replace('https://i-ven.by', '').replace('http://i-ven.by', '').replace('https://pc-store-nuxt.vercel.app', '');
    if (url === router.currentRoute.value.path) closeMenu();
  }
};
</script>
