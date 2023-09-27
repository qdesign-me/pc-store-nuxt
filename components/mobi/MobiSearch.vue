<template>
  <button class="p-1 absolute right-4 lg:hidden hover:text-blue" @click="openMenu"><SearchIcon /></button>
</template>

<script setup>
const openMenu = () => {
  document.querySelector('body').classList.remove('with-open-mmenu', 'menu-mode-2');
  document.querySelector('body').classList.add('with-open-menu');
};
</script>
