<template>
  <div class="input-group">
    <input :placeholder="props.min" type="number" v-model="model.min" :min="props.min" :max="props.max" :step="1" class="!pr-0" />
    <input :placeholder="props.max" type="number" v-model="model.max" :min="model.min ?? props.min" :max="props.max" :step="1" class="!pr-0" />
  </div>
</template>

<script setup>
import { watchDebounced } from '@vueuse/core';

const props = defineProps(['min', 'max', 'uri']);

const filters = inject('filters');

const model = reactive({ min: filters.value['price[from]'], max: filters.value['price[to]'] });

watchDebounced(
  model,
  () => {
    const newFitlers = { ...filters.value };
    if (model.min) newFitlers[`price[from]`] = model.min;
    if (model.max) newFitlers[`price[to]`] = model.max;
    if (!model.min) delete newFitlers[`price[from]`];
    if (!model.max) delete newFitlers[`price[to]`];

    const searchQuery = buildQuery(newFitlers);
    const path = `${props.uri}${searchQuery}`;
    navigateTo(path);
  },
  { debounce: 500, maxWait: 1000 }
);
</script>
