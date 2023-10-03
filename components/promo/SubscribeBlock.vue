<template>
  <div class="mt-4 lg:mt-6 flex flex-wrap gap-6">
    <div class="flex justify-center gap-6 w-10 flex-1 links">
      <SocialLinks :social="$state.config.social" />
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
import { useAppStore } from '~/stores/app';
const { $state } = useAppStore();
const DEFAULT_DATA = {
  action: 'subscribe',
  subject: 'Подписка на новости',
  contact: '',
};
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
