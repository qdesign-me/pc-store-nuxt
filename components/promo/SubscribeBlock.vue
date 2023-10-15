<template>
  <div class="mt-4 lg:mt-6 flex flex-wrap gap-6">
    <div class="flex justify-center gap-6 w-10 flex-1 links select-none">
      <button :class="model.way === 'vk' ? 'scale-[1.05]' : 'opacity-70'" @click="setActive('vk')"><div class="icon icon-vk"></div></button>
      <button :class="model.way === 'telegram' ? 'scale-[1.05]' : 'opacity-70'" @click="setActive('telegram')"><div class="icon icon-telegram"></div></button>
      <button :class="model.way === 'email' ? 'scale-[1.05]' : 'opacity-70'" @click="setActive('email')"><div class="icon icon-email"></div></button>
    </div>
    <div class="w-10 flex-1">
      <Form :model="model" class="flex flex-col gap-2 items-start" :onFinish="onFinish">
        <input type="text" class="input text-center" name="contact" placeholder="Укажите ваш контакт" v-model="model.contact" />
        <button class="btn w-full" type="submit" :disabled="model.contact.length === 0 || !model.way">Подписаться на акции</button>
      </Form>
    </div>
  </div>
</template>

<script setup>
const DEFAULT_DATA = {
  action: 'subscribe',
  way: null,
  subject: 'Подписка на новости',
  contact: '',
};

const setActive = (value) => {
  if (model.value.way === value) return (model.value.way = null);
  model.value.way = value;
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
