<template>
  <div class="flex gap-2 w-full add2cart">
    <div class="cart-split relative w-[90px] text-sm">
      <div class="flex border rounded absolute inset-0">
        <button class="bg-[#EFEFEF] w-[30px] flex items-center justify-center" @click="onChange(props.items[props.productID] - 1)">
          <MinusIcon />
        </button>
        <input type="num" class="flex-1 w-2 bg-white text-center text-blue" :value="items?.[props.productID]" @change="(event) => onChange(event.target.value)" />
        <button class="bg-[#EFEFEF] w-[30px] flex items-center justify-center" @click="onChange(props.items[props.productID] + 1)">
          <PlusIcon />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
const emit = defineEmits(['qty']);

const props = defineProps(['productID', 'items', 'add']);

const onChange = (qty) => {
  if (qty == +qty) {
    props.add(props.productID, qty);
    emit('qty', +qty);
  }
};
</script>
