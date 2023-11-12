<template>
  <component :is="components[props.block.filter_type]" :block="props.block" :values="values" :uri="props.uri" />
</template>

<script setup>
const props = defineProps(['block', 'uri']);
const FilterItemAsBoolean = resolveComponent('FilterItemAsBoolean');
const FilterItemAsCombo = resolveComponent('FilterItemAsCombo');
const FilterItemAsModal = resolveComponent('FilterItemAsModal');
const FilterItemAsRange = resolveComponent('FilterItemAsRange');

const components = {
  boolean: FilterItemAsBoolean,
  combo: FilterItemAsCombo,
  popup: FilterItemAsModal,
  range: FilterItemAsRange,
};

const values = props.block?.value?.split(',').sort((a, b) => {
  if (props.block.sort_value === 'string') return a.localeCompare(b);
  if (props.block.sort_value === 'number_desc') return +b - +a;
  if (props.block.sort_value === 'number') return +a - +b;
});
</script>
