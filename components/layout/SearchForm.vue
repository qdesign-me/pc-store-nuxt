<template>
  <Form :model="model" class="relative" :onFinish="onFinish">
    <input class="input" placeholder="Введите наименование или артикул товара" type="text" v-model="model.search" />
    <button type="submit" class="absolute top-1/2 -translate-y-1/2 right-4" :disabled="!model.search.length">
      <SearchIcon />
    </button>
  </Form>
</template>

<script setup>
const DEFAULT_DATA = {
  search: '',
};
const model = useState(() => DEFAULT_DATA);

const onFinish = () => {
  router.push(`/search?q=${model.value.search}`);
  document.querySelector('body').classList.remove('with-open-menu');
};

const router = useRouter();
</script>
