<template>
  <NuxtLink to="/noutbuki-i-aksessuary/gotovie-komputeri" class="relative border-[#D9D9D9] border-solid border p-4 pt-6 card height-xs !gap-3 sm:!gap-5">
    <img src="/img/promo/i1.png" alt="" class="absolute right-0 top-0 bottom-0 h-full" />
    <div class="text-[#CB863A] text-[24px] font-medium leading-[1]">Компьютеры</div>
    <div class="text-black font-light text-sm">
      <span class="font-semibold">{{ data['/noutbuki-i-aksessuary/gotovie-komputeri'] }}</span> товаров
    </div>

    <div class="text-sm font-semibold flex items-start flex-col gap-1 mt-auto text-white relative -ml-4">
      <div class="bg-[#E5A35B] rounded-r-[3px] px-4">Бесплатная сборка</div>
      <div class="bg-[#E5A35B] rounded-r-[3px] px-4">в течение суток!</div>
    </div>
  </NuxtLink>
  <NuxtLink to="/noutbuki-i-aksessuary/noutbuki" class="relative border-[#D9D9D9] border-solid border p-4 pt-6 card height-xs !gap-3 sm:!gap-5">
    <img src="/img/promo/i2.png" alt="" class="absolute right-0 top-0 bottom-0 h-full" />

    <div class="text-[#CB863A] text-[24px] font-medium leading-[1]">Ноутбуки</div>
    <div class="text-black font-light text-sm">
      <span class="font-semibold">{{ data['/noutbuki-i-aksessuary/noutbuki'] }}</span> товаров
    </div>
    <div class="text-sm font-semibold flex items-start flex-col gap-1 mt-auto text-white relative -ml-4">
      <div class="bg-[#E5A35B] rounded-r-[3px] px-4">Бесплатная установка ПО:</div>
      <div class="bg-[#E5A35B] rounded-r-[3px] px-4">операционной системы,</div>
      <div class="bg-[#E5A35B] rounded-r-[3px] px-4">драйверов, программ</div>
    </div>
  </NuxtLink>
  <NuxtLink to="/periferiya-i-aksessuary/monitory" class="relative border-[#D9D9D9] border-solid border p-4 pt-6 card height-xs !gap-3 sm:!gap-5">
    <img src="/img/promo/i6.png" alt="" class="absolute right-0 top-4 bottom-4 h-[calc(100%-32px)]" />
    <div class="text-[#CB863A] text-[24px] font-medium leading-[1]">Мониторы</div>
    <div class="text-black font-light text-sm">
      <span class="font-semibold">{{ data['/periferiya-i-aksessuary/monitory'] }}</span> товаров
    </div>
    <div class="text-sm font-semibold flex items-start flex-col gap-1 mt-auto text-white relative -ml-4">
      <div class="bg-[#E5A35B] rounded-r-[3px] px-4">Мониторы</div>
      <div class="bg-[#E5A35B] rounded-r-[3px] px-4">по Минску и РБ</div>
    </div>
  </NuxtLink>
</template>

<script setup>
const { data } = await useFetch('/api/categories/counts', {
  method: 'GET',
});
</script>
