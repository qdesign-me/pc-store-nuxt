<template>
  <div
    class="ml-auto"
    :class="{ 'text-lightblue': store.$state.compare.includes(props.productID), hidden: store.$state.compare.length > 4 && !store.$state.compare.includes(props.productID) }"
  >
    <CompareIcon class="cursor-pointer" @click="store.toggleCompare(props.productID)" />
  </div>
</template>

<script setup>
const props = defineProps(['productID']);
import { useAppStore } from '~/stores/app';
const store = useAppStore();
</script>
