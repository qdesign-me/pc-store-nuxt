<template>
  <select v-model="model">
    <option v-for="option in props.options" :key="option.value" :value="option.value">{{ option.label }}</option>
  </select>
</template>

<script setup>
const emit = defineEmits(['update:modelValue']);
const props = defineProps(['options', 'modelValue']);
const model = computed({
  get() {
    return props.modelValue;
  },
  set(newValue) {
    emit('update:modelValue', newValue);
  },
});
</script>
