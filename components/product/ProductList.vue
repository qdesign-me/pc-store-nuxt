<template>
  <div class="overflow-auto">
    <div class="list-items">
      <div v-for="item in props.data" :key="item.id">
        <div class="img max-w-[80px] lg:max-w-[100px] flex-shrink-0">
          <div class="text-[12px] text-[#3F3F3F] mb-1 block sm:hidden">Код: {{ item.productID }}</div>
          <NuxtLink :to="`/p/${item.uri.replace('.html', '').toLowerCase()}`"><ProductThumbs :data="item" :size="160" /></NuxtLink>
        </div>
        <div class="name">
          <div class="flex gap-6 items-center mb-3">
            <div class="tags min-h-[21px]">
              <div v-if="item.is_auction" class="bg-[#4DB732]">Аукцион</div>
              <div v-if="item.Price > 0" class="bg-[#F54D4D]">В рассрочку</div>
              <div v-if="item.PriceSale > 0" class="bg-[#FFAC2F]">На акции</div>
            </div>
            <div class="info flex gap-2">
              <OkIcon v-if="item.is_new" />
              <PercentIcon v-if="item.is_sale" />
            </div>
          </div>
          <NuxtLink :to="`/p/${item.uri.replace('.html', '').toLowerCase()}`">
            <div class="text-[12px] text-[#3F3F3F] mb-1 hidden sm:block">Код товара: {{ item.productID }}</div>
            <div class="lg:text-lg font-semibold mb-2">{{ item.name }}</div>
            <div class="text-sm font-light"></div>
          </NuxtLink>
        </div>

        <div class="price text-[24px]">
          <slot name="price" :item="item" />
        </div>
        <div class="price text-[24px] min-w-[120px]">
          <div :class="{ 'text-red-600 leading-[1] md:mb-1': item.PriceSale > 0 }">
            <span class="line-through text-xs block text-[#000]" v-if="item.PriceSale">{{ price(item.PriceSale) }} </span>
            {{ price(item.Price) }}
          </div>
        </div>
        <div class="controls">
          <div class="flex justify-between text-lightgray gap-2">
            <slot name="controls" :item="item" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps(['data']);
</script>
