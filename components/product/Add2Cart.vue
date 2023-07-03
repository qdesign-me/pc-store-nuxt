<template>
  <button v-if="props.variant === 'primary'" class="btn w-full text-white" :class="{ 'is-plain': !inCart }"><CartIcon /> В корзину</button>
  <div v-else>
    <button v-if="!inCart" class="btn flex w-full relative is-plain" @click="store.addCart(props.productID, 1)"><CartIcon class="cursor-pointer" />В корзину</button>
    <div v-else class="flex gap-2 w-full group">
      <NuxtLink to="/cart" class="btn flex relative flex-1 px-2"><CartIcon class="cursor-pointer group-hover:hidden" />В корзине</NuxtLink>
      <div class="hidden group-hover:block relative w-1/2 min-w-[110px]">
        <div class="flex border rounded absolute inset-0">
          <button class="bg-[#EFEFEF] w-[40px] flex items-center justify-center" @click="store.addCart(props.productID, store.$state.items[props.productID] - 1)">
            <MinusIcon />
          </button>
          <input
            type="text"
            class="flex-1 w-2 bg-white text-center text-blue"
            :value="store.$state.items[props.productID]"
            @change="(event) => (store.$state.items[props.productID] = event.target.value)"
          />
          <button class="bg-[#EFEFEF] w-[40px] flex items-center justify-center" @click="store.addCart(props.productID, store.$state.items[props.productID] + 1)">
            <PlusIcon />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps(['productID', 'variant']);
import { useAppStore } from '~/stores/app';
const store = useAppStore();
const inCart = computed(() => store.$state.items?.[props.productID] > 0);
</script>
