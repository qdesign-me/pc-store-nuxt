<template>
  <div ref="target">
    <button class="btn is-large menu-button" :class="{ opened: showMenu }" @click.stop.prevent="showMenu = !showMenu">
      <div class="w-6 flex items-center justify-center">
        <CatalogIcon v-if="!showMenu" />
        <div v-else class="text-2xl"><CloseIcon /></div>
      </div>
      Каталог товров
    </button>
    <div class="menu">
      <div class="container">
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
  </div>
</template>

<script setup>
const router = useRouter();
import { onClickOutside } from '@vueuse/core';
const target = ref(null);
onClickOutside(target, (e) => {
  showMenu.value = false;
});
const { data } = await useFetch('/api/categories/menu');
const showMenu = ref(false);
watch(router.currentRoute, () => {
  debugger;
  showMenu.value = false;
});

watch(showMenu, () => {
  showMenu.value ? document.querySelector('body').classList.add('with-open-menu') : document.querySelector('body').classList.remove('with-open-menu');
});
</script>
