<template>
  <Modal :visible="value === 'show'" @close="hide">
    <div class="text-center text-[#000]">
      <div v-if="message?.length < 1">
        <p class="font-semibold mb-6 mt-[40px]">Благодарим за обращение!</p>
        <p class="mb-4">Консультант IVEN свяжется с Вами в ближайшее время.</p>
        <p>
          Мы работаем с понедельника по пятницу,<br />
          с 10:00 - 19:00
        </p>
      </div>
      <div v-else>
        <p class="font-semibold mb-6 mt-[40px]">{{ message }}</p>
      </div>

      <img :src="img" alt="404" width="186" height="200" class="inline-block mx-auto mt-8" />
    </div>
  </Modal>
</template>

<script setup>
import img from '@/assets/img/thanks.png';
const attrs = useThanks();
const { value, hide, message } = attrs;
</script>
