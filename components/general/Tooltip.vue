<template>
  <div class="pointer relative" @click="isVisible = true" ref="target">
    <div v-if="isVisible" class="shadow p-6 absolute z-[100] -top-16 bg-white rounded left-6 min-w-[400px] whitespace-break-spaces">
      <slot name="text" />
    </div>

    <slot />
  </div>
</template>

<script setup>
import { onClickOutside } from '@vueuse/core';

const target = ref(null);

const isVisible = ref(false);
onClickOutside(target, () => (isVisible.value = false));
</script>
