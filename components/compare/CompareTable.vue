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
    <table class="compare-table">
      <thead>
        <tr>
          <th></th>
          <th v-for="product in props.data.products" :key="product.productID">
            <CompareCard :product="product" @remove="handleRemove" />
          </th>
        </tr>
      </thead>
      <tbody>
        <template v-for="key in Object.keys(props.data.features)" :key="key">
          <tr v-if="key !== 'price'" class="bg-lightbeige/10" :class="{ hidden: hideEqual && props.data.features[key].every((item) => item.equal) }">
            <td :colspan="props.data.products.length + 1">{{ groups[key] }}</td>
          </tr>
          <tr v-for="row in props.data.features[key]" :key="row" :class="{ hidden: hideEqual && row.equal }">
            <td>
              <div class="label-wrap">
                <div class="label flex items-center gap-2">
                  <template v-if="row.label === 'Стоимость при оплате единым платежом'"><ValetIcon width="27" height="26" /></template>
                  {{ row.label }}
                </div>
                <Tooltip v-if="row.tooltip">
                  <div class="help-trigger"></div>
                  <template #text>{{ row.tooltip }}</template>
                </Tooltip>
              </div>
            </td>
            <td v-for="(item, index) in props.data.products" :class="row.bg[index]">
              {{ row.items[index] }}<template v-if="row.items[index]">{{ row.suffix }}</template>
            </td>
          </tr>
        </template>
      </tbody>
    </table>
  </div>
</template>

<script setup>
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
