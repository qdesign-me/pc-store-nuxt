<template>
  <div class="label">Цена</div>

  <div class="input-group !mt-1">
    <input :placeholder="props.min" type="number" v-model="model.min" :min="props.min" :max="props.max" :step="1" class="!pr-0" />
    <input :placeholder="props.max" type="number" v-model="model.max" :min="model.min ?? props.min" :max="props.max" :step="1" class="!pr-0" />
  </div>
</template>

<script setup>
import { watchDebounced } from '@vueuse/core';

const props = defineProps(['min', 'max', 'uri']);

const filters = inject('filters');

const model = reactive({ min: filters.value['filter_price[from]'], max: filters.value['filter_price[to]'] });

watchDebounced(
  model,
  () => {
    const newFitlers = { ...filters.value };
    if (model.min) newFitlers[`filter_price[from]`] = model.min;
    if (model.max) newFitlers[`filter_price[to]`] = model.max;
    if (!model.min) delete newFitlers[`filter_price[from]`];
    if (!model.max) delete newFitlers[`filter_price[to]`];

    const searchQuery = buildQuery(newFitlers);
    const path = `${props.uri}${searchQuery}`;
    navigateTo(path);
  },
  { debounce: 500, maxWait: 1000 }
);
</script>
