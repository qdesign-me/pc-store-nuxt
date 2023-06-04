<template>
  <div class="flex flex-col">
    <div v-for="value in props.values" :key="value">
      <input type="checkbox" :value="value" v-model="model" /> {{ value }}
      {{ props.block.suffix }}
    </div>
  </div>
</template>

<script setup>
const emit = defineEmits(['update:modelValue']);
const props = defineProps(['values', 'block', 'modelValue']);
const model = computed({
  get() {
    return props.modelValue;
  },
  set(newValue) {
    emit('update:modelValue', newValue);
  },
});
</script>
