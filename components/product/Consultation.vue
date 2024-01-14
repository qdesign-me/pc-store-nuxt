<template>
  <div @click="modalVisible = true" class="w-full"><slot /></div>

  <Modal :visible="modalVisible" @close="modalVisible = false" :title="props.title">
    <div class="text-[#000] font-semibold text-center">Оставьте свой номер телефона или контакт в мессенджере.</div>
    <div class="text-[#F54D4D] font-semibold text-center text-sm py-5">Мы обязательно с Вами свяжемся!</div>
    <Form :model="model" :onFinish="onFinish">
      <FormItem name="name">
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
      <FormItem name="message" :rules="[{ required: true }]">
        <textarea name="message" placeholder="Оставьте комментарий: по какому вопросу Вас нужно проконсультировать?" class="input h-40" v-model="model.message"></textarea>
      </FormItem>

      <button class="btn is-large w-full"><QuestionIcon /> Заказать консультацию</button>
    </Form>
  </Modal>
</template>

<script setup lang="ts">
import QuestionIcon from '../icons/QuestionIcon.vue';
const { show: showThanks } = useThanks();
const router = useRouter();
const props = defineProps(['title']);
const modalVisible = ref(false);
const DEFAULT_DATA = {
  action: 'consultation',
  subject: 'Бесплатная консультация',
  page: `https://i-ven.by${router.currentRoute.value.fullPath}`,
  name: '',
  email: '',
  phone: '',
  telegram: '',
  viber: '',
  message: '',
};

const model = useState(() => clone(DEFAULT_DATA));

const onFinish = async () => {
  const body = clone(model.value);
  useFetch('/api/email', {
    method: 'POST',
    body,
  });
  Object.assign(model.value, clone(DEFAULT_DATA));

  modalVisible.value = false;
  showThanks();
};
</script>
