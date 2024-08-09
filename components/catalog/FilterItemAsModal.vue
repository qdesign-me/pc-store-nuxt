<template>
  <FilterItemAsCheckboxes :block="props.block" :values="all" v-model="model" />

  <div class="relative mt-1">
    <button class="btn is-small w-full relative is-plain" @click="modal = true">
      Все {{ totalInfo }}
      <ArrowRightIcon class="absolute right-4" />
    </button>

    <div v-show="modal" class="filter-modal" ref="target">
      <div class="text-center text-sm font-medium border-b border-[#D9D9D9] pt-6 pb-6 -mx-5 px-5 sticky top-0 bg-white mb-4 xl:hidden">
        {{ block.label }}
      </div>
      <div class="filter-modal-columns text-light">
        <div v-for="value in props.values" :key="value" class="flex gap-2 items-center whitespace-nowrap">
          <input type="checkbox" :value="value" v-model="model" @input="handleInput" /> {{ value }}
        </div>
      </div>
      <div class="fixed top-4 right-3 xl:hidden">
        <button @click="modal = false" class="text-[#000]"><ChevronRightIcon class="rotate-180" /></button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onClickOutside, watchDebounced } from '@vueuse/core';
const props = defineProps(['block', 'values', 'uri']);

const modal = ref(false);
const target = ref(null);
const filters = inject('filters');

const model = ref((filters.value[props.block.alias] ?? '').split(',').filter((item) => item && item.length));

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
    newFitlers[props.block.alias] = model.value;
    const searchQuery = buildQuery(newFitlers);
    const path = `${props.uri}${searchQuery}`;
    navigateTo(path);
  },
  { debounce: 500, maxWait: 1000 }
);
</script>
