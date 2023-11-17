<template>
  <main class="container" v-if="category?.data">
    <div class="breadcrumbs">
      <NuxtLink to="/">Главная </NuxtLink>

      <NuxtLink v-if="category.data.breadcrumbs" :to="page?.uri" v-for="page in JSON.parse(category.data.breadcrumbs).slice(0, -1)" :key="page.uri"
        >{{ page.name.replaceAll('&amp;quot;', '"') }}
      </NuxtLink>
      <span>{{ category.data.name }}</span>
    </div>

    <div v-if="category.data.name" class="flex items-center gap-3 mb-6 lg:mb-10">
      <h1 class="mb-0">{{ category.data.name }}</h1>
      <Loading :class="pending || uri !== products?.uri ? 'opacity-100' : 'opacity-0'" />
    </div>

    <div class="text text-center max-w-[450px] mx-auto mb-10" v-if="!pending && products?.total === 0">
      <p>
        К сожалению, по Вашему запросу ничего не найдено. Приглашаем вернуться на
        <NuxtLink to="/" class="text-blue underline underline-offset-2">Главную</NuxtLink> страницу либо
        <span class="inline-block text-blue underline underline-offset-2 cursor-pointer">
          <Consultation title="Бесплатная консультация"> обратиться </Consultation>
        </span>
        к нашему консультанту.
      </p>

      <img :src="img" alt="404" width="180" height="180" class="inline-block mx-auto mt-8" />
    </div>

    <template v-if="products?.total > 0 && products.uri === uri">
      <div class="grid grid-cols-5 gap-2.5">
        <div class="col-span-5 xl:col-span-1" v-if="products?.total > 0">
          <Filters :blocks="category.blocks" :products="products" :uri="uri" />
        </div>
        <div class="col-span-5 xl:col-span-4 flex flex-col">
          <div class="catlinks order-[999] mt-5 xl:mt-0 xl:mb-4 xl:order-[0]" v-if="category.children">
            <NuxtLink :to="child.uri" v-for="child in category.children" :key="child.uri">{{ child.name }}</NuxtLink>
          </div>
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
import img from '@/assets/img/404.png';
const router = useRouter();
const filters = computed(() => router.currentRoute.value.query);
import { notAllowedCats } from '../configs/index';
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
if (notAllowedCats.includes(category?.value.data.categoryID)) {
  throw createError({ statusCode: 404, statusMessage: 'Page Not Found' });
}

definePageMeta({
  layout: 'default',
});

const getMeta = (category) => {
  let t = category.name;
  const breadcrumbs = JSON.parse(category.breadcrumbs);
  if (breadcrumbs) {
    const els = breadcrumbs.map((item) => item.name);
    if (els[els.length - 1] !== t) els.push(t);
    t = els.join(' / ');
  }
  const title = `${t} | Iven`;
  const description = category.meta_description ? category.meta_description : `${t} в интернет-магазине Iven.`;
  return {
    title: () => title,
    ogTitle: () => title,
    description: () => description,
    ogDescription: () => description,
  };
};

useSeoMeta(getMeta(category.value?.data));
</script>
