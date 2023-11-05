<template>
  <div class="relative">
    <CartLink @click="onClick" />
    <CartMiniHighlight />
  </div>
</template>
<script setup>
const router = useRouter();
const onClick = () => {
  if (router.currentRoute.value.fullPath === '/cart') return false;

  return router.push('/cart');
};
</script>
