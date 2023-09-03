<template>
  <button class="menu-opener w-8 h-8 p-2 flex items-center justify-center lg:hidden hover:text-blue" @click="showMenu(true)">
    <BarsIcon />
  </button>
  <button class="menu-closer w-8 h-8 p-2 flex items-center justify-center lg:hidden hover:text-blue" @click="showMenu(false)">
    <CloseIcon />
  </button>
</template>

<script setup>
const showMenu = (value) =>
  value ? document.querySelector('body').classList.add('with-open-mmenu') : document.querySelector('body').classList.remove('with-open-mmenu', 'menu-mode-2');
</script>
