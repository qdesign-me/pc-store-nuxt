<template>
  <FilterItemAsCheckboxes :block="props.block" :values="checkboxes" v-model="model.values" @update:modelValue="handleCheckbox" />
  <div class="input-group">
    <Select :options="options" v-model="model.from" @update:modelValue="handleSelect" />
    <Select :options="optionsTo" v-model="model.to" @update:modelValue="handleSelect" />
  </div>
</template>

<script setup>
import { watchDebounced } from '@vueuse/core';
const props = defineProps(['block', 'values', 'uri']);
const filters = inject('filters');
const alias = props.block.alias;

const model = ref({
  from: filters.value[`${alias}[from]`] ?? '',
  to: filters.value[`${alias}[to]`] ?? '',
  values: (filters.value[alias] ?? '').split(','),
});

const options = computed(() => [{ value: '', label: '' }, ...props.values.map((value) => ({ value, label: `${value}${props.block.suffix}` }))]);
const optionsTo = computed(() => {
  if (!model.value.from) return options.value;
  return options.value.filter((item) => +item.value >= +model.value.from);
});

const checkboxes = props.block.preffered_values
  ? props.block.preffered_values
      .split(',')
      .map((value) => value.trim())
      .filter((value) => props.values.includes(value))
  : props.values.slice(0, 5);

const handleCheckbox = () => {
  model.value = { ...model.value, from: '', to: '' };
};

const handleSelect = () => {
  const newValues = { ...model.value, values: [] };
  if (+newValues.to && +newValues.to < +newValues.from) delete newValues.to;
  model.value = { ...newValues };
};

watchDebounced(
  model,
  () => {
    const newFilters = { ...filters.value };
    newFilters[alias] = model.value.values;
    newFilters[`${alias}[from]`] = model.value.from;
    newFilters[`${alias}[to]`] = model.value.to;
    const searchQuery = buildQuery(newFilters);
    const path = `${props.uri}${searchQuery}`;
    navigateTo(path);
  },
  { debounce: 500, maxWait: 1000 }
);
</script>
