<template>
  <main class="container">
    <div class="breadcrumbs">
      <NuxtLink to="/">Главная </NuxtLink>
      <NuxtLink :to="page?.uri" v-for="page in JSON.parse(category.data.breadcrumbs)" :key="page.uri">{{ page.name }} </NuxtLink>
      <span>{{ category.data.name }}</span>
    </div>
    <h1>{{ category.data.name }}</h1>
    <div class="grid grid-cols-5 gap-2.5">
      <div class="hidden xl:block">
        <Filters :blocks="category.blocks" />
      </div>
      <div class="col-span-5 xl:col-span-4">
        <template v-if="products.total === 0"> Результатов не найдено </template>
        <template v-else>
          <div class="text-[#E5A35B] mb-4">Всего {{ pluralize(products.total, ['товар', 'товара', 'товаров']) }}</div>
          <SortingLinks :uri="uri" />

          <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-2.5 gap-y-8 products-grid">
            <ProductCard v-for="product in products.data" :key="product.productID" :product="product" />
          </div>
          <PaginationBox :total="products.total" v-if="products.total > 12" />
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

if (1) {
  throw createError({ statusCode: 404, statusMessage: 'Page Not Found' });
}

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
