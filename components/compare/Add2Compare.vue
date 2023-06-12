<template>
  <button
    v-if="props.variant === 'primary'"
    class="w-10 flex-1 btn is-transparent leading-[50px]"
    :class="{ '!text-blue': store.$state.compare.includes(props.productID), disabled: store.$state.compare.length > 4 && !store.$state.compare.includes(props.productID) }"
    @click="store.toggleCompare(props.productID)"
  >
    <CompareIcon />
    Сравнить
  </button>
  <button
    v-else
    class="ml-auto is-transparent p-2 cursor-pointer"
    :class="{ 'text-blue': store.$state.compare.includes(props.productID), disabled: store.$state.compare.length > 4 && !store.$state.compare.includes(props.productID) }"
  >
    <CompareIcon @click="store.toggleCompare(props.productID)" />
  </button>
</template>

<script setup>
const props = defineProps(['productID', 'variant']);
import { useAppStore } from '~/stores/app';
const store = useAppStore();
</script>
