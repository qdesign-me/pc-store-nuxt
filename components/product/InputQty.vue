<template>
  <div class="cart-split relative w-1/2 w-[90px] text-sm">
    <div class="flex border rounded absolute inset-0">
      <button class="bg-[#EFEFEF] w-[30px] flex items-center justify-center" @click="add(props.productID, items[props.productID] - 1)">
        <MinusIcon />
      </button>
      <input type="text" class="flex-1 w-2 bg-white text-center text-blue" :value="items?.[props.productID]" @change="(event) => (items[props.productID] = event.target.value)" />
      <button class="bg-[#EFEFEF] w-[30px] flex items-center justify-center" @click="add(props.productID, items[props.productID] + 1)">
        <PlusIcon />
      </button>
    </div>
  </div>
</template>

<script setup>
const props = defineProps(['productID']);
const { items, add } = useCart();
</script>
