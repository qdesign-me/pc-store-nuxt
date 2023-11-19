<template>
  <FilterItemAsCheckboxes :block="props.block" :values="checkboxes" v-model="model.values" @update:modelValue="handleCheckbox" />
  <div class="input-group">
    <input placeholder="от" type="number" v-model="model.from" :min="min" :max="max" :step="1" @input="handleInput('from')" />
    <input placeholder="до" type="number" v-model="model.to" :min="min" :max="max" :step="1" @input="handleInput('to')" />
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

const min = props.values[0];
const max = props.values[props.values.length - 1];

const checkboxes = props.block.preffered_values
  ? props.block.preffered_values
      .split(',')
      .map((value) => value.trim())
      .filter((value) => props.values.includes(value))
  : props.values.slice(0, 5);

const handleCheckbox = (value) => {
  model.value = {
    values: value.filter((item) => item?.length),
    from: '',
    to: '',
  };
};

const handleInput = (mode) => {
  const newValues = { ...model.value, values: [] };
  if (mode === 'from' && +newValues.to && +newValues.to < +newValues.from) delete newValues.to;

  console.log(newValues, min, max);
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
