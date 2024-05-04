<template>
  <Modal :visible="!!open" @close="open = false">
    <div class="text-center text-[#000]" v-html="open"></div>
  </Modal>
</template>

<script setup>
const open = ref(false);
onMounted(async () => {
  console.log('here');
  const banner = sessionStorage.getItem('banner');
  //if (banner) return;
  const res = await $fetch('/api/config');
  if (!res.config.banner?.length) return;
  open.value = res.config.banner;
  sessionStorage.setItem('banner', '1');
});
</script>
