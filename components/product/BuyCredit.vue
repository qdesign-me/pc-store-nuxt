<template>
  <Modal :visible="!!modalVisible" @close="handleClose" title="Варианты покупки в рассрочку и кредит" :width="909">
    <div class="flex flex-wrap gap-4 mb-10 items-center">
      <div class="flex gap-4">
        <div>
          <ProductThumbs :data="{ img: props.data.img.split('|')?.[0] }" size="63" />
        </div>
        <div class="font-light">
          <div class="text-[12px] text-[#3F3F3F] mb-2">Код товара: {{ props.data.productID }}</div>
          <div class="text-sm text-[#000000] underline underline-offset-2">{{ props.data.name }}</div>
        </div>
      </div>
      <div class="text-[24px] text-[#000000] ml-auto">
        {{ price(props.data.Price) }}
      </div>
    </div>
    <div class="flex flex-col gap-1" v-if="modalVisible === 'cards'">
      <div class="text-[12px] flex border-t">
        <div class="text-left font-normal flex-1 py-3 px-2">Предложение</div>
        <div class="text-center font-normal w-[200px] py-3 px-2">Первый платёж</div>
        <div class="text-center font-normal w-[300px] py-3 px-2">Ежемесячный платёж</div>
        <div></div>
      </div>
      <div
        v-for="card in cards"
        :key="card.title"
        class="border border-solid flex items-center cursor-pointer hover:shadow-md"
        :class="selected && selected.card && selected.card.title !== card.title ? '!hidden' : ''"
        @click="
          selected = {
            card,
          }
        "
      >
        <div class="py-1 px-2 flex items-center gap-2 flex-1"><img :src="card.img" /> В рассрочку картой «{{ card.title }}»</div>
        <div class="py-1 px-2 text-center w-[200px]">0 бел.руб.</div>
        <div class="py-1 px-2 text-center w-[300px]">
          <div>≈ {{ calcFullPricePeriod(props.data.Price, card.percent, card.period) }} руб x {{ card.period }} мес</div>
          <div>итоговая сумма = {{ calcFullPrice(props.data.Price, card.percent) }} бел.руб.</div>
        </div>
        <div class="py-1 px-2">
          <button v-if="selected?.card?.title === card.title" @click.stop="selected = null"><DeleteIcon class="h-4" /></button>
        </div>
      </div>
    </div>

    <div class="flex flex-col gap-1" v-if="modalVisible === 'bank'">
      <div class="text-[12px] flex border-t">
        <div class="text-left font-normal flex-1 py-3 px-2">Предложение</div>
        <div class="text-center font-normal w-[200px] py-3 px-2">Кредит</div>
        <div class="text-center font-normal w-[300px] py-3 px-2">Ежемесячный платёж</div>
      </div>
      <template v-for="(bank, index) in banks" :key="index">
        <div
          v-for="variant in bank.variants"
          :key="variant.title"
          class="border border-solid flex items-center cursor-pointer hover:shadow-md"
          :class="selected && selected.variant && selected.variant.title !== variant.title ? '!hidden' : ''"
          @click="
            selected = {
              bank,
              variant,
            }
          "
        >
          <div class="py-1 px-2 flex items-center gap-2 flex-1">
            <img :src="bank.img" class="h-5" />
          </div>
          <div class="py-1 px-2 text-center w-[200px]">{{ variant.title }}</div>
          <div class="py-1 px-2 text-center w-[300px]">
            <div>≈ {{ calcFullPricePeriod(props.data.Price, variant.percent, variant.period) }} руб x {{ variant.period }} мес</div>
            <div>итоговая сумма = {{ calcFullPrice(props.data.Price, variant.percent) }} бел.руб.</div>
          </div>
          <div class="py-1 px-2">
            <button v-if="selected?.bank?.title === bank.title && selected.variant.title === variant.title" @click.stop="selected = null"><DeleteIcon class="h-4" /></button>
          </div>
        </div>
      </template>
    </div>
    <template v-if="selected">
      <div class="text-[#000] font-semibold text-center mt-6">Оставьте свои контактные данные.</div>
      <div class="text-[#F54D4D] font-semibold text-center text-sm py-5">Менеджер IVEN свяжется с Вами в ближайшее время.</div>
      <Form :model="model" :onFinish="onFinish" class="mx-auto max-w-[343px] pb-8">
        <FormItem name="name">
          <input name="name" type="text" class="input" placeholder="Укажите ваше имя" v-model="model.name" />
        </FormItem>

        <div class="text-[#000] font-semibold text-center text-sm pb-5 -mt-2">Выберите удобный для Вас способ связи:</div>

        <div class="relative pl-[40px]">
          <PhoneIcon class="text-[#00B3D7] absolute left-0 top-[10px]" />
          <FormItem name="phone" :rules="[{ required: true }]">
            <input name="phone" type="tel" class="input" placeholder="+375 (__) ___-__-__" v-model="model.phone" v-maska data-maska="+375 (##) ###-##-##" />
          </FormItem>
        </div>
        <div class="relative pl-[40px]">
          <MessageIcon class="text-[#00B3D7] absolute left-0 top-[10px]" />
          <FormItem name="email" :rules="[{ email: true }]">
            <input name="email" type="email" class="input" placeholder="E-mail" v-model="model.email" />
          </FormItem>
        </div>

        <button class="btn is-large w-full" :disabled="disabled"><QuestionIcon /> Получить консультацию и заказать</button>

        <div className="mx-auto underline underline-offset-2 cursor-pointer text-center mt-12 text-blue" @click="handleClose">Вернуться к выбору предложений</div>
      </Form>
    </template>
  </Modal>
  <p>
    <a class="underline underline-offset-2" @click="modalVisible = 'cards'">При оплате картой рассрочки, от </a> <strong>{{ getCreditByCard(props.data.Price) }}</strong>
    <span class="text-[#444]"> бел. рублей в месяц</span>
  </p>

  <p>
    <a class="underline underline-offset-2" @click="modalVisible = 'bank'">При покупке в кредит, ежемесячный платёж </a><br />
    <strong>{{ getCreditByBank(props.data.Price).monthly }}</strong>
    <span class="text-[#444]">
      бел. рублей в течение <strong>{{ getCreditByBank(props.data.Price).period }}</strong> месяцев</span
    >
  </p>
