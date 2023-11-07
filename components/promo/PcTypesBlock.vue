<template>
  <NuxtLink v-for="link in data.data" :to="link.uri" :key="link.uri" class="hover:text-white opacity-100 !gap-2">
    <div class="bg-white flex items-center justify-center rounded-full w-[46px] h-[46px]" style="filter: drop-shadow(0px 4px 4px rgba(0, 179, 215, 0.49))">
      <component :is="linkIcon(link.uri)" class="text-[#00B3D7]" />
    </div>
    <span v-html="link.name" class="text-[#000000] transition duration-300 underline underline-offset-2"></span>
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
    uri: '/noutbuki-i-aksessuary/gotovie-komputeri/dlya-ofisa',
  },
  {
    title: 'Для дома',
    icon: HomeIcon,
    uri: '/noutbuki-i-aksessuary/gotovie-komputeri/dlya-doma',
  },
  {
    title: 'Для графики',
    icon: GraphicsIcon,
    uri: '/noutbuki-i-aksessuary/gotovie-komputeri/dlya-grafiki',
  },
  {
    title: 'Игровые',
    icon: PlayIcon,
    uri: '/noutbuki-i-aksessuary/gotovie-komputeri/igrovye',
  },
  {
    title: 'Серверы <span>и станции</span>',
    icon: ServerIcon,
    uri: '/noutbuki-i-aksessuary/gotovie-komputeri/servery-irabochie-stancii',
  },
  {
    title: 'Системные блоки',
    icon: ServerIcon,
    uri: '/noutbuki-i-aksessuary/gotovie-komputeri/sistemnie-bloki',
  },
  {
    title: 'Микро ПК',
    icon: SysblocksIcon,
    uri: '/noutbuki-i-aksessuary/gotovie-komputeri/mikro-pk',
  },
  {
    title: 'Неттопы',
    icon: NettopsIcon,
    uri: '/noutbuki-i-aksessuary/gotovie-komputeri/nettopi',
  },
];

const linkIcon = (uri) => {
  const icon = links.find((item) => item.uri === uri)?.icon;
  return icon;
};

const { data } = await useFetch('/api/categories/pctypes');
</script>
