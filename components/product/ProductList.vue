<template>
  <div class="list-items">
    <div v-for="item in props.data" :key="item.id">
      <div class="img max-w-[200px]"><ProductThumbs :data="item" :size="160" /></div>
      <div class="name">
        <div class="flex gap-6 items-center mb-1">
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
        <div class="text-[12px] text-[#3F3F3F]">ID: {{ item.model }}</div>
        <div class="text-lg font-semibold mb-2 my-1">{{ item.name }}</div>
        <div class="text-sm font-light"></div>
      </div>

      <div class="price text-[24px]">
        <div>{{ price(item.Price_bn) }}</div>
        <slot name="price" :item="item" />
      </div>
      <div class="controls">
        <div class="flex justify-between text-lightgray gap-2">
          <slot name="controls" :item="item" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps(['data']);
</script>
