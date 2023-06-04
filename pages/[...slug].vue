<template>
  <pre>
      {{ parsed }}
    </pre
  >
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
        <template v-if="results.total === 0"> Результатов не найдено </template>
        <template v-else>
          <SortingLinks :uri="uri" />
          <div class="grid grid-cols-4 gap-x-2.5 gap-y-8">
            <ProductCard v-for="product in results.data" :key="product.productID" :product="product" />
          </div>
          <Pagination v-if="results.total > 12" :total="results.total" :uri="uri" />
        </template>
      </div>
    </div>
  </main>
</template>
<script async setup>
const router = useRouter();
console.log();

const filters = reactive(router.currentRoute.value.query);
provide('filters', filters);
const results = {};
const uri = router.currentRoute.value.path;
const { data: category } = await useFetch('/api/categories/one', {
  method: 'POST',
  body: {
    uri,
  },
});

const searchQuery = computed(() => buildQuery(filters));

watch(searchQuery, () => {
  console.log('changed searchQuery', searchQuery.value);
  console.log(router.currentRoute.value.path);
  router.push(`${uri}${searchQuery.value}`);
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
