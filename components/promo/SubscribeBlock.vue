<template>
  <div class="mt-4 lg:mt-6 flex flex-wrap gap-6">
    <div class="flex justify-around w-10 flex-1 links">
      <a href="#" target="_blank">
        <div class="icon icon-viber"></div>
      </a>
      <a href="#" target="_blank">
        <div class="icon icon-telegram"></div>
      </a>
      <a href="#" target="_blank">
        <div class="icon icon-email"></div>
      </a>
    </div>
    <div class="w-10 flex-1">
      <Form :model="model" class="flex flex-col gap-2 items-start" :onFinish="onFinish">
        <input type="text" class="input" name="contact" placeholder="Укажите ваш контакт" v-model="model.contact" />
        <button class="btn w-full" type="submit" :disabled="model.contact.length === 0">Подписаться на акции</button>
      </Form>
    </div>
  </div>
</template>

<script setup>
const DEFAULT_DATA = {
  action: 'subscribe',
  subject: 'Подписка на новости',
  contact: '',
};
const model = useState(() => DEFAULT_DATA);
const onFinish = async (event) => {
  console.log('on finish 1');
  message.info('Ваше сообщение отправлено');

  useFetch('/api/email', {
    method: 'POST',
    body: model.value,
  });

  Object.assign(model.value, clone(DEFAULT_DATA));
  return false;
};
</script>
