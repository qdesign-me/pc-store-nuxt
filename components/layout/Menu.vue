<template>
  <button class="btn menu-button" :class="{ opened: showMenu }" @mouseover="showMenu = true"><CatalogIcon /> Каталог товров</button>
  <div class="menu" @mouseleave="showMenu = false" ref="target">
    <div class="container">
      <div class="breadcrumbs"><span class="a">Главная</span><span>Каталог товаров</span></div>
      <div class="grid grid-cols-5 gap-2.5">
        <div>
          <div class="title"><NuxtLink to="/kompyutery">Компьютеры</NuxtLink></div>
          <div class="items">
            <PcTypesBlock />
          </div>
        </div>
        <div>
          <div class="title"><NuxtLink to="/ehlektronika/noutbuki">Ноутбуки</NuxtLink></div>
        </div>
        <div v-for="item in data" :key="item.categotyID">
          <div class="title">
            <NuxtLink :to="item.uri">
              {{ item.name }}
            </NuxtLink>
          </div>
          <ul v-if="item.nodes">
            <li v-for="node in item.nodes" :key="node.name">
              <NuxtLink :to="node.uri">
                {{ node.name }}
              </NuxtLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const route = useRoute();
import { onClickOutside } from '@vueuse/core';
const target = ref(null);
onClickOutside(target, () => (showMenu.value = false));
const { data } = await useFetch('/api/categories/menu');
const showMenu = ref(false);
watch(route, () => {
  showMenu.value = false;
});
</script>
