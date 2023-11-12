<template>
  <button class="btn mt-4 mb-6 xl:mb-12 is-large" @click="modalVisible = true"><CallbackIcon /> Заказать обратный звонок</button>
  <Modal :visible="modalVisible" @close="modalVisible = false" title="Заказать обратный звонок">
    <Form :model="model" :onFinish="onFinish">
      <FormItem name="name" :rules="[{ required: true }]">
        <input name="name" type="text" class="input" placeholder="Укажите ваше имя и фамилию" v-model="model.name" />
      </FormItem>
      <FormItem name="phone" :rules="[{ required: true }]">
        <input name="phone" type="tel" class="input" placeholder="+375 (__) ___-__-__" v-model="model.phone" v-maska data-maska="+375 (##) ###-##-##" />
      </FormItem>
      <FormItem name="email" :rules="[{ email: true }]">
        <input name="email" type="email" class="input" placeholder="Укажите ваш E-mail" v-model="model.email" />
      </FormItem>
      <FormItem name="message" :rules="[{ required: true }]">
        <textarea name="message" placeholder="Комментарий к заказу" class="input h-40" v-model="model.message"></textarea>
      </FormItem>
      <button class="btn is-large"><CallbackIcon /> Заказать обратный звонок</button>
    </Form>
  </Modal>
</template>

<script setup lang="ts">
const { show: showThanks } = useThanks();
const router = useRouter();
const modalVisible = ref(false);
const DEFAULT_DATA = {
  action: 'callmeback',
  subject: 'Заказать обратный звонок',
  page: `https://i-ven.by${router.currentRoute.value.fullPath}`,
  name: '',
  email: '',
  phone: '',
  message: '',
};

const model = useState(() => clone(DEFAULT_DATA));

const onFinish = async (event) => {
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
