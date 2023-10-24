<template>
  <main>
    <div class="container">
      <ProductProfile :data="data.data" />
      <div class="space-y-10 mt-16">
        <ProductProfileRelated :data="data.similar" v-if="data.similar?.products?.length" />
      </div>
    </div>
  </main>
</template>

<script setup>
const route = useRoute();
const uri = route.path.replace('/p/', '') + '.html';
const { data } = await useFetch('/api/products/one', {
  method: 'POST',
  body: {
    uri,
  },
});

definePageMeta({
  layout: 'default',
});

const meta = {
  title: `${data.value.data.name} | Iven`,
  description: data.value.data?.meta_description ? data.value.data?.meta_description : `${data.value.data?.name} в интернет-магазине Iven.`,
  ogImage: data.value.data.img,
  ogType: 'product',
};

useSeoMeta({
  title: () => meta.title,
  ogTitle: () => meta.title,
  description: () => meta.description,
  ogDescription: () => meta.description,
  ogType: () => meta.ogType,
  ogImage: () => meta.ogImage,
});
</script>
