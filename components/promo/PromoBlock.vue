<template>
  <div class="container">
    <div class="grid grid-cols-1 xl:grid-cols-5 gap-2.5 box">
      <div class="card height-xs flex flex-col lgr z-1">
        <img src="/img/promo/confetti.png" alt="" class="absolute top-0 right-0 z-1 max-h-full" />
        <img src="/img/promo/gift-box.png" alt="" class="absolute top-1/2 -translate-y-1/2 right-0 z-1 max-h-full" />
        <div class="title-md text-white">
          Бесплатная <br />
          сборка под <br />
          ваши задачи
        </div>

        <button class="btn-white mt-auto justify-center text-[#F54D4D]"><CheckIcon class="absolute left-6 top-1/2 -translate-y-1/2" /> Заказать</button>
      </div>
      <div class="card height-xs flex flex-col lgr">
        <img src="/img/promo/technician.png" alt="" class="absolute top-0 right-0 z-1 max-h-full" />
        <div class="title-md text-white line-clamp-3 z-[2] relative">
          Собрать <br />
          самостоятельно <br />
          в Конфигураторе ПК
        </div>
        <button class="btn-white mt-auto justify-center"><ToolsIcon class="absolute left-6 top-1/2 -translate-y-1/2" />Начать собирать</button>
      </div>
      <div class="card xl:col-span-2 bg-milk height-xs lgr flex flex-col gap-4">
        <div class="flex gap-5 flex-wrap">
          <div class="title-md text-white flex-1 line-clamp-2">
            Можно забрать <br />
            уже сегодня!
          </div>
          <div class="w-full sm:w-auto">
            <button class="btn-white w-full"><CartIcon class="static" />Купить готовый компьютер</button>
          </div>
        </div>

        <div class="items !mt-0">
          <PcTypesBlock />
        </div>
      </div>
      <div class="card more-padding bg-[#dbf4f9] height-xs box-subscribe flex flex-col justify-between gap-4 lg:gap-2">
        <div class="title-md line-clamp-2">Хочу быть в курсе акций и новинок!</div>
        <SubscribeBlock />
      </div>
    </div>
  </div>
</template>
