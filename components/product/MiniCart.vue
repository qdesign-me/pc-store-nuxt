<template>
  <div class="relative" ref="target">
    <div class="mini-cart" v-show="modal?.mini && minidata?.data">
      <div class="flex justify-between gap-6 items-center py-3">
        <div class="font-semibold text-base text-black">Товар добавлен в корзину</div>
      </div>

      <div class="mb-1">
        <div class="list-items-mini">
          <div v-for="item in minidata?.data" :key="item.id" class="!border-b-0">
            <div class="img w-[60px] flex-shrink-0 overflow-hidden">
              <div class="text-[10px] text-[#3F3F3F] whitespace-nowrap text-ellipsis">{{ item.model }}</div>
              <ProductThumbs :data="item" :size="60" />
            </div>
            <div class="flex-1 flex flex-col justify-between">
              <div class="flex gap-6 items-center mb-1" v-if="item.is_auction || item.Price_bn > 500 || item.PriceSale_bn > 0">
                <div class="tags flex-row min-h-[21px]">
                  <div v-if="item.is_auction" class="bg-[#4DB732]">Аукцион</div>
                  <div v-if="item.Price_bn > 500" class="bg-[#F54D4D]">В рассрочку</div>
                  <div v-if="item.PriceSale_bn > 0" class="bg-[#FFAC2F]">На акции</div>
                </div>
              </div>

              <div class="text-black font-semibold mb-2 mr-6">{{ item.name }}</div>

              <div class="flex gap-2 justify-between">
                <div class="price text-[14px]">
                  <div class="mb-2">{{ price(item.Price_bn) }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="flex gap-2 justify-between">
          <NuxtLink to="/catalog" class="btn is-plain w-full">Продолжить покупки</NuxtLink>
          <NuxtLink to="/cart" class="btn w-full">Перейти в корзину</NuxtLink>
        </div>
      </div>
    </div>
    <div class="mini-cart" v-show="modal?.cart">
      <div class="flex justify-between gap-6 items-center py-3">
        <div class="font-semibold text-base text-black">Корзина</div>
        <button class="opacity-50" @click="modal.cart = false"><CloseIcon /></button>
      </div>

      <div v-if="!hasItems" class="flex flex-col items-center justify-center text-[12px] border-t">
        <CartIcon width="50" height="53" class="text-blue my-6" />
        <div class="mb-2">В корзине пока ничего нет</div>
        <div class="opacity-50">Нажмите <CartIcon class="inline -mt-1" width="19" height="19" /> для добавления в корзину</div>
        <NuxtLink to="/catalog" class="btn my-6">Перейти в каталог</NuxtLink>
      </div>
      <div v-else class="mb-1">
        <div class="list-items-mini">
          <div v-for="item in data.data" :key="item.id">
            <RemoveButton @click="onRemove(item.productID)" class="absolute -top-1 -right-3 scale-50 opacity-50" />
            <div class="img w-[60px] flex-shrink-0 overflow-hidden">
              <div class="text-[10px] text-[#3F3F3F] whitespace-nowrap text-ellipsis">{{ item.model }}</div>
              <ProductThumbs :data="item" :size="60" />
            </div>
            <div class="flex-1 flex flex-col justify-between">
              <div class="flex gap-6 items-center mb-1" v-if="item.is_auction || item.Price_bn > 500 || item.PriceSale_bn > 0">
                <div class="tags flex-row min-h-[21px]">
                  <div v-if="item.is_auction" class="bg-[#4DB732]">Аукцион</div>
                  <div v-if="item.Price_bn > 500" class="bg-[#F54D4D]">В рассрочку</div>
                  <div v-if="item.PriceSale_bn > 0" class="bg-[#FFAC2F]">На акции</div>
                </div>
              </div>

              <div class="text-black font-semibold mb-2 mr-6">{{ item.name }}</div>

              <div class="flex gap-2 justify-between">
                <Add2Cart :productID="item.productID" @qty="(qty) => onQty(item.productID, qty)" />
                <div class="price text-[14px]">
                  <div class="mb-2">{{ price(item.Price_bn) }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="flex justify-between !text-base font-medium py-1">
          <span>Итого</span><span>{{ price(data.total.price) }}</span>
        </div>
        <NuxtLink to="/cart" class="btn w-full">Перейти в корзину</NuxtLink>
      </div>
    </div>
    <CartLink @click="onClick" />
  </div>
</template>
<script setup>
const router = useRouter();
import { onClickOutside } from '@vueuse/core';
const { add: add2favorites } = useFavorites();
const { items, hasItems, remove, clear, highlight, clearHighlight } = useCart();
const target = ref(null);
const modal = ref({
  cart: false,
  mini: false,
});

const { data: minidata } = await useFetch('/api/products/cart', {
  method: 'POST',
  body: {
    sortby: 'popular',
    sortdir: 'desc',
    items: highlight,
  },
});

const { data } = await useFetch('/api/products/cart', {
  method: 'POST',
  body: {
    sortby: 'popular',
    sortdir: 'desc',
    items: items,
  },
});

const onRemove = (id) => {
  add2favorites(id);
  remove(id);
};

const onQty = (productID, qty) => {
  if (qty === 0) onRemove(productID);
};

onClickOutside(
  target,
  () =>
    (modal.value = {
      cart: false,
      mini: false,
    })
);

const onClick = () => {
  if (router.currentRoute.value.fullPath === '/cart') return false;
  const width = window.innerWidth;
  if (!modal.value.cart && width > 989) return (modal.value.cart = true);
  modal.value = {
    cart: false,
    mini: false,
  };
  return router.push('/cart');
};

definePageMeta({
  layout: 'default',
});

const meta = {
  title: 'Корзина | Интернет-магазин Iven',
  description: 'Корзина товаров.',
};

watch(router.currentRoute, () => {
  modal.value = {
    cart: false,
    mini: false,
  };
});

watch(highlight, () => {
  modal.value.mini = true;
  setTimeout(() => {
    clearHighlight();
    modal.value.mini = false;
  }, 3500);
});

useSeoMeta({
  title: () => meta.title,
  ogTitle: () => meta.title,
  description: () => meta.description,
  ogDescription: () => meta.description,
  robots: 'noindex',
});
</script>
