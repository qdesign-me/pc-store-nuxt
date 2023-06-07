<template>
  <main class="container">
    <div class="breadcrumbs">
      <NuxtLink to="/">Главная </NuxtLink>
      <NuxtLink :to="page.uri" v-for="page in JSON.parse(category.data.breadcrumbs)" :key="page.uri">{{ page.name }} </NuxtLink>
      <span>{{ category.data.name }}</span>
    </div>
    <h1 class="mb-10 h2">{{ category.data.name }}</h1>
    <div class="grid grid-cols-5 gap-2.5">
      <Filters :blocks="category.blocks" />
      <div class="col-span-4">
        <template v-if="products.total === 0"> Результатов не найдено </template>
        <template v-else>
          <div class="text-[#E5A35B] mb-4">Всего {{ pluralize(products.total, ['товар', 'товара', 'товаров']) }}</div>
          <SortingLinks :uri="uri" />
          <div class="grid grid-cols-4 gap-x-2.5 gap-y-8">
            <ProductCard v-for="product in products.data" :key="product.productID" :product="product" />
          </div>
          <Pagination :total="products.total" v-if="products.total > 12" />
        </template>
      </div>
    </div>
  </main>
</template>
<script async setup>
const route = useRoute();
const filters = reactive(route.query);

provide('filters', filters);
const searchQuery = computed(() => buildQuery(filters));
const uri = route.path;

const { data: category } = await useFetch('/api/categories/one', {
  method: 'POST',
  body: {
    uri,
  },
});

const { data: products } = await useFetch('/api/categories/products', {
  method: 'POST',
  body: {
    uri,
    filters,
  },
});

watch(searchQuery, () => {
  navigateTo(`${uri}${searchQuery.value}`);
});

definePageMeta({
  layout: 'default',
});

const title = `${category.value.data?.name} | Интернет-магазин Iven`;
const description = category.value.data?.meta_description ? category.value.data?.meta_description : `${category.value.data?.name} в интернет-магазине Iven.`;

useSeoMeta({
  title: () => title,
  ogTitle: () => title,
  description: () => description,
  ogDescription: () => description,
});
</script>
