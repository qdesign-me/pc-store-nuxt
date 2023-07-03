<template>
  <div class="container can-expand">
    <div class="grid grid-cols-2 gap-0 lg:grid-cols-5 lg:gap-2.5 box">
      <NuxtLink to="/zakazat-sborku" class="card more-padding bg-blue group height-xs hidden lg:block">
        <div class="title text-white">
          Заказать
          <br />
          сборку
        </div>
        <ArrowRightIcon width="35" height="35" class="text-white mt-10 block group-hover:translate-x-2" />
      </NuxtLink>
      <div class="card more-padding col-span-2 bg-milk height-xs box-links">
        <div class="title">Готовые сборки</div>

        <NuxtLink class="btn leading-[50px]" to="/"> <ConfiguratorIcon class="!text-white" /> Конфигуратор ПК</NuxtLink>

        <div class="items">
          <PcTypesBlock />
        </div>
      </div>
      <div class="card more-padding col-span-2 bg-blue/10 height-xs box-subscribe">
        <div class="title">Хочу быть в курсе акций и новинок!</div>

        <SubscribeBlock />
      </div>
    </div>
  </div>
</template>
