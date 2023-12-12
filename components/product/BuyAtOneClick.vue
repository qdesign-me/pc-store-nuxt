<template>
  <button class="btn mb-4 is-large" @click="modalVisible = true"><WizardIcon /> Купить в один клик</button>

  <Modal :visible="modalVisible" @close="handleClose" title="Купить в один клик" :width="909">
    <div v-if="showThanks" class="text-[#000000] font-semibold mb-14 text-center">Ваша заявка на покупку товара принята. Менеджер IVEN свяжется с Вами в рабочее время.</div>
    <slot />
    <template v-if="!showThanks">
      <div class="text-[#000] font-semibold text-center">Оставьте свой номер телефона или контакт в мессенджере.</div>
      <div class="text-[#F54D4D] font-semibold text-center text-sm py-5">Менеджер IVEN свяжется с Вами в ближайшее время.</div>
      <Form :model="model" :onFinish="onFinish" class="mx-auto max-w-[343px] pb-8">
        <FormItem name="name" :rules="[{ required: true }]">
          <input name="name" type="text" class="input" placeholder="Укажите ваше имя" v-model="model.name" />
        </FormItem>

        <div class="text-[#000] font-semibold text-center text-sm pb-5 -mt-2">Выберите удобный для Вас способ связи:</div>

        <div class="relative pl-[40px]">
          <PhoneIcon class="text-[#00B3D7] absolute left-0 top-[10px]" />
          <FormItem name="phone">
            <input name="phone" type="tel" class="input" placeholder="+375 (__) ___-__-__" v-model="model.phone" v-maska data-maska="+375 (##) ###-##-##" />
          </FormItem>
        </div>
        <div class="relative pl-[40px]">
          <MessageIcon class="text-[#00B3D7] absolute left-0 top-[12px]" />
          <FormItem name="email" :rules="[{ email: true }]">
            <input name="email" type="email" class="input" placeholder="E-mail" v-model="model.email" />
          </FormItem>
        </div>
        <div class="relative pl-[40px]">
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
        </div>

        <button class="btn is-large w-full"><MessagePlusIcon /> Отправить заявку</button>
      </Form>
    </template>
  </Modal>
</template>

<script setup lang="ts">
const showThanks = ref(false);
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
  const body = clone(model.value);
  useFetch('/api/email', {
    method: 'POST',
    body,
  });
  Object.assign(model.value, clone(DEFAULT_DATA));
  showThanks.value = true;
};
const handleClose = () => {
  modalVisible.value = false;
  showThanks.value = false;
};
</script>
