<template>
  <div class="flex input-group">
    <button
      class="text-center flex-1 w-10 text-xs leading-[25px] btn is-small"
      :class="{ 'is-plain': filters[props.block.alias] !== 'no' }"
      @click="handleClick(filters[props.block.alias] === 'no' ? null : 'no')"
    >
      Нет
    </button>

    <button
      class="text-center flex-1 w-10 text-xs leading-[25px] btn is-small"
      :class="{ 'is-plain': filters[props.block.alias] !== 'yes' }"
      @click="handleClick(filters[props.block.alias] === 'yes' ? null : 'yes')"
    >
      Да
    </button>
  </div>
</template>

<script setup>
import { watchDebounced } from '@vueuse/core';

const props = defineProps(['block', 'values', 'uri']);

const filters = inject('filters');
const model = ref(filters.value[props.block.alias]);

const handleClick = (value) => {
  model.value = value;
};

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
