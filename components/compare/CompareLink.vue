<template>
  <NuxtLink :to="link.toLowerCase()" class="a" :class="{ 'text-blue': items.length }">
    <div v-if="items.length > 0" class="count">{{ items.length }}</div>
    <CompareIcon />
    Сравнить</NuxtLink
  >
</template>

<script setup>
const { items } = useCompare();
const link = computed(() => {
  const values = items.value.join('+');

  return values?.length ? `/compare/${values}` : '/compare';
});
</script>
