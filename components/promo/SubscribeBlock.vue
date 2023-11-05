<template>
  <div class="flex flex-wrap gap-6">
    <div class="w-10 flex-1">
      <Form :model="model" class="flex flex-col gap-2 items-start" :onFinish="onFinish">
        <FormItem name="email" :rules="[{ email: true }]" class="mb-0 w-full">
          <input type="text" class="input w-full" name="email" placeholder="Укажите Ваш Email" v-model="model.email" />
        </FormItem>
        <button class="btn w-full mt-2.5" type="submit" :disabled="!formValid">Подписаться на акции</button>
      </Form>
    </div>
  </div>
</template>

<script setup>
const DEFAULT_DATA = {
  action: 'subscribe',
  email: '',
  subject: 'Подписка на новости',
};
const formValid = computed(() => model.value.email.length);

const model = useState(() => clone(DEFAULT_DATA));
const onFinish = async () => {
  message.info('Ваше сообщение отправлено');
  const body = clone(model.value);
  useFetch('/api/email', {
    method: 'POST',
    body,
  });
  Object.assign(model.value, clone(DEFAULT_DATA));
};
</script>
