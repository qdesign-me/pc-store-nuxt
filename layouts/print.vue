<template>
  <div class="flex justify-between py-1 items-center bg-black text-white px-6">
    <div class="logo">
      <NuxtLink to="/"><img src="/img/logo.png" alt="Iven" class="h-[60px]" /></NuxtLink>
    </div>
    <div class="flex gap-2">
      <PhoneIcon />
      <a :href="`tel:${config.mainphone}`" class="flex gap-4"> {{ formatPhoneNumber(config.mainphone) }}</a> |
      <a :href="`mailto:${$state.config.email}`">{{ $state.config.email }}</a>
    </div>

    <div>i-ven.by</div>
  </div>

  <div>
    <div class="flex gap-x-6 my-6 text-[12px]">
      <div
        v-for="(item, index) in ['Программа лояльности', 'Профессиональные сотрудники', 'Ускоренный обмен либо возврат комплектующих']"
        class="flex-1 w-10 flex flex-col items-center gap-2"
      >
        <img :src="`/img/about/service/${index + 1}.svg`" :alt="item" />
        {{ item }}
      </div>
    </div>
    <slot />
  </div>
</template>

<script setup>
import { useAppStore } from '~/stores/app';
const { $state } = useAppStore();
const config = $state?.config || {};

onMounted(() => {
  setTimeout(() => window.print(), 1000);
});
</script>
