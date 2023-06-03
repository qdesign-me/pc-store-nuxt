<template>
  <a v-for="link in props.social?.split(' ')" :href="link" target="_blank">
    <div class="icon" :class="icon(link)"></div>
  </a>
</template>
<script setup>
const props = defineProps(['social']);
const icon = (link) => {
  let icon = '';
  if (link.includes('t.me')) icon = 'icon-telegram';
  if (link.includes('skype')) icon = 'icon-skype';
  if (link.includes('viber')) icon = 'icon-viber';
  if (link.includes('facebook')) icon = 'icon-facebook';
  if (link.includes('instagram')) icon = 'icon-instagram';
  if (link.includes('vk.com')) icon = 'icon-vk';
  return icon;
};
</script>
