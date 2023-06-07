<template>
  <div class="input-group">
    <input placeholder="от" type="number" v-model="filters[`${alias}[from]`]" :min="min" :max="max" :step="1" />
    <input placeholder="до" type="number" v-model="filters[`${alias}[to]`]" :min="min" :max="max" :step="1" />
  </div>
</template>

<script setup>
const props = defineProps(['min', 'max']);
const alias = 'price';
const filters = inject('filters');
if (!filters[`${alias}[from]`]) filters[`${alias}[from]`] = '';
if (!filters[`${alias}[to]`]) filters[`${alias}[to]`] = '';
</script>
