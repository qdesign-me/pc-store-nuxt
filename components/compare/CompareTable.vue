<template>
  <div class="flex justify-between gap-6 items-start">
    <h1>Сравнение</h1>
    <div class="text-blue flex gap-6 text-sm underline underline-offset-4">
      <button class="hidden sm:flex items-center gap-2" @click="handleHideEqual">
        <HideSimilarIcon />
        <template v-if="hideEqual"> Показать </template>
        <template v-else>Скрыть</template> одинаковые параметры
      </button>
      <button class="flex items-center gap-2" @click="handleRemoveAll"><DeleteIcon /> <span class="hidden sm:block">Очистить сравнение</span></button>
    </div>
  </div>

  <div class="flex justify-between gap-6 mb-4">
    <NuxtErrorBoundary>
      <Swiper
        class="swiper-init w-full"
        :modules="[Pagination]"
        :pagination="{ clickable: true }"
        :slidesPerView="5"
        :spaceBetween="20"
        :breakpoints="{
          310: {
            slidesPerView: 1,
          },
          640: {
            slidesPerView: 2,
          },
          768: {
            slidesPerView: 3,
          },
          1240: {
            slidesPerView: 3,
          },
          1650: {
            slidesPerView: 5,
          },
        }"
      >
        <SwiperSlide v-for="id in Object.keys(props.data.products)" :key="id">
          <div class="relative">
            <div class="sticky top-[100px] bg-white z-10 border-b">
              <CompareCard :product="props.data.products[id]" @remove="handleRemove" />
            </div>
            <div v-for="key in Object.keys(props.data.features).filter((item) => item !== 'null')" class="border-b h-[50px]" :key="key">
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
import { Pagination } from 'swiper/modules';
const router = useRouter();

const hideEqual = ref(false);
const props = defineProps(['data']);
const { clear, remove } = useCompare();
const handleHideEqual = () => (hideEqual.value = !hideEqual.value);
const handleRemoveAll = () => {
  clear();
  router.push('/');
};
const handleRemove = (productID) => {
  const ids = router.currentRoute.value.params.ids.split('+').filter((item) => +item !== productID);
  const link = ids.length === 0 ? '/' : `/compare/${ids.join('+')}`;
  remove(productID);
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
