<template>
  <button
    v-if="props.variant === 'primary'"
    class="w-10 flex-1 btn is-transparent leading-[50px]"
    :class="{ '!text-lightblue': store.$state.compare.includes(props.productID), disabled: store.$state.compare.length > 4 && !store.$state.compare.includes(props.productID) }"
    @click="store.toggleCompare(props.productID)"
  >
    <CompareIcon />
    Сравнить
  </button>
  <div
    v-else
    class="ml-auto"
    :class="{ 'text-lightblue': store.$state.compare.includes(props.productID), disabled: store.$state.compare.length > 4 && !store.$state.compare.includes(props.productID) }"
  >
    <CompareIcon class="cursor-pointer" @click="store.toggleCompare(props.productID)" />
  </div>
</template>

<script setup>
const props = defineProps(['productID', 'variant']);
import { useAppStore } from '~/stores/app';
const store = useAppStore();
</script>
