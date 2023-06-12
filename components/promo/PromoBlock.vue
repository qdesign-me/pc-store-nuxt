<template>
  <div class="grid grid-cols-5 gap-2.5">
    <NuxtLink to="/zakazat-sborku" class="card bg-lightblue group">
      <div class="title text-white">
        Заказать
        <br />
        сборку
      </div>
      <ArrowRightIcon width="35" height="35" class="text-white mt-10 block group-hover:translate-x-2 transition" />
    </NuxtLink>
    <div class="card col-span-2 bg-milk">
      <div class="title">Готовые сборки</div>
      <div class="items">
        <PcTypesBlock />
      </div>
    </div>
    <div class="card col-span-2 bg-lightblue/10">
      <div class="title">Хочу быть в курсе акций и новинок!</div>

      <SubscribeBlock />
    </div>
  </div>
</template>
