<template>
  <main class="text-sm text">
    <div class="box">
      <div class="container">
        <div class="breadcrumbs"><NuxtLink to="/" class="">Главная </NuxtLink><span>Доставка</span></div>

        <div class="flex flex-col xl:flex-row justify-between gap-10">
          <div class="flex-1 text-wrap">
            <h1>Пункт выдачи заказов в Минске</h1>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-[550px]">
              <div class="sm:max-w-[250px]">
                <div class="with-icon">
                  <MapPinIcon />
                  <a href="#" class="underline underline-offset-4"> {{ $state.config.address }}</a>
                </div>

                <div class="with-icon">
                  <PhoneIcon />
                  <a v-for="phone in $state.config.phones?.split(' ')" :key="phone" :href="`tel:${phone}`">
                    {{ formatPhoneNumber(phone) }}
                  </a>
                </div>
                <div class="with-icon">
                  <MessageIcon />
                  <a :href="`mailto:${$state.config.email}`" class="underline underline-offset-4">{{ $state.config.email }}</a>
                </div>
              </div>
              <div>
                <div v-html="$state.config.timetable" class="xl:-mr-8"></div>
              </div>
            </div>
          </div>
          <div class="bg-blue/10 rounded flex-1 text-wrap py-10 px-5 xl:px-10 xl:-mt-10">
            <div class="h2">Дополнительные услуги</div>

            <p>По предварительному согласованию возможна настройка и установка оборудования специалистами сервисного центра компании ООО «Компьютеры Айвен».</p>

            <p>
              Вы сможете заказать доставку товара
              <NuxtLink :to="Object.keys(items).length > 0 ? '/cart' : '/catalog'" class="underline underline-offset-4">при оформлении заказа</NuxtLink>.
            </p>
          </div>
        </div>
      </div>
    </div>

    <Map class="box" />
    <div class="box">
      <div class="container">
        <div class="flex flex-col xl:flex-row justify-between gap-10">
          <div class="flex-1 text-wrap">
            <h2>Доставка в пределах МКАД</h2>
            <p>Бесплатно при стоимости товара от 220 Br</p>
            <p>При стоимости товара до 220 Br, стоимость доставки — 6 Br</p>
            <p>
              <span class="text-[#F54D4D]">Сроки и стоимость доставки</span> в ближайшие к Минску населенные пункты и районы (Сокол, Боровляны,Колодищи, Валерьяново и т.д.)
              <span class="text-[#F54D4D]">уточнит менеджер при подтверждении заказа.</span>
            </p>
          </div>
          <div class="bg-[#FF8484]/10 rounded flex-1 text-wrap py-10 px-5 xl:px-10">
            <div class="h2 text-[#F54D4D]">Обратите внимание!</div>
            <p>
              Доставка товаров по территории Республики Беларусь осуществляется в течении 2-ух дней, стоимость доставки от 15 до 25 рублей, в зависимости от габаритов товара.
              Важно! Если товар находится не на внутреннем складе нашей компании, то сроки доставки до Минска указываются в карточке товара, доставка по Беларуси в течении 2-ух
              дней, после прибытия на склад компании.
            </p>
            <p>
              Курьер службы доставки не является консультантом ООО «Компьютеры Айвен». Пожалуйста, все вопросы по товару обсуждайте при оформлении заказа с менеджером ООО
              «Компьютеры Айвен».
            </p>

            <p>Курьерская служба доставляет товар ДО подъезда.</p>
                
          </div>
        </div>
      </div>
    </div>
    <div class="box">
      <div class="container">
        <div class="flex flex-col xl:flex-row justify-between gap-10">
          <div class="flex-1 text-wrap">
            <h2>Доставка по регионам Беларуси</h2>
            <p>Стоимость доставки — от 12 Br</p>
            <p>
              Доставка в регионы — любые населённые пункты Республики Беларусь, осуществляется курьерской службой. Стоимость  может меняться в зависимости от габаритов товара и
              местоположения населенного пункта.
            </p>

            <p class="text-[#F54D4D]">Сроки и стоимость доставки уточнит менеджер при подтверждении заказа.</p>
             
            <p>Время доставки сообщает сотрудник курьерской службы предварительно, в день доставки.</p>
                
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
<script setup>
const items = useCookie('items');
items.value = items.value || {};
import { useAppStore } from '~/stores/app';
const { $state } = useAppStore();
definePageMeta({
  layout: 'default',
});

const meta = {
  title: 'Доставка | Интернет-магазин Iven',
  description: 'Узнать стоимость, сроки доставки и адрес пункта выдачи интернет-магазина Iven.',
};

useSeoMeta({
  title: () => meta.title,
  ogTitle: () => meta.title,
  description: () => meta.description,
  ogDescription: () => meta.description,
});
</script>
