<template>
  <div v-if="props.visible" class="relative z-[1000]">
    <div class="fixed inset-0 bg-black/20 z-[100]" @click="emit('close')"></div>
    <div class="shadow fixed z-[200] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded w-full" :style="{ 'max-width': `${props.width ?? 480}px` }">
      <div class="px-6 pr-10 py-4 flex justify-between items-center border-b" v-if="props.title">
        <h3>{{ props.title }}</h3>
      </div>
      <button class="bg-none border-none text-[30px] hover:text-blue absolute top-6 right-6" @click="emit('close')"><CloseIcon /></button>
      <div class="p-6 max-h-[calc(100dvh-60px)] overflow-auto"><slot /></div>
    </div>
  </div>
</template>

<script setup>
import { onKeyStroke } from '@vueuse/core';
onKeyStroke('Escape', (e) => emit('close'));
const props = defineProps(['visible', 'title', 'width']);
const emit = defineEmits(['close']);

watch(props, () => {
  props.visible ? document.querySelector('body').classList.add('overflow-hidden') : document.querySelector('body').classList.remove('overflow-hidden');
});
</script>
