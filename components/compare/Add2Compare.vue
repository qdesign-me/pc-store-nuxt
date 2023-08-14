<template>
  <button
    v-if="props.variant === 'primary'"
    class="w-10 flex-1 btn is-transparent leading-[50px]"
    :class="{ '!text-blue': items.includes(props.productID) }"
    @click="toggle(props.productID)"
  >
    <CompareIcon />
    Сравнить
  </button>
  <button v-else class="ml-auto is-transparent p-2 cursor-pointer" :class="{ 'text-blue': items.includes(props.productID) }">
    <CompareIcon @click="toggle(props.productID)" />
  </button>
</template>

<script setup>
const props = defineProps(['productID', 'variant']);
const { items, toggle } = useCompare();
</script>
