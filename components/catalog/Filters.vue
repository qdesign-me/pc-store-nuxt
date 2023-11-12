<template>
  <div class="xl:pr-10 flex-col gap-4 hidden xl:flex">
    <FilterItemAsPrice :min="Math.floor(props.products?.price_min)" :max="Math.ceil(props.products?.price_max)" :uri="props.uri" />
    <div v-for="block in props.blocks" :key="block.label">
      <div class="label-wrap">
        <div class="label">{{ block.label }}</div>
        <Tooltip v-if="block.tooltip">
          <div class="help-trigger"></div>
          <template #text>{{ block?.tooltip }}</template>
        </Tooltip>
      </div>

      <FilterItem :block="block" :uri="props.uri" />
    </div>
    <div v-if="O">
      <button class="btn" @click="emit('reset')">Очичтить фильтры <span class="filters-clear"></span></button>
    </div>
  </div>
</template>

<script setup>
const props = defineProps(['blocks', 'products', 'uri']);
const emit = defineEmits(['reset']);
</script>
