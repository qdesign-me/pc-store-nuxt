<template>
  <button class="a block lg:!hidden" @click="openMenu">
    <CatalogIcon />
    Каталог
  </button>
</template>

<script setup>
const openMenu = () => {
  document.querySelector('body').classList.remove('with-open-mmenu', 'menu-mode-2');
  document.querySelector('body').classList.add('with-open-mcatalog');
};
</script>
