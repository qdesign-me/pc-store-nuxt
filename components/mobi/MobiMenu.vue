<template>
  <button class="w-6 h-6 flex items-center justify-center p-1 lg:hidden text-[#A1A1A1] hover:text-blue transition">
    <BarsIcon v-if="!showMenu" @click="showMenu = true" />
    <CloseIcon v-else @click="showMenu = false" />
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
