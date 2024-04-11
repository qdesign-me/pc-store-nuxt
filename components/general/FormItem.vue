<template>
  <div class="ir" :class="{ 'is-error': form.errors?.[props?.name] }">
    <slot />
    <div v-if="form.errors?.[props?.name]?.phone" class="error">Укажите правильный телефон</div>
    <div v-if="form.errors?.[props?.name]?.required" class="error">Заполните это поле</div>
    <div v-if="form.errors?.[props?.name]?.email" class="error">Укажите правильный email</div>
  </div>
</template>

<script setup>
const props = defineProps(['name', 'rules']);
const form = inject('form');

onMounted(() => form.registerRule(props.name, props.rules));
onUnmounted(() => form.unregisterRule(props.name));
</script>