</template>
<script setup lang="ts">
const router = useRouter();
const disabled = ref(false);
const modalVisible = ref<boolean | string>(false);
const selected = ref<any>(null);
const props = defineProps(['data']);
const DEFAULT_DATA = {
  action: 'credit',
  subject: 'Варианты покупки в рассрочку и кредит',
  page: `https://i-ven.by${router.currentRoute.value.fullPath}`,
  name: '',
  email: '',
  phone: '',
  telegram: '',
  viber: '',
};

const model = useState(() => clone(DEFAULT_DATA));
import { cards, banks } from '@/constants/credit';

const onFinish = async () => {
  const payment = selected.value.bank ? 'Кредит' : 'Рассрочка';
  const paymentDetails = selected.value.bank
    ? `${selected.value.bank.title} ${selected.value.variant.title}`
    : `${selected.value.card.title} на ${selected.value.card.period} мес.`;
  const total = calcFullPrice(props.data.Price, selected.value.bank ? selected.value.variant.percent : selected.value.card.percent);
  const payload = {
    info: {
      delivery: 'Самовывоз',
      payment,
      paymentDetails,
      name: model.value.name,
      phone: model.value.phone,
      email: model.value.email,
    },
    cart: {
      total: {
        qty: 1,
        price: total,
      },
      data: [
        {
          img: props.data.img,
          productID: props.data.productID,
          name: props.data.name,
          warranty: props.data.warranty,
          model: props.data.model,
          Price: total,
          PriceSale: props.data.PriceSale,
          uri: props.data.uri,
          is_auction: props.data.is_auction,
          is_new: props.data.is_new,
          qty: 1,
          itemTotal: total,
        },
      ],
    },
    total: {
      qty: 1,
      price: total,
      delivery: 'Самовывоз',
      deliveryPrice: 0,
      total: total,
    },
  };

  const res: Record<string, any> = await $fetch('/api/orders/new', {
    method: 'POST',
    body: payload,
  });

  Object.assign(model.value, clone(DEFAULT_DATA));

  router.push(`/thankyou?orderID=${res.orderID}`);
  disabled.value = false;
  selected.value = null;
};

const getCreditByBank = (value) => {
  let min = null;
  banks.forEach((bank) => {
    bank.variants.forEach((variant) => {
      const total = ((value * (100 + variant.percent)) / 100).toFixed(2);
      const monthly = (total / variant.period).toFixed(2);

      if (!min || +monthly < +min.monthly) min = { monthly, period: variant.period };
    });
  });
  return min;
};
const getCreditByCard = (value) => {
  let min = -1;
  cards.forEach((card) => {
    const total = ((value * (100 + card.percent)) / 100).toFixed(2);
    const monthly = (total / card.period).toFixed(2);
    if (min < 0 || +monthly < +min) min = monthly;
  });
  return min;
};

const calcFullPrice = (price, percent) => {
  return ((price * (100 + percent)) / 100).toFixed(2);
};
const calcFullPricePeriod = (price, percent, period) => {
  return (calcFullPrice(price, percent) / period).toFixed(2);
};
const handleClose = () => {
  modalVisible.value = false;
  selected.value = null;
};
</script>
