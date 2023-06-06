<template>
  <FilterItemAsCheckboxes :block="props.block" :values="checkboxes" v-model="model" @update:modelValue="handleCheckbox" />
  <div class="input-group">
    <Select :options="options" v-model="filters[`${alias}[from]`]" @update:modelValue="handleSelect" />
    <Select :options="options" v-model="filters[`${alias}[to]`]" @update:modelValue="handleSelect" />
  </div>
</template>

<script setup>
const props = defineProps(['block', 'values']);
const alias = props.block.alias;

const filters = inject('filters');
if (!filters[alias]) filters[alias] = '';
if (!filters[`${alias}[from]`]) filters[`${alias}[from]`] = '';
if (!filters[`${alias}[to]`]) filters[`${alias}[to]`] = '';
const model = ref(filters[alias].split(',').filter((item) => item.length));

const checkboxes = props.block.preffered_values
  ? props.block.preffered_values
      .split(',')
      .map((value) => value.trim())
      .filter((value) => props.values.includes(value))
  : props.values.slice(0, 3);

const options = [{ value: '', label: '' }, ...props.values.map((value) => ({ value, label: `${value}${props.block.suffix}` }))];

const handleCheckbox = (value) => {
  const current = value.sort((a, b) => +a - +b);
  const from = current[0];
  const to = current[current.length - 1];
  filters[`${alias}[from]`] = from;
  if (to !== from) filters[`${alias}[to]`] = to;

  checkboxes.forEach((item) => {
    if (+item < +to && +item > +from && !model.value.includes(item)) {
      model.value.push(item);
    }
  });
  filters[alias] = model.value.sort((a, b) => a - b).join(',');
};

const handleSelect = (value) => {
  model.value = [];
  filters[alias] = '';
};
</script>
