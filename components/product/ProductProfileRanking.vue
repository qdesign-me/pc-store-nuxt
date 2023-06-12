<template>
  <div class="bg-blue/10 rounded p-3 flex-1">
    <div class="flex justify-between mb-4">
      <div class="text-xl font-semibold">Рейтинг товара</div>
      <div class="flex gap-4 items-center">
        4.9
        <div class="flex gap-2">
          <StarIcon width="25" height="23" />
          <StarIcon width="25" height="23" />
          <StarIcon width="25" height="23" />
          <StarIcon width="25" height="23" />
          <StarOutlined width="25" height="23" />
        </div>
      </div>
    </div>
    <div class="reviews-summary">
      <div>
        <div>5</div>
        <div>
          <div style="width: 89%"></div>
        </div>
        <div>89%</div>
      </div>
      <div>
        <div>4</div>
        <div>
          <div style="width: 9%"></div>
        </div>
        <div>9%</div>
      </div>
      <div>
        <div>3</div>
        <div>
          <div style="width: 3%"></div>
        </div>
        <div>1%</div>
      </div>
      <div>
        <div>5</div>
        <div></div>
        <div>0%</div>
      </div>
      <div>
        <div>5</div>
        <div></div>
        <div>0%</div>
      </div>
    </div>
    <div class="text-xl font-semibold mt-4 mb-2">Обзоры</div>
    <div class="flex flex-col rounded overflow-hidden">
      <div class="relative cursor-pointer">
        <img src="/img/reviews/1.jpg" alt="" loading="lazy" width="400" height="253" class="w-full" />
        <VideoIcon class="absolute shadow rounded-full left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />
      </div>
      <div class="bg-blue text-white font-semibold text-lg p-2">Как выбрать материнскую плату</div>
    </div>

    <div class="flex flex-col gap-6 text-sm my-10">
      <a href="#" class="flex gap-4 justify-between">
        <div class="underline underline-offset-4">Обзор новинок рынка. На что обратить внимание в 2023 году</div>
        <ArrowRightIcon />
      </a>
      <a href="#" class="flex gap-4 justify-between">
        <div class="underline underline-offset-4">Как выбрать материнскую плату и не разочароваться</div>
        <ArrowRightIcon />
      </a>
      <a href="#" class="flex gap-4 justify-between">
        <div class="underline underline-offset-4">Материнская плата: как выбрать и не переплатить</div>
        <ArrowRightIcon />
      </a>
    </div>
    <div class="title mb-4">
      Начисляем бонусы
      <br />
      за публикацию <br />
      обзоров и статей!
    </div>
    <button class="text-blue flex items-center gap-6 underline underline-offset-4">Опубликовать обзор <ArrowRightIcon /></button>
  </div>
</template>
