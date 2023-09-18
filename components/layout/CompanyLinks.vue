<template>
  <template v-if="props.link">
    <a @click="() => setVisible(`/img/about/${props.link}.jpg`)">{{ items[props.link] }}</a>
  </template>
  <template v-else>
    <a v-for="item in Object.keys(items)" key="item" @click="() => setVisible(`/img/about/${item}.jpg`)">{{ items[item] }}</a>
  </template>

  <a-image
    v-if="!!visible"
    :width="100"
    :style="{ display: 'none' }"
    :preview="{
      visible,
      onVisibleChange: () => setVisible(false),
    }"
    :src="visible"
  />
</template>

<script setup>
const props = defineProps(['link']);

const items = {
  certificate: 'Свидетельство о регистрации',
  conformity: 'Сертификат соответствия на ПК',
  check: 'Кассовый чек',
  warranty: 'Гарантийный талон',
};
import { ref } from 'vue';
const visible = ref(false);
const setVisible = (value) => {
  visible.value = value;
};
</script>
