<template>
  <NuxtLink v-for="link in data.data" :to="link.uri" :key="link.uri">
    <component :is="linkIcon(link.uri)" />
    <span v-html="link.name"></span>
  </NuxtLink>
</template>

<script setup>
const OfficeIcon = resolveComponent('OfficeIcon');
const HomeIcon = resolveComponent('HomeIcon');
const GraphicsIcon = resolveComponent('GraphicsIcon');
const PlayIcon = resolveComponent('PlayIcon');
const ServerIcon = resolveComponent('ServerIcon');
const NettopsIcon = resolveComponent('NettopsIcon');
const SysblocksIcon = resolveComponent('SysblocksIcon');

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
  {
    title: 'Системные блоки',
    icon: ServerIcon,
    uri: '/elektronika/Gotovie-komputeri/Sistemnie-bloki',
  },
  {
    title: 'Микро ПК',
    icon: SysblocksIcon,
    uri: '/elektronika/Gotovie-komputeri/Mikro-PK',
  },
  {
    title: 'Неттопы',
    icon: NettopsIcon,
    uri: '/elektronika/Gotovie-komputeri/nettopi',
  },
];

const linkIcon = (uri) => {
  const icon = links.find((item) => item.uri === uri)?.icon;
  return icon;
};

const { data } = await useFetch('/api/categories/pctypes');
</script>
