<template>
  <div class="breadcrumbs">
    <NuxtLink to="/">Главная </NuxtLink>
    <NuxtLink :to="page.uri" v-for="page in JSON.parse(props.data.breadcrumbs)" :key="page.uri">{{ page.name.replaceAll('&amp;quot;', '"') }} </NuxtLink>
    <span>{{ props.data.name }}</span>
  </div>

  <div>
    <div class="text-[#000] grid grid-cols-1 xl:grid-cols-[1fr,440px] gap-5">
      <div>
        <h1 class="mb-10 max-w-[900px]">{{ props.data.name }}</h1>

        <div class="flex flex-wrap text-sm items-center mb-6 lg:mb-12 text-[#7C7C7C] gap-y-2 gap-x-6 lg:gap-[60px]" v-if="props.data.enabled === 0">Нет в наличии</div>
        <div class="flex flex-wrap text-sm items-center mb-6 lg:mb-12 text-[#7C7C7C] gap-y-2 gap-x-6 lg:gap-[60px]" v-if="props.data.enabled === 1">
          <div class="text-[#00B3D7] flex gap-3 items-center">
            <AvailableIcon />
            Товар в наличии
          </div>
          <div class="relative pl-10 w-full sm:w-auto">
            <PickupIcon class="absolute top-1/2 -translate-y-1/2 left-0" />Самовывоз в Минске: {{ props.data.available.delivery_date }} г.
            <span class="lowercase">({{ props.data.available.delivery_text }})</span>
          </div>
          <div class="relative pl-10">
            <TruckIcon class="absolute top-1/2 -translate-y-1/2 left-0" />Доставка по Беларуси: {{ props.data.available.delivery_rb_date }} г.
            <span class="lowercase">({{ props.data.available.delivery_rb_text }})</span>
          </div>
        </div>
        <div class="tags mb-6 lg:hidden">
          <div v-if="props.data.PriceSale > 0" class="bg-[#FFAC2F] flex-1">На акции</div>
          <div v-if="props.data.is_auction > 0" class="bg-[#4DB732] flex-1">Аукцион</div>
          <div v-if="props.data.Price > 500" class="bg-[#F54D4D] flex-1">В рассрочку</div>
        </div>
        <div class="flex gap-8 flex-wrap">
          <div class="profile-img">
            <ProductProfileImages :data="props.data" />
          </div>
          <div class="text-sm flex flex-col gap-4 flex-1 min-w-[200px] profile-short">
            <div class="text-[12px] font-semibold mb-4 hidden xl:block">Код товара: {{ props.data.productID }}</div>

            <template v-if="0">
              <div>
                <strong> Модификация:</strong>
              </div>
              <div class="border rounded px-4 py-3 flex items-center gap-8 cursor-pointer">
                <!-- <img src="/img/products/1/1.jpg" alt="" loading="lazy" width="53" height="50" class="block" /> -->
                <div>Материнская плата MSI H510M-A PRO, LGA 1200, Intel H510, mATX, Ret</div>
                <ChevronDownIcon width="40" height="26" />
              </div>
            </template>
            <div class="table-wrap hidden lg:block">
              <div class="mb-5 text-[#00B3D7] text-base">Основные характеристики</div>

              <table class="features-table">
                <tr v-if="props.data.vendor">
                  <td class="label">Производитель</td>
                  <td class="max">{{ props.data.vendor }}</td>
                </tr>
                <tr v-if="props.data.model">
                  <td class="label">Модель</td>
                  <td class="max">{{ props.data.model }}</td>
                </tr>
                <tr v-for="feature in props.data.features?.filter((item) => !['Производитель', 'Модель'].includes(item.label))" :key="feature.label">
                  <td class="label">{{ feature.label }}</td>
                  <td class="max">{{ feature.value }}{{ feature.suffix }}</td>
                </tr>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div class="text-sm flex flex-col row-span-2">
        <div class="block xl:hidden text-[12px] font-semibold mb-4">Код товара: {{ props.data.productID }}</div>

        <ProductPriceBox :data="props.data" />

        <!-- <div class="flex gap-2 mb-6" v-if="0">
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
        <div class="tags hidden lg:!flex mb-6" v-if="0">
          <div v-if="props.data.PriceSale > 0" class="bg-[#FFAC2F] flex-1">На акции</div>
          <div v-if="props.data.is_auction > 0" class="bg-[#4DB732] flex-1">Аукцион</div>
          <div v-if="props.data.Price > 500" class="bg-[#F54D4D] flex-1">В рассрочку</div>
        </div> -->
        <div class="price-info flex flex-col flex-1">
          <BuyAtOneClick v-if="props.data.enabled === 1" :data="props.data"> </BuyAtOneClick>

          <Add2Cart class="has-large" :productID="props.data.productID" v-if="props.data.enabled === 1" />

          <div class="bg-[#EFEFEF] flex relative rounded mt-4">
            <Add2Favorites variant="primary" :productID="props.data.productID" />
            <div class="border absolute top-[5px] bottom-[5px] left-1/2"></div>
            <Add2Compare variant="primary" :productID="props.data.productID" />
          </div>

          <CallMeBack />

          <div class="text lg:px-4" v-if="props.data.enabled === 1">
            <p class="hidden sm:block">Самовывоз только в Минске.</p>

            <p class="hidden sm:block">Стоимость и сроки доставки по РБ уточняйте в отделе продаж.</p>

            <p>Возможность и стоимость доставки по стране в удобный для Вас день уточняйте у специалиста call-центра.</p>
          </div>
        </div>
      </div>
      <div class="tabs" ref="target">
        <div class="tabs-header">
          <div v-for="(tab, index) in tabs" :class="{ active: index === activeTab }" @click="activeTab = activeTab === index ? null : index" :key="tab.title">
            <CogIcon class="sm:hidden" />
            {{ tab.title }}
            <ChevronRightIcon class="tab-arrow" />
          </div>
        </div>
        <div class="tabs-content text" v-for="(tab, index) in tabs" :key="tab.title" :class="{ active: index === activeTab }">
          <div v-html="tab.content" class="has-table"></div>
        </div>
      </div>
    </div>

    <ReportError class="mt-6 hidden sm:block" />
  </div>
</template>

<script setup>
const target = ref(null);
const tabs = computed(() => {
  const tabs = [];
  if (props.data.about) tabs.push({ title: 'О товаре', content: props.data.about });
  if (props.data.description?.length > 6) tabs.push({ title: 'Характеристики', content: props.data.description });
  return tabs;
});
const activeTab = ref(null);
const props = defineProps(['data']);

const showFeatures = () => {
  activeTab.value = tabs.value.findIndex((item) => item.title === 'Характеристики');
  target.value.scrollIntoView({ behavior: 'smooth', block: 'start' });
};
</script>
