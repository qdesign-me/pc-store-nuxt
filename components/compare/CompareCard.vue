<template>
  <div class="flex flex-col gap-2 relative px-14 pt-2 pb-10 text-sm group">
    <button @click="emit('remove', props.product.productID)" class="absolute right-0 top-0 hidden group-hover:block"><CloseIcon /></button>
    <NuxtLink :to="uri">
      <ProductThumbs :data="props.product" class="mx-auto my-2" />
    </NuxtLink>

    <div className="font-semibold text-lg">{{ props.product.Price_Bn }} Bn</div>

    <NuxtLink :to="uri" class="max-w-[240px] mx-auto line-clamp-2">{{ props.product.name }}</NuxtLink>

    <div>ID: {{ props.product.productID }}</div>

    <Add2Cart :productID="props.product.productID" />
  </div>
</template>

<script setup>
const props = defineProps(['product']);
const emit = defineEmits('remove');
const uri = '/p/' + props.product?.uri?.replace('.html', '');
</script>
