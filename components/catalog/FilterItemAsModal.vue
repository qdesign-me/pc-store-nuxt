<template>
  <FilterItemAsCheckboxes :block="props.block" :values="all" v-model="model" />

  <div class="relative">
    <button class="btn is-small w-full relative is-plain" @click="modal = true">
      Все {{ totalInfo }}
      <ArrowRightIcon class="absolute right-4" />
    </button>

    <div v-show="modal" class="shadow p-6 absolute z-[100] -top-16 -right-6 bg-white rounded translate-x-full" ref="target">
      <div class="text-light text-sm columns-3 column gap-10">
        <div v-for="value in props.values" :key="value" class="flex gap-2 items-center whitespace-nowrap">
          <input type="checkbox" :value="value" v-model="model" @input="handleInput" /> {{ value }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onClickOutside, watchDebounced } from '@vueuse/core';
const props = defineProps(['block', 'values', 'uri']);
const alias = props.block.alias;

const modal = ref(false);
const target = ref(null);
const filters = inject('filters');
if (!filters[alias]) filters[alias] = '';
const model = ref(filters[alias].split(',').filter((item) => item.length));

const checkboxes = props.block.preffered_values
  ? props.block.preffered_values
      .split(',')
      .map((value) => value.trim())
      .filter((value) => props.values.includes(value))
  : props.values.slice(0, 3);

const handleInput = (event) => {
  const checked = event.target.checked;
  const value = event.target.value;
  const newValues = checked ? [...model.value, value] : model.value;
  model.value = newValues;
};

const totalInfo = pluralize(props.values.length, ['вариант', 'варианта', 'вариантов']);

onClickOutside(target, () => (modal.value = false));

const all = computed(() => {
  return [...checkboxes, ...model.value.filter((item) => !checkboxes.includes(item))];
});

watchDebounced(
  model,
  () => {
    const newFitlers = { ...filters.value };
    newFitlers[alias] = model.value;
    console.log(newFitlers);
    const searchQuery = buildQuery(newFitlers);
    const path = `${props.uri}${searchQuery}`;
    navigateTo(path);
  },
  { debounce: 500, maxWait: 1000 }
);
</script>
