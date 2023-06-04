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
        <tr v-for="key in Object.keys(props.data.features)" :key="key" :class="{ hidden: hideEqual && props.data.features[key].equal }">
          <td>
            <div class="label-wrap">
              <div class="label flex items-center gap-2">
                <template v-if="key === 'Стоимость при оплате единым платежом'"><ValetIcon width="27" height="26" /></template>
                {{ key }}
              </div>
              <Tooltip v-if="props.data.features[key].tooltip">
                <div class="help-trigger"></div>
                <template #text>{{ props.data.features[key].tooltip }}</template>
              </Tooltip>
            </div>
          </td>

          <td v-for="(item, index) in props.data.features[key].items" :class="props.data.features[key].bg[index]">
            {{ item }}<template v-if="item">{{ props.data.features[key].suffix }}</template>
          </td>
        </tr>
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
</script>
