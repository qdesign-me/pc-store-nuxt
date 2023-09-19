<template>
  <template v-if="$state.config">
    <div class="box-promo" :class="{ '!bg-white !pt-0': $route.href === '/contacts' }">
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
              <div class="flex gap-6 mt-10 social-links"><SocialLinks :social="$state.config.social" /></div>
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
                  <img src="/img/info/belarusb-logo.png" loading="lazy" width="175" height="25" alt="" />
                  <img src="/img/info/vtb-logo.png" loading="lazy" width="70" height="25" alt="" />
                </div>
                <NuxtLink to="/payment#credit">
                  <button class="btn xl:mt-8 w-full sm:w-auto">
                    <CalcIcon />
                    Калькулятор рассрочки
                  </button>
                </NuxtLink>
              </div>
            </div>
          </div>
          <div class="bg-[#cee7ec] p-6 rounded hidden xl:block pt-0">
            <div class="title mt-10">Хочу быть в курсе акций и новинок!</div>
            <Form :model="model" class="flex flex-col" :onFinish="onFinish">
              <FormItem name="email">
                <input name="email" class="input" placeholder="Укажите ваш E-mail" type="email" v-model="model.email" />
              </FormItem>
              <FormItem name="viber">
                <input name="viber" class="input" placeholder="Либо Viber" type="text" v-model="model.viber" />
              </FormItem>
              <FormItem name="telegram">
                <input name="telegram" class="input" placeholder="Либо Telegram" type="text" v-model="model.telegram" />
              </FormItem>
              <button type="submit" class="btn w-full mt-1" :disabled="!formValid">
                <span>Подписаться <span class="hidden xl:inline">на акции</span></span>
              </button>
            </Form>
          </div>
        </div>
      </div>
    </div>

    <Map v-if="$route.href === '/contacts'" />

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
              <a href="/about">О компании</a><a href="/contacts">Контакты</a><a v-if="false" href="/news">Новости</a><a href="/delivery">Доставка</a><a href="/payment">Оплата</a
              ><a href="/warranty">Гарантия</a>
            </div>
          </div>
          <div class="flex flex-col gap-4 -order-10 xl:order-1">
            <NuxtLink to="/public-offer">Договор публичной оферты</NuxtLink>
            <NuxtLink to="/privacy-and-terms">Политика защиты персональных данных</NuxtLink>
            <CompanyLinks />
          </div>
        </div>
      </div>
    </footer>
  </template>
</template>

<script setup>
const DEFAULT_DATA = {
  action: 'subscribe-details',
  subject: 'Подписка на новости',
  email: '',
  viber: '',
  telegram: '',
};
const model = useState(() => DEFAULT_DATA);
const onFinish = async () => {
  console.log('on finish 2');
  message.info('Ваше сообщение отправлено');

  useFetch('/api/email', {
    method: 'POST',
    body: model.value,
  });

  Object.assign(model.value, clone(DEFAULT_DATA));
  return false;
};
import { useAppStore } from '~/stores/app';
const { $state } = useAppStore();

const formValid = computed(() => model.value.email.length || model.value.viber.length || model.value.telegram);
</script>
