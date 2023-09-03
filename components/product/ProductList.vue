<template>
  <div class="overflow-auto">
    <div class="list-items">
      <div v-for="item in props.data" :key="item.id">
        <div class="img max-w-[80px] lg:max-w-[200px] flex-shrink-0">
          <div class="text-[12px] text-[#3F3F3F] mb-1 block sm:hidden">{{ item.model }}</div>
          <ProductThumbs :data="item" :size="160" />
        </div>
        <div class="name">
          <div class="flex gap-6 items-center mb-3">
            <div class="tags flex-row min-h-[21px]">
              <div v-if="item.is_auction" class="bg-[#4DB732]">Аукцион</div>
              <div v-if="item.Price_bn > 500" class="bg-[#F54D4D]">В рассрочку</div>
              <div v-if="item.PriceSale_bn > 0" class="bg-[#FFAC2F]">На акции</div>
            </div>
            <div class="info flex gap-2">
              <OkIcon v-if="item.is_new" />
              <PercentIcon v-if="item.is_sale" />
            </div>
          </div>
          <div class="text-[12px] text-[#3F3F3F] mb-1 hidden sm:block">{{ item.model }}</div>
          <div class="lg:text-lg font-semibold mb-2">{{ item.name }}</div>
          <div class="text-sm font-light"></div>
        </div>

        <div class="price text-[24px]">
          <div class="mb-2">{{ price(item.Price_bn) }}</div>
          <slot name="price" :item="item" />
        </div>
        <div class="controls">
          <div class="flex justify-between text-lightgray gap-2 pt-10">
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
