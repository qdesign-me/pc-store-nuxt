<template>
  <NuxtLink v-for="link in links" :to="link.uri" :key="link.uri">
    <component :is="link.icon" />
    {{ link.name }}
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
    name: 'Для офиса',
    icon: OfficeIcon,
    uri: '/elektronika/Gotovie-komputeri/dlya-ofisa',
  },
  {
    name: 'Для дома',
    icon: HomeIcon,
    uri: '/elektronika/Gotovie-komputeri/dlya-doma',
  },
  {
    name: 'Для графики',
    icon: GraphicsIcon,
    uri: '/elektronika/Gotovie-komputeri/dlya-grafiki',
  },
  {
    name: 'Игровые',
    icon: PlayIcon,
    uri: '/elektronika/Gotovie-komputeri/igrovye',
  },
  {
    name: 'Серверы и рабочие станции',
    icon: ServerIcon,
    uri: '/elektronika/Gotovie-komputeri/servery-irabochie-stancii',
  },
];
</script>
