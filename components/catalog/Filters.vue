<template>
  <div class="pr-10 flex flex-col gap-4">
    <FilterItemAsPrice />
    <div v-for="block in props.blocks" :key="block.label">
      <div class="label-wrap">
        <div class="label">{{ block.label }}</div>
        <Tooltip v-if="block.tooltip">
          <div class="help-trigger"></div>
          <template #text>{{ block?.tooltip }}</template>
        </Tooltip>
      </div>
      <FilterItem :block="block" />
    </div>
    <div v-if="O">
      <button class="btn" @click="emit('reset')">Очичтить фильтры <span class="filters-clear"></span></button>
    </div>
  </div>
</template>

<script setup>
const props = defineProps(['blocks']);
const emit = defineEmits(['reset']);
</script>
