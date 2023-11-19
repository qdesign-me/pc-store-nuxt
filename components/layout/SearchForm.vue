<template>
  <Form :model="model" class="relative" :onFinish="onFinish" ref="target">
    <input class="input" placeholder="Введите наименование или артикул товара" type="text" v-model="model.search" @input.lazy="doSearch" />
    <button type="submit" class="absolute top-1/2 -translate-y-1/2 right-4" :disabled="!model.search.length">
      <SearchIcon />
    </button>
    <div class="absolute top-[49px] left-0 right-0 border-2 border-[#A1A1A1] bg-white rounded-[5px] overflow-hidden" v-if="data?.length && isOpen">
      <div
        @click="navigateTo(`/p/${item.uri.replace('.html', '')}`)"
        class="cursor-pointer flex gap-4 border border-[#EFEFEF] items-center px-2 py-[2px] hover:bg-[#EFEFEF]/10"
        v-for="item in data"
      >
        <div>
          <ProductThumbs :data="item" :size="50" />
        </div>
        <div>
          <div class="line-clamp-1">{{ item.name }}</div>
          <div class="text-sm">
            <span class="line-through text-sm mr-2 opacity-70" v-if="item.PriceSale">{{ price(item.PriceSale) }} </span>
            {{ price(item.Price) }}
          </div>
        </div>
      </div>
    </div>
  </Form>
</template>

<script setup>
const target = ref(null);

import { onClickOutside } from '@vueuse/core';

const isOpen = ref(true);
const DEFAULT_DATA = {
  search: '',
};

onClickOutside(target, () => (isOpen.value = false));

const model = useState(() => DEFAULT_DATA);

const router = useRouter();

const data = ref([]);
const onFinish = () => {
  router.push(`/search?q=${model.value.search}`);
  document.querySelector('body').classList.remove('with-open-menu');
};

const navigateTo = (url) => {
  router.push(url);

  isOpen.value = false;
  model.value.search = '';
};

watch(data, () => {
  if (data.value) isOpen.value = true;
});

const doSearch = async (val) => {
  const res = await $fetch('/api/products/search', {
    method: 'POST',
    body: { search: val.target.value },
  });

  data.value = res.data;
};

watch(router.currentRoute, () => {
  isOpen.value = false;
});
</script>
