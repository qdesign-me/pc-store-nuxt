<template>
  <div class="breadcrumbs">
    <NuxtLink to="/">Главная </NuxtLink>
    <NuxtLink :to="page.uri" v-for="page in JSON.parse(props.data.breadcrumbs)" :key="page.uri">{{ page.name }} </NuxtLink>
    <span>{{ props.data.name }}</span>
  </div>

  <h2 class="mb-10">{{ props.data.name }}</h2>
  <div class="flex gap-6">
    <div class="flex-1">
      <div class="flex gap-4 text-sm text-orange items-center mb-6" v-if="props.data.enabled === 1">
        <AvailableIcon />
        Товар в наличии
      </div>
      <div class="flex gap-6 mb-10">
        <div class="flex gap-6">
          <div class="border rounded px-8 py-12">
            <img :src="props.data.img" alt="" loading="lazy" width="395" height="395" class="block" />
          </div>
          <div class="flex flex-col justify-center gap-4" v-if="0">
            <div class="p-3 cursor-pointer w-full flex justify-center">
              <ChevronUpIcon />
            </div>
            <div class="flex flex-col gap-4">
              <div class="border rounded p-1 transition hover:shadow cursor-pointer">
                <img src="/img/products/1/1.jpg" alt="" loading="lazy" width="75" height="68" class="block" />
              </div>
              <div class="border rounded p-1 transition hover:shadow cursor-pointer">
                <img src="/img/products/1/1.jpg" alt="" loading="lazy" width="75" height="68" class="block" />
              </div>
              <div class="border rounded p-1 transition hover:shadow cursor-pointer">
                <img src="/img/products/1/1.jpg" alt="" loading="lazy" width="75" height="68" class="block" />
              </div>
              <div class="border rounded p-1 transition hover:shadow cursor-pointer">
                <img src="/img/products/1/1.jpg" alt="" loading="lazy" width="75" height="68" class="block" />
              </div>
            </div>
            <div class="p-3 cursor-pointer w-full flex justify-center">
              <ChevronDownIcon />
            </div>
          </div>
        </div>
        <div class="text-sm flex flex-col gap-4 flex-1">
          <div class="text-base font-semibld mb-4">Код товара: {{ props.data.model }}</div>
          <template v-if="0">
            <div>
              <strong> Модификация:</strong>
            </div>
            <div class="border rounded px-4 py-3 flex items-center gap-8 cursor-pointer">
              <img src="/img/products/1/1.jpg" alt="" loading="lazy" width="53" height="50" class="block" />
              <div>Материнская плата MSI H510M-A PRO, LGA 1200, Intel H510, mATX, Ret</div>
              <ChevronDownIcon width="40" height="26" />
            </div>
          </template>

          <ul class="flex flex-col gap-3" v-if="props.data.features.length">
            <li v-for="feature in props.data.features" :key="feature.label">{{ feature.label }}: {{ feature.value }}</li>
          </ul>

          <div class="mt-10 text-blue cursor-pointer text-base flex gap-10 items-center" v-if="props.data.description.length > 0">
            <div class="underline underline-offset-4" @click="showFeatures">Все характеристики товара</div>
            <ArrowRightIcon />
          </div>
        </div>
      </div>

      <div class="tabs" ref="target">
        <div class="tabs-header">
          <div v-for="(tab, index) in tabs" :class="{ active: index === activeTab }" @click="activeTab = index" :key="tab.title">{{ tab.title }}</div>
        </div>
        <div class="tabs-content content" v-for="(tab, index) in tabs" :key="tab.title" :class="{ hidden: index !== activeTab }">
          <div v-html="tab.content"></div>
        </div>
      </div>

      <div class="text-blue cursor-pointer underline underline-offset-4 mt-6" @click="modalVisible = true">Сообщить об ошибке в описании</div>

      <Modal :visible="modalVisible" @close="modalVisible = false" title="Сообщить об ошибке">
        <form @submit="modalVisible = false">
          <div class="mb-6">
            <textarea placeholder="Укажите неточность в описании" class="input h-40"></textarea>
          </div>
          <button class="btn">Отправить</button>
        </form>
      </Modal>
    </div>
    <div class="w-[420px] text-sm flex flex-col">
      <div class="flex gap-2 mb-6" v-if="0">
        Рейтинг товара
        <div class="flex gap-2">
          <StarIcon />
          4.5
        </div>
        <div class="ml-auto flex gap-8 text-blue">
          <div class="underline underline-offset-4 cursor-pointer">1 Обзор</div>
          <div class="underline underline-offset-4 cursor-pointer">13 Отзывов</div>
        </div>
      </div>
      <div class="tags flex-row mb-10">
        <div v-if="props.data.PriceSale_bn > 0" class="bg-[#FFAC2F] flex-1">На акции</div>
        <div v-if="props.data.is_auction > 0" class="bg-[#4DB732] flex-1">Аукцион</div>
        <div v-if="props.data.Price_bn > 500" class="bg-[#F54D4D] flex-1">В рассрочку</div>
      </div>
      <div class="price-info flex flex-col flex-1">
        <div class="flex gap-4 items-center text-base font-semibold mb-6" v-if="0">
          <div class="w-10">
            <ValetIcon width="22" height="21" />
          </div>
          <div class="font-sm">1 200 Br</div>
        </div>

        <div class="flex gap-4 items-center text-base font-semibold mb-8">
          <div class="w-10">
            <BankIcon width="33" height="38" />
          </div>
          <div class="text-3xl font-semibold">{{ price(props.data.Price_bn) }}</div>
          <div class="ml-auto text-lightgray">
            <Add2Cart :productID="props.data.productID" />
          </div>
        </div>

        <Add2Cart :productID="props.data.productID" variant="primary" />

        <div class="bg-[#EFEFEF] flex relative rounded mb-12">
          <Add2Favorites variant="primary" :productID="props.data.productID" />

          <div class="border absolute top-[5px] bottom-[5px] left-1/2"></div>
          <Add2Compare variant="primary" :productID="props.data.productID" />
        </div>

        <div class="content mb-8">
          <p>Самовывоз только в Минске.</p>

          <p>Стоимость и сроки доставки по РБ уточняйте в отделе продаж.</p>

          <p>Возможность и стоимость доставки по стране в удобный для Вас день уточняйте у специалиста call-центра.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const target = ref(null);

const tabs = computed(() => {
  const tabs = [];
  if (props.data.about) tabs.push({ title: 'О товаре', content: props.data.about });
  if (props.data.description) tabs.push({ title: 'Характеристики', content: props.data.description });
  return tabs;
});
const activeTab = ref(0);
const modalVisible = ref(false);
const props = defineProps(['data']);

const showFeatures = () => {
  activeTab.value = tabs.value.findIndex((item) => item.title === 'Характеристики');

  target.value.scrollIntoView({ behavior: 'smooth', block: 'start' });
};
</script>
