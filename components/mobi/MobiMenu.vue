<template>
  <button class="w-8 h-8 p-2 flex items-center justify-center lg:hidden hover:text-blue" @click="showMenu = !showMenu">
    <BarsIcon v-if="!showMenu" />
    <CloseIcon v-else />
  </button>
</template>

<script setup>
const route = useRoute();
const showMenu = ref(false);
watch(route, () => {
  showMenu.value = false;
});

watch(showMenu, () => {
  showMenu.value ? document.querySelector('body').classList.add('with-open-mmenu') : document.querySelector('body').classList.remove('with-open-mmenu');
});
</script>
