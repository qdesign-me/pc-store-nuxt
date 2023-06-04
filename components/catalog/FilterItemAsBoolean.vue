<template>
  <div class="flex input-group">
    <button class="text-center flex-1 w-10 text-xs leading-[25px] btn is-small" :class="{ 'is-plain': filters[alias] !== 'no' }" @click="handleClick('no')">Нет</button>

    <button class="text-center flex-1 w-10 text-xs leading-[25px] btn is-small" :class="{ 'is-plain': filters[alias] !== 'yes' }" @click="handleClick('yes')">Да</button>
  </div>
</template>

<script setup>
const props = defineProps(['block', 'values']);
const alias = props.block.alias;
const filters = inject('filters');

const handleClick = (param) => {
  filters[alias] === param ? (filters[alias] = null) : (filters[alias] = param);
};
</script>
