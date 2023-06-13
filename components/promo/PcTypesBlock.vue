<template>
  <NuxtLink v-for="link in links" :to="link.uri" :key="link.uri">
    <component :is="link.icon" />
    <span v-html="link.title"></span>
  </NuxtLink>
</template>

<script setup>
const OfficeIcon = resolveComponent('OfficeIcon');
const HomeIcon = resolveComponent('HomeIcon');
const GraphicsIcon = resolveComponent('GraphicsIcon');
const PlayIcon = resolveComponent('PlayIcon');
const ServerIcon = resolveComponent('ServerIcon');

const links = [
  {
    title: 'Для офиса',
    icon: OfficeIcon,
    uri: '/elektronika/Gotovie-komputeri/dlya-ofisa',
  },
  {
    title: 'Для дома',
    icon: HomeIcon,
    uri: '/elektronika/Gotovie-komputeri/dlya-doma',
  },
  {
    title: 'Для графики',
    icon: GraphicsIcon,
    uri: '/elektronika/Gotovie-komputeri/dlya-grafiki',
  },
  {
    title: 'Игровые',
    icon: PlayIcon,
    uri: '/elektronika/Gotovie-komputeri/igrovye',
  },
  {
    title: 'Серверы <span>и станции</span>',
    icon: ServerIcon,
    uri: '/elektronika/Gotovie-komputeri/servery-irabochie-stancii',
  },
];
</script>
