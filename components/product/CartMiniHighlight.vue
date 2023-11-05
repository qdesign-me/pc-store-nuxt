<template>
  <div class="relative" ref="target">
    <div class="mini-cart border rounded -mt-12" v-show="modal && minidata?.data?.length">
      <div class="flex justify-between gap-6 items-center py-3">
        <div class="font-semibold text-base text-black">Товар добавлен в корзину</div>
      </div>

      <div class="mb-1">
        <div class="list-items-mini">
          <div v-for="item in minidata?.data" :key="item.id" class="!border-b-0">
            <div class="img w-[60px] flex-shrink-0 overflow-hidden">
              <div class="text-[10px] text-[#3F3F3F] whitespace-nowrap text-ellipsis">{{ item.productID }}</div>
              <NuxtLink :to="`/p/${item.uri.replace('.html', '')}`"><ProductThumbs :data="item" :size="60" /></NuxtLink>
            </div>
            <div class="flex-1 flex flex-col justify-between">
              <div class="flex gap-6 items-center mb-1" v-if="item.is_auction || item.Price > 500 || item.PriceSale > 0">
                <div class="tags min-h-[21px]">
                  <div v-if="item.is_auction" class="bg-[#4DB732]">Аукцион</div>
                  <div v-if="item.Price > 500" class="bg-[#F54D4D]">В рассрочку</div>
                  <div v-if="item.PriceSale > 0" class="bg-[#FFAC2F]">На акции</div>
                </div>
              </div>

              <NuxtLink :to="`/p/${item.uri.replace('.html', '')}`" class="text-black font-semibold mb-2 mr-6">{{ item.name }}</NuxtLink>

              <div class="flex gap-2 justify-between">
                <div class="price text-[14px] flex gap-2">
                  <span class="line-through text-[10px] translate-y-[1px]" v-if="item.PriceSale">{{ price(item.PriceSale) }} </span>
                  <div class="mb-2" :class="{ 'text-red-600': item.PriceSale > 0 }">{{ price(item.Price) }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="flex gap-2 justify-between">
          <NuxtLink to="/catalog" class="btn is-plain w-1 flex-1 with-animate">Продолжить покупки</NuxtLink>
          <NuxtLink to="/cart" class="btn w-1 flex-1">Перейти в корзину</NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
const router = useRouter();
import { onClickOutside } from '@vueuse/core';
const { highlight, clearHighlight } = useCart();
const target = ref(null);
const modal = ref(false);

const { data: minidata } = await useFetch('/api/products/cart', {
  method: 'POST',
  body: {
    sortby: 'popular',
    sortdir: 'desc',
    items: highlight,
    trigger: 'highlight',
  },
});

onClickOutside(target, () => (modal.value = false));

let timeout = null;
watch(highlight, () => {
  modal.value = true;
  if (timeout) clearTimeout(timeout);
  timeout = setTimeout(() => {
    clearHighlight();
    modal.value = false;
  }, 3500);
});
watch(router.currentRoute, () => {
  modal.value = false;
});
</script>
