<template>
  <div class="container can-expand">
    <div class="grid grid-cols-2 gap-0 lg:grid-cols-5 lg:gap-2.5 box">
      <div class="card more-padding bg-blue group height-xs hidden lg:block">
        <div class="title text-white">
          Заказать
          <br />
          сборку
        </div>
        <ArrowRightIcon v-if="0" width="35" height="35" class="text-white mt-10 block group-hover:translate-x-2" />
      </div>
      <div class="card more-padding col-span-2 bg-milk height-xs box-links">
        <div class="title">Готовые сборки</div>
        <NuxtLink to="/payment#credit" class="btn leading-[50px]">
          <CalcIcon />
          Калькулятор рассрочки
        </NuxtLink>
        <!-- <NuxtLink class="btn leading-[50px]" to="/"> <ConfiguratorIcon class="!text-white" /> Конфигуратор ПК</NuxtLink> -->

        <div class="items">
          <PcTypesBlock />
        </div>
      </div>
      <div class="card more-padding col-span-2 bg-[#dbf4f9] height-xs box-subscribe">
        <div class="title">Хочу быть в курсе акций и новинок!</div>

        <SubscribeBlock />
      </div>
    </div>
  </div>
</template>
