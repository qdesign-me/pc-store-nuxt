<template>
  <div class="box-promo" v-if="$state.config">
    <div class="container">
      <div class="grid grid-cols-5 gap-2.5">
        <div class="grid grid-cols-4 gap-14 col-span-4">
          <div>
            <div class="title">Наш адрес:</div>
            <a href="#" class="underline underline-offset-4">{{ $state.config.address }}</a>
          </div>
          <div>
            <div class="title">Гарантийное обслуживание:</div>
            <a href="#" class="underline underline-offset-4">{{ $state.config.address }}</a>
          </div>
          <div class="col-span-2">
            <div class="title">Режим работы:</div>
            <div v-html="$state.config.timetable"></div>
          </div>
          <div>
            <div class="title">Наши контакты:</div>

            <a v-for="phone in $state.config.phones?.split(' ')" :key="phone" :href="`tel:${phone}`">
              {{ formatPhoneNumber(phone) }}
            </a>
          </div>
          <div>
            <div class="title">Контакты:</div>
            <a v-for="phone in $state.config['service.phone']?.split(' ')" :key="phone" :href="`tel:${phone}`">
              {{ formatPhoneNumber(phone) }}
            </a>
            <a :href="`mailto:${$state.config.email}`" class="underline underline-offset-4">{{ $state.config.email }}</a>
          </div>
          <div class="col-span-2">
            <div class="title">Платежные системы</div>
            <div class="flex flex-col gap-6 items-start">
              <div class="flex gap-2">
                <img src="/img/info/vtb.png" loading="lazy" width="64" height="40" alt="" />
                <img src="/img/info/halva.png" loading="lazy" width="64" height="40" alt="" />
                <img src="/img/info/magnit.png" loading="lazy" width="64" height="40" alt="" /><img src="/img/info/erip.png" loading="lazy" width="125" height="40" alt="" />
              </div>
              <div>Наличный расчет и расчет банковской картой при получении. Возможно оформление кредита в банках-партнёрах:</div>
              <div class="flex flex-wrap gap-2 gap-x-0">
                <img src="/img/info/belapb-logo.png" loading="lazy" width="175" height="25" alt="" /><img
                  src="/img/info/belarusb-logo.png"
                  loading="lazy"
                  width="180"
                  height="25"
                  alt=""
                />
              </div>
            </div>
          </div>
          <div class="col-span-2">
            <div class="flex gap-6">
              <SocialLinks :social="$state.config.social" />
            </div>
          </div>
          <div class="col-span-2">
            <button class="btn">
              <CalcIcon />
              >Калькулятор рассрочки
            </button>
          </div>
        </div>
        <div class="bg-[#cee7ec] p-6 rounded -mt-6">
          <div class="title">Хочу быть в курсе акций и новинок!</div>
          <form action="#" class="flex flex-col gap-6">
            <input class="input mt-4" placeholder="Укажите ваш E-mail" type="email" /><input class="input" placeholder="Либо Viber" type="text" /><input
              class="input mb-4"
              placeholder="Либо Telegram"
              type="text"
            /><button type="submit" class="btn w-full">Подписаться на акции</button>
          </form>
        </div>
      </div>
    </div>
  </div>
  <footer v-if="$state.config">
    <div class="container">
      <div class="grid grid-cols-5 gap-2.5">
        <div class="col-span-2 flex flex-col gap-4">
          <p v-html="$state.config['footer.line1']" />
          <p v-html="$state.config['footer.line2']" />
          <p v-html="$state.config['footer.line3']" />

          <div class="flex gap-2">© 2023 <span class="underline underline-offset-4">iven.by</span></div>
        </div>
        <div class="col-span-2">
          <div class="main-links -mt-2">
            <a class="px-4 py-2" href="/o-kompanii">О компании</a><a class="px-4 py-2" href="/kontakty">Контакты</a><a class="px-4 py-2" href="/novosti">Новости</a
            ><a class="px-4 py-2" href="/dostavka">Доставка</a><a class="px-4 py-2" href="/oplata">Оплата</a><a class="px-4 py-2" href="/garantiya">Гарантия</a>
          </div>
        </div>
        <div class="flex flex-col gap-4">
          <a href="#">Договор публичной оферты</a><a href="#">Политика обработки персональных данных</a><a href="#">Свидетельство о регистрации</a
          ><a href="#">Сертификат соответствия на ПК</a><a href="#">Кассовый чек</a><a href="#">Гарантийный талон</a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
console.log('app footer setup');
import { useAppStore } from '~/stores/app';
const { $state } = useAppStore();
</script>
