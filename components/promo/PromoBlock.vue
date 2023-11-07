<template>
  <div class="container">
    <div class="grid grid-cols-1 xl:grid-cols-5 gap-2.5 box">
      <div class="card pt-5 height-xs flex flex-col lgr z-1">
        <img src="/img/promo/confetti.png" alt="" class="absolute top-0 right-0 z-1 max-h-full" />
        <img src="/img/promo/gift-box.png" alt="" class="absolute top-1/2 -translate-y-1/2 right-0 z-1 max-h-full" />
        <div class="title-md text-white px-3 relative">
          Бесплатная <br />
          сборка под <br />
          ваши задачи
        </div>

        <div class="mt-auto w-full">
          <Consultation title="Бесплатная сборка под ваши задачи"
            ><button class="btn-white justify-center text-[#F54D4D] w-full"><CheckIcon class="absolute left-6 top-1/2 -translate-y-1/2" /> Заказать</button></Consultation
          >
        </div>
      </div>
      <div class="card pt-5 height-xs flex flex-col lgr">
        <img src="/img/promo/technician.png" alt="" class="absolute top-0 right-0 z-1 max-h-full" />
        <div class="title-md text-white line-clamp-3 z-[2] relative px-3">
          Собрать <br />
          самостоятельно <br />
          в Конфигураторе ПК
        </div>
        <button class="btn-white mt-auto justify-center"><ToolsIcon class="absolute left-6 top-1/2 -translate-y-1/2" />Начать собирать</button>
      </div>
      <div class="card py-5 px-5 xl:col-span-2 bg-milk height-xs lgr flex flex-col justify-between gap-4">
        <div class="flex gap-5 flex-wrap">
          <div class="title-md text-white flex-1 line-clamp-2">
            Можно забрать <br />
            уже сегодня!
          </div>
          <div class="w-full sm:w-auto">
            <NuxtLink to="/noutbuki-i-aksessuary/gotovie-komputeri" class="btn-white w-full"><CartIcon class="static" />Купить готовый компьютер</NuxtLink>
          </div>
        </div>

        <div class="items !mt-0">
          <PcTypesBlock />
        </div>
      </div>
      <div class="card pt-5 more-padding bg-[#dbf4f9] height-xs box-subscribe flex flex-col justify-between gap-4 lg:gap-2">
        <div class="title-md line-clamp-2">Хочу быть в курсе акций и новинок!</div>
        <SubscribeBlock />
      </div>
    </div>
  </div>
</template>
