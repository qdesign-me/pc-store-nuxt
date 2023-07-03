<template>
  <template v-if="$state.config">
    <div class="box-promo" :class="{ '!bg-white !pt-0': route.href === '/contacts' }">
      <div class="container">
        <div class="grid gap-5 grid-cols-4 xl:grid-cols-5 xl:gap-2.5">
          <div class="col-span-4 grid grid-cols-2 gap-x-5 xl:grid-cols-4 xl:gap-x-14">
            <div class="col-span-2 sm:col-span-1">
              <div class="title mt-10">Наши контакты:</div>
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

              <div class="title mt-10">Режим работы:</div>
              <div v-html="$state.config.timetable" class="xl:-mr-8"></div>
            </div>
            <div class="col-span-2 sm:col-span-1">
              <div class="title mt-10">Гарантийное обслуживание:</div>
              <div class="with-icon">
                <MapPinIcon />
                <a href="#" class="underline underline-offset-4">{{ $state.config.address }}</a>
              </div>
              <div class="with-icon xl:min-h-[65px]">
                <PhoneIcon />
                <a v-for="phone in $state.config['service.phone']?.split(' ')" :key="phone" :href="`tel:${phone}`" class="translate-y-1">
                  {{ formatPhoneNumber(phone) }}
                </a>
              </div>
              <div class="with-icon">
                <MessageIcon />
                <a :href="`mailto:${$state.config.email}`" class="underline underline-offset-4">{{ $state.config.email }}</a>
              </div>
              <div class="flex gap-6 mt-10 social-links" :class="{ '!top-[-5px]': route.href === '/contacts' }"><SocialLinks :social="$state.config.social" /></div>
            </div>

            <div class="col-span-2">
              <div class="title mt-10">Платежные системы:</div>
              <div class="flex flex-col gap-6 items-start">
                <div class="flex gap-2 card-logos">
                  <img src="/img/info/vtb.png" loading="lazy" width="64" height="40" alt="" />
                  <img src="/img/info/halva.png" loading="lazy" width="64" height="40" alt="" />
                  <img src="/img/info/magnit.png" loading="lazy" width="64" height="40" alt="" /><img src="/img/info/erip.png" loading="lazy" width="125" height="40" alt="" />
                </div>
                <div class="xl:my-6">Наличный расчет и расчет банковской картой при получении. Возможно оформление кредита в банках-партнёрах:</div>
                <div class="flex flex-wrap gap-2 payment-logos">
                  <img src="/img/info/belapb-logo.png" loading="lazy" width="175" height="25" alt="" /><img
                    src="/img/info/belarusb-logo.png"
                    loading="lazy"
                    width="180"
                    height="25"
                    alt=""
                  />
                </div>
                <button class="btn xl:mt-8 w-full sm:w-auto">
                  <CalcIcon />
                  Калькулятор рассрочки
                </button>
              </div>
            </div>
          </div>
          <div class="bg-[#cee7ec] p-6 rounded hidden xl:block pt-0">
            <div class="title mt-10">Хочу быть в курсе акций и новинок!</div>
            <form action="#" class="flex flex-col gap-6">
              <input class="input mt-4" placeholder="Укажите ваш E-mail" type="email" /><input class="input" placeholder="Либо Viber" type="text" /><input
                class="input mb-4"
                placeholder="Либо Telegram"
                type="text"
              /><button type="submit" class="btn w-full">
                <span>Подписаться <span class="hidden xl:inline">на акции</span></span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>

    <iframe
      v-if="route.href === '/contacts'"
      :src="`https://www.google.com/maps/embed?pb=${$state.config.map}`"
      width="100%"
      height="500"
      style="border: 0"
      allowfullscreen=""
      loading="lazy"
      referrerpolicy="no-referrer-when-downgrade"
    ></iframe>

    <footer>
      <div class="container">
        <div class="grid grid-cols-1 gap-12 sm:grid-cols-2 sm:gap-5 xl:grid-cols-5 xl:gap-2.5">
          <div class="flex flex-col gap-4 xl:col-span-2">
            <p v-html="$state.config['footer.line1']" />
            <p v-html="$state.config['footer.line2']" />
            <p v-html="$state.config['footer.line3']" />
            <div class="flex gap-2">© 2023 <span class="underline underline-offset-4">iven.by</span></div>
          </div>
          <div class="col-span-2 hidden xl:block">
            <div class="main-links -mt-2">
              <a href="/about">О компании</a><a href="/contacts">Контакты</a><a href="/news">Новости</a><a href="/delivery">Доставка</a><a href="/payment">Оплата</a
              ><a href="/warranty">Гарантия</a>
            </div>
          </div>
          <div class="flex flex-col gap-4 -order-10 xl:order-1">
            <a href="#">Договор публичной оферты</a><a href="#">Политика обработки персональных данных</a><a href="#">Свидетельство о регистрации</a
            ><a href="#">Сертификат соответствия на ПК</a><a href="#">Кассовый чек</a><a href="#">Гарантийный талон</a>
          </div>
        </div>
      </div>
    </footer>
  </template>
</template>

<script setup>
const route = useRoute();
import { useAppStore } from '~/stores/app';
const { $state } = useAppStore();
</script>
