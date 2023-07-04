<template>
  <div class="flex justify-between gap-6 mb-4">
    <button class="btn is-underlined" @click="handleHideEqual">
      <HideSimilarIcon />
      <template v-if="hideEqual"> Показать </template>
      <template v-else>Скрыть</template> одинаковые параметры
    </button>

    <button class="btn is-underlined" @click="handleRemoveAll"><DeleteIcon /> Очистить сравнение</button>
  </div>
  <div>
    <NuxtErrorBoundary>
      <Swiper class="swiper" :modules="[Navigation]" :slidesPerView="5" :spaceBetween="0">
        <SwiperSlide v-for="id in Object.keys(props.data.products)">
          <div class="relative">
            <div class="sticky top-[100px] bg-white z-10 border-b">
              <CompareCard :product="props.data.products[id]" @remove="handleRemove" />
            </div>
            <div v-for="key in Object.keys(props.data.features).filter((item) => item !== 'null')" class="border-b h-[50px]">
              <small class="opacity-50">{{ key }}</small>
              <div>{{ props.data.products[id].features[key] }}</div>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </NuxtErrorBoundary>
  </div>
</template>

<script setup>
import { Navigation } from 'swiper';
const router = useRouter();
import { useAppStore } from '~/stores/app';
const hideEqual = ref(false);
const props = defineProps(['data']);
const store = useAppStore();
const handleHideEqual = () => (hideEqual.value = !hideEqual.value);
const handleRemoveAll = () => {
  store.clearCompare();
  router.push('/');
};
const handleRemove = (productID) => {
  const ids = router.currentRoute.value.params.ids.split('+').filter((item) => +item !== productID);
  const link = ids.length === 0 ? '/' : `/compare/${ids.join('+')}`;
  store.removeCompare(productID);
  router.push(link);
};

const groups = {
  general: 'Основные характеристики',
  package: 'Комплектация',
  tech: 'Технические характеристики',
};
</script>

<style>
.swiper,
.swiper-container {
  overflow: clip;
}
</style>
