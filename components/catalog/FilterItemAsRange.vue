<template>
  {{ filters[alias] }}
  <FilterItemAsCheckboxes :block="props.block" :values="checkboxes" v-model="model" @update:modelValue="handleCheckbox" />
  <div class="input-group">
    <input placeholder="от" type="number" v-model="filters[`${alias}[from]`]" :min="min" :max="max" :step="1" @input="handleInput" />
    <input placeholder="до" type="number" v-model="filters[`${alias}[to]`]" :min="min" :max="max" :step="1" @input="handleInput" />
  </div>
</template>

<script setup>
const props = defineProps(['block', 'values']);
const filters = inject('filters');
const alias = props.block.alias;

if (!filters[alias]) filters[alias] = '';
if (!filters[`${alias}[from]`]) filters[`${alias}[from]`] = '';
if (!filters[`${alias}[to]`]) filters[`${alias}[to]`] = '';
const model = ref(filters[alias].split(','));
const max = props.values[0];
const min = props.values[props.values[props.values.length - 1]];
const checkboxes = props.values;

const handleCheckbox = (value) => {
  const current = value.sort((a, b) => +a - +b);
  const from = current[0];
  const to = current[current.length - 1];
  filters[`${alias}[to]`] = to;
  filters[`${alias}[from]`] = from;
  checkboxes.forEach((item) => {
    if (+item < +to && +item > +from) {
      model.value.push(item);
    }
  });
  filters[alias] = model.value.join(',');
};

const handleInput = () => {
  model.value = [];
  filters[alias] = '';
};
</script>
