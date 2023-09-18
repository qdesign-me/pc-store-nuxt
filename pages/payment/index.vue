<template>
  <main class="text-sm text">
    <div class="box">
      <div class="container">
        <div class="breadcrumbs"><NuxtLink to="/" class="">Главная </NuxtLink><span>Оплата</span></div>

        <div class="flex flex-col xl:flex-row justify-between gap-10 items-start">
          <div class="flex-1 text-wrap">
            <h1>Оплата наличными</h1>
            <div class="box-lg">
              <p>Оплату наличными можно осуществить в пункте самовывоза или курьеру при получении товара.</p>
            </div>
            <div class="box-lg">
              <h2>Оплата банковской картой</h2>
              <p>Оплату банковской картой можно осуществить в пункте самовывоза или курьеру при получении товара.</p>

              <p>В том числе, принимаем к оплате карты рассрочки:</p>

              <div class="flex gap-2 card-logos mt-2">
                <img src="/img/info/vtb.png" loading="lazy" width="64" height="40" alt="" />
                <img src="/img/info/halva.png" loading="lazy" width="64" height="40" alt="" />
                <img src="/img/info/magnit.png" loading="lazy" width="64" height="40" alt="" />
              </div>
            </div>

            <h2 class="mt-10">Оплата через ЕРИП</h2>
            <img src="/img/info/erip.png" loading="lazy" width="125" height="40" alt="" class="mb-4" />

            <p>Инструкция по оплате в системе ЕРИП:</p>

             
            <p>1. Уточнить статус заказа у менеджеров компании ООО «Компьютеры Айвен».</p>

            <p>2. В системе ЕРИП последовательно выбрать пункты:</p>
            <ul>
              <li>Система "Расчет" (ЕРИП)</li>
              <li>Интернет-магазины / сервисы</li>
              <li>Выбрать символ  " i "</li>
              <li>i-ven.by</li>
            </ul>

            <p>3. Для оплаты товара ввести номер заказа, который вы получили после оформления заказа.</p>

            <p>4. Сверить сумму платежа.</p>

            <p>5. Проверить корректность информации.</p>

            <p>6. Совершить платеж.</p>

            <p>7. Ожидать звонка от менеджера компании ООО «Компьютеры Айвен» с подтверждением оплаты.</p>
          </div>
          <div class="flex flex-col gap-4 w-full xl:w-auto">
            <div class="bg-blue/10 rounded flex-1 text-wrap py-10 px-5 xl:px-10 xl:-mt-10">
              <div class="h2">Реквизиты компании</div>

              <div class="text-xs leading-[1.5]">
                <p class="mb-8">
                  ООО «Компьютеры Айвен»<br />
                  220035, г. Минск, ул. Репина, 4, пом.475-2<br />
                  УНП 192776859<br />
                  р/с BY59ALFA30122A02330010270000 в ЗАО "Альфа-Банк", код ALFABY2X г. Минск, ул. Сурганова, 43-47<br />
                  тел. <a href="tel:+375173783627">+375-17-378-36-27</a>
                </p>

                <div class="flex flex-col gap-3 underline">
                  <CompanyLinks />
                </div>
              </div>
            </div>
            <div class="bg-[#FF8484]/20 rounded flex-1 text-wrap py-10 px-5 xl:px-10">
              <div class="h2">Для юридических лиц</div>

              <p>Отгрузка товара осуществляется только по 100% предоплате.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="box box-scroll2 pt-10" id="credit">
      <div class="container">
        <h2>Оплата в кредит</h2>
        <p class="mb-6 -mt-1">Возможно оформление кредита в банках-партнёрах:</p>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="card border h-auto md:pt-6 md:pb-8 md:px-10">
            <img src="/img/info/belarusb-logo.png" loading="lazy" width="280" height="40" class="mb-4" alt="" />
            <div class="text-[20px] font-medium">Кредит «Партнер Online» от Беларусбанка</div>
            <p class="my-4">Потребительский кредит</p>
            <div class="flex flex-col gap-2">
              <div class="flex items-center gap-3"><PercentOutlinedIcon />Ставка: <strong>19.9%</strong></div>
              <div class="flex items-center gap-3"><CoinsIcon />Сумма от <strong>50 Br</strong></div>
              <div class="flex items-center gap-3"><CalcOutlinedIcon />Срок кредитования: <strong>от 3 до 60 мес</strong></div>
            </div>

            <NuxtLink to="https://myfin.by/bank/belarusbank/kredity/1237-partner" target="blank" rel="nofollow"
              ><button class="btn mt-10"><CalcIcon /> Калькулятор рассрочки</button></NuxtLink
            >
          </div>
          <div class="card h-auto border md:pt-6 md:pb-8 md:px-10">
            <img src="/img/info/vtb-logo.png" loading="lazy" width="91" height="33" class="mb-4" alt="" />
            <div class="text-[20px] font-medium">«Экспресс-кредит» от Банка ВТБ (Беларусь)</div>
            <p class="my-4">Потребительский кредит</p>
            <div class="flex flex-col gap-2">
              <div class="flex items-center gap-3"><PercentOutlinedIcon />Ставка: <strong>19.9%</strong></div>
              <div class="flex items-center gap-3"><CoinsIcon />Сумма от <strong>50 Br</strong></div>
              <div class="flex items-center gap-3"><CalcOutlinedIcon />Срок кредитования: <strong>от 3 до 60 мес</strong></div>
            </div>
            <NuxtLink to="https://myfin.by/bank/bank-vtb/kredity/490-yekspress-kredit" target="blank" rel="nofollow"
              ><button class="btn mt-10"><CalcIcon /> Калькулятор рассрочки</button></NuxtLink
            >
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
<script setup>
definePageMeta({
  layout: 'default',
});

const meta = {
  title: 'Оплата заказов | Интернет-магазин Iven',
  description: 'Оплата заказов на нашем сайте возможна наличными при получении, с помощью системы Расчет“ ЕРИП, webmoney и по безналу.',
};

useSeoMeta({
  title: () => meta.title,
  ogTitle: () => meta.title,
  description: () => meta.description,
  ogDescription: () => meta.description,
});
</script>
