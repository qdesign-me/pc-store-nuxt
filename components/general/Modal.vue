<template>
  <div v-if="props.visible">
    <div class="fixed inset-0 bg-black/20 z-10" @click="emit('close')"></div>
    <div class="shadow fixed z-20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded min-w-[400px]">
      <div class="px-6 py-4 flex justify-between items-center border-b">
        <h3>{{ props.title }}</h3>
        <button class="bg-none border-none text-[30px] hover:text-blue transition" @click="emit('close')"><CloseIcon /></button>
      </div>
      <div class="p-6"><slot /></div>
    </div>
  </div>
</template>

<script setup>
import { onKeyStroke } from '@vueuse/core';
onKeyStroke('Escape', (e) => emit('close'));
const props = defineProps(['visible', 'title']);
const emit = defineEmits(['close']);

watch(props, () => {
  props.visible ? document.querySelector('body').classList.add('overflow-hidden') : document.querySelector('body').classList.remove('overflow-hidden');
});
</script>
