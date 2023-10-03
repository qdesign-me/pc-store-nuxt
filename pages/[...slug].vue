<template>
  <main class="container" v-if="category?.data">
    <div class="breadcrumbs">
      <NuxtLink to="/">Главная </NuxtLink>

      <NuxtLink v-if="category.data.breadcrumbs" :to="`/${page?.uri}`.replace('//', '/')" v-for="page in JSON.parse(category.data.breadcrumbs)" :key="page.uri"
        >{{ page.name }}
      </NuxtLink>
      <span>{{ category.data.name }}</span>
    </div>

    <div v-if="category.data.name" class="flex items-center gap-3 mb-6 lg:mb-10">
      <h1 class="mb-0">{{ category.data.name }}</h1>
      <Loading :class="pending || uri !== products?.uri ? 'opacity-100' : 'opacity-0'" />
    </div>

    <div class="mb-6" v-if="!pending && filters.q && products?.total === 0">По запросу «{{ filters.q }}» ничего не найдено.</div>
    <div class="mb-6" v-else-if="!pending && !filters.q && products?.total === 0">{{ category.data.name }}: ничего не найдено.</div>

    <template v-if="!pending && products?.total === 0">
      <TopSalesBlock />
      <PopularCatsBlock />
      <NewItemsBlock />
    </template>
    <template v-if="products?.total > 0 && products.uri === uri">
      <div class="grid grid-cols-5 gap-2.5">
        <div class="hidden xl:block" v-if="products?.total > 0">
          <Filters :blocks="category.blocks" />
        </div>
        <div class="col-span-5 xl:col-span-4">
          <div class="text-[#E5A35B] mb-4">Всего {{ pluralize(products?.total, ['товар', 'товара', 'товаров']) }}</div>
          <SortingLinks :uri="uri" />
          <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-2.5 gap-y-8 products-grid">
            <ProductCard v-for="product in products?.data" :key="product.productID" :product="product" />
          </div>
          <PaginationBox :uri="uri" :total="products?.total" v-if="products?.total > 12" />
        </div>
      </div>
    </template>
  </main>
</template>
<script async setup>
const router = useRouter();
const filters = computed(() => router.currentRoute.value.query);

provide('filters', filters);
const uri = router.currentRoute.value.path;

const { data: category } = await useFetch('/api/categories/one', {
  method: 'POST',
  body: {
    uri,
  },
});

const { pending, data: products } = await useFetch('/api/categories/products', {
  lazy: true,
  method: 'POST',
  body: {
    uri,
    filters,
  },
});

if (!category?.value.data) {
  throw createError({ statusCode: 404, statusMessage: 'Page Not Found' });
}

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
