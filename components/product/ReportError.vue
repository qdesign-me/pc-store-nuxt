<template>
  <div class="text-blue cursor-pointer underline underline-offset-4 mt-6" @click="modalVisible = true">Сообщить об ошибке в описании</div>

  <Modal :visible="modalVisible" @close="modalVisible = false" title="Сообщить об ошибке">
    <Form :model="model" :onFinish="onFinish">
      <FormItem name="message" :rules="[{ required: true }]">
        <textarea name="message" placeholder="Укажите неточность в описании" class="input h-40" v-model="model.message"></textarea>
      </FormItem>
      <button class="btn">Отправить</button>
    </Form>
  </Modal>
</template>

<script setup lang="ts">
const router = useRouter();
const modalVisible = ref(false);
const DEFAULT_DATA = {
  action: 'correct',
  subject: 'Ошибка в описании товара',
  page: `https://i-ven.by${router.currentRoute.value.fullPath}`,
  message: '',
};

const model = useState(() => clone(DEFAULT_DATA));

const onFinish = async (event) => {
  message.info('Ваше сообщение отправлено');
  const body = clone(model.value);
  useFetch('/api/email', {
    method: 'POST',
    body,
  });
  Object.assign(model.value, clone(DEFAULT_DATA));

  modalVisible.value = false;
};
</script>
