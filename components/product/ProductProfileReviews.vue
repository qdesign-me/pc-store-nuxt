<template>
  <div class="reviews mt-16">
    <div class="flex justify-between gap-4 pr-10 items-center mb-2">
      <div class="flex gap-2 items-center">
        <div class="title">Отзывы (17)</div>
        <div class="pagination">
          <button class="active">1</button>
          <button>2</button>
          <button>3</button>
          <button class="btn is-plain !border-0 underline underline-offset-4 !w-auto px-2">Следующая</button>
        </div>
      </div>
      <div class="text-sm flex gap-2">
        <button class="btn is-plain !border-0 underline underline-offset-4">Правила написания отзывов</button>
        <button class="btn is-plain !border-0 underline underline-offset-4">
          Опубликовать отзыв
          <ArrowRightIcon />
        </button>
      </div>
    </div>
    <div class="review-item">
      <div class="review-control">
        <div>
          <ArrowRightIcon class="rotate-180" />
        </div>
      </div>
      <div class="review-content">
        <div class="flex gap-8 mb-6">
          <div>
            <AvatarIcon />
          </div>
          <div class="flex flex-col gap-1">
            <div>Имя Пользователя</div>

            <div>2023-04-17</div>
          </div>
        </div>
        <div class="flex gap-2 items-center mb-2"><StarIcon /> 5</div>
        <div>
          <strong class="text-lg">Достоинства</strong>
        </div>
        <p>Быстрый, лёгкий, долго держит аккумулятор, не дорогой, камера в кнопке, 16 Гб оперативной памяти, удобное зарядное устройство</p>
        <div>
          <strong class="text-lg">Недостатки</strong>
        </div>
        <p>Нет порта RJ-45, USB портов хотелось бы больше</p>
        <div>
          <strong class="text-lg">Комментарий</strong>
        </div>
        <p>
          Это просто отличный ноутбук и не только за свою цену. Он достаточно лёгкий, работает быстро, хороший процессор, много оперативной памяти, SSD Диск не маленький,
          &#34;инновационный&#34; видеочип Intel Iris Xe graphics, который очень экономит аккумулятор, веб камера убирается в кнопку, корпус алюминий, сканер отпечатка пальцев. И к
          тому же фирма - топовый Китайский бренд
        </p>
        <div class="flex gap-4 text-[#7C7C7C]">
          <div class="flex gap-2 items-center">
            <div class="cursor-pointer">
              <ThumbsUpIcon />
            </div>
            5
          </div>
          <div class="cursor-pointer">
            <ThumbsDownIcon />
          </div>
        </div>
      </div>
      <div class="review-control">
        <div>
          <ArrowRightIcon />
        </div>
      </div>
    </div>
  </div>
</template>
