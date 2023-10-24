<template>
  <div class="breadcrumbs">
    <NuxtLink to="/">Главная </NuxtLink>
    <NuxtLink :to="page.uri" v-for="page in JSON.parse(props.data.breadcrumbs)" :key="page.uri">{{ page.name }} </NuxtLink>
    <span>{{ props.data.name }}</span>
  </div>

  <h1 class="mb-10 max-w-[900px]">{{ props.data.name }}</h1>

  <div>
    <div class="flex gap-4 text-sm text-[#E5A35B] items-center mb-6" v-if="props.data.enabled === 1">
      <AvailableIcon />
      Товар в наличии
    </div>
    <div class="tags mb-6 lg:hidden">
      <div v-if="props.data.PriceSale_bn > 0" class="bg-[#FFAC2F] flex-1">На акции</div>
      <div v-if="props.data.is_auction > 0" class="bg-[#4DB732] flex-1">Аукцион</div>
      <div v-if="props.data.Price > 500" class="bg-[#F54D4D] flex-1">В рассрочку</div>
    </div>

    <div class="flex profile-cont gap-6 mb-10 flex-row">
      <div class="flex gap-6 profile-img">
        <ProductProfileImages :data="props.data" />
      </div>
      <div class="text-sm flex flex-col gap-4 flex-1 min-w-[200px] profile-short">
        <div class="text-sm sm:text-base font-semibold mb-4 hidden xl:block">Код товара: {{ props.data.model }}</div>

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

        <ul class="flex flex-col gap-3" v-if="props.data.features?.length">
          <li v-for="feature in props.data.features" :key="feature.label">
            <span class="font-semibold">{{ feature.label }}</span
            >: {{ feature.value }}{{ feature.suffix }}
          </li>
        </ul>

        <div class="mt-10 text-blue cursor-pointer text-base gap-6 items-center hidden xl:flex" v-if="props.data.description?.length > 0">
          <div class="underline underline-offset-4" @click="showFeatures">Все характеристики товара</div>
          <ArrowRightIcon />
        </div>
      </div>
      <div class="max-w-[420px] text-sm flex flex-col">
        <div class="block xl:hidden text-sm font-semibold mb-4">Код товара: {{ props.data.model }}</div>

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
        <div class="tags hidden lg:!flex mb-6">
          <div v-if="props.data.PriceSale_bn > 0" class="bg-[#FFAC2F] flex-1">На акции</div>
          <div v-if="props.data.is_auction > 0" class="bg-[#4DB732] flex-1">Аукцион</div>
          <div v-if="props.data.Price > 500" class="bg-[#F54D4D] flex-1">В рассрочку</div>
        </div>
        <div class="price-info flex flex-col flex-1">
          <div class="flex gap-2 items-end text-base font-semibold mb-8">
            <span class="line-through text-sm mr-2" v-if="props.data.PriceSale_bn">{{ price(props.data.PriceSale_bn) }} </span>

            <div class="text-3xl font-semibold" :class="{ 'text-red-600': props.data.PriceSale_bn > 0 }">{{ price(props.data.Price) }}</div>
          </div>

          <Add2Cart class="has-large" :productID="props.data.productID" />

          <div class="bg-[#EFEFEF] flex relative rounded mt-4">
            <Add2Favorites variant="primary" :productID="props.data.productID" />
            <div class="border absolute top-[5px] bottom-[5px] left-1/2"></div>
            <Add2Compare variant="primary" :productID="props.data.productID" />
          </div>

          <CallMeBack />

          <div class="text mt-4">
            <p class="hidden sm:block">Самовывоз только в Минске.</p>

            <p class="hidden sm:block">Стоимость и сроки доставки по РБ уточняйте в отделе продаж.</p>

            <p>Возможность и стоимость доставки по стране в удобный для Вас день уточняйте у специалиста call-центра.</p>
          </div>
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

    <ReportError class="mt-6 hidden sm:block" />
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
const activeTab = ref(null);
const props = defineProps(['data']);

const showFeatures = () => {
  activeTab.value = tabs.value.findIndex((item) => item.title === 'Характеристики');
  target.value.scrollIntoView({ behavior: 'smooth', block: 'start' });
};
</script>
