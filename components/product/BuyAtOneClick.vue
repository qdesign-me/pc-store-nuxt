<template>
  <button class="btn mb-4 is-large" @click="modalVisible = true"><WizardIcon /> Купить в один клик</button>

  <Modal :visible="modalVisible" @close="handleClose" title="Купить в один клик" :width="909">
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

    <div class="text-[#000] font-semibold text-center">Оставьте свои контактные данные.</div>
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
        <MessageIcon class="text-[#00B3D7] absolute left-0 top-[12px]" />
        <FormItem name="email" :rules="[{ email: true }]">
          <input name="email" type="email" class="input" placeholder="E-mail" v-model="model.email" />
        </FormItem>
      </div>
      <!-- <div class="relative pl-[40px]">
        <span class="icon icon-telegram text-[#00B3D7] absolute left-0 top-[10px]" />
        <FormItem name="telegram">
          <input name="telegram" class="input" placeholder="@" v-model="model.telegram" />
        </FormItem>
      </div>
      <div class="relative pl-[40px]">
        <span class="icon icon-viber text-[#00B3D7] absolute left-0 top-[10px]" />
        <FormItem name="viber">
          <input name="viber" type="tel" class="input" placeholder="+375 (__) ___-__-__" v-model="model.viber" v-maska data-maska="+375 (##) ###-##-##" />
        </FormItem>
      </div> -->

      <button class="btn is-large w-full" :disabled="disabled"><MessagePlusIcon /> Отправить заявку</button>
    </Form>
  </Modal>
</template>

<script setup lang="ts">
const disabled = ref(false);
const props = defineProps(['data']);
const router = useRouter();
const modalVisible = ref(false);
const DEFAULT_DATA = {
  action: 'consultation',
  subject: 'Купить в один клик',
  page: `https://i-ven.by${router.currentRoute.value.fullPath}`,
  name: '',
  email: '',
  phone: '',
  telegram: '',
  viber: '',
};

const model = useState(() => clone(DEFAULT_DATA));

const onFinish = async () => {
  disabled.value = true;

  const payload = {
    info: {
      delivery: 'Самовывоз',
      payment: 'Наличными',
      name: model.value.name,
      phone: model.value.phone,
      email: model.value.email,
    },
    cart: {
      total: {
        qty: 1,
        price: props.data.Price,
      },
      data: [
        {
          img: props.data.img,
          productID: props.data.productID,
          name: props.data.name,
          warranty: props.data.warranty,
          model: props.data.model,
          Price: props.data.Price,
          PriceSale: props.data.PriceSale,
          uri: props.data.uri,
          is_auction: props.data.is_auction,
          is_new: props.data.is_new,
          qty: 1,
          itemTotal: props.data.Price,
        },
      ],
    },
    total: {
      qty: 1,
      price: props.data.Price,
      delivery: 'Самовывоз',
      deliveryPrice: 0,
      total: props.data.Price,
    },
  };
  const res: Record<string, any> = await $fetch('/api/orders/new', {
    method: 'POST',
    body: payload,
  });

  Object.assign(model.value, clone(DEFAULT_DATA));

  router.push(`/thankyou?orderID=${res.orderID}`);
  disabled.value = false;
};
const handleClose = () => {
  modalVisible.value = false;
};
</script>
