<template>
  <main class="container">
    <div class="breadcrumbs"><NuxtLink to="/" class="">Главная </NuxtLink><span>Сохранённые товары</span></div>
    <div class="flex justify-between gap-6 items-start">
      <h1>Сохранённые товары</h1>
      <div v-if="hasItems" class="text-blue flex gap-6 text-sm underline underline-offset-4">
        <button class="hidden md:flex items-center gap-2" @click="onPrint"><PrinterIcon />Распечатать список</button>
        <button class="flex items-center gap-2" @click="clear"><DeleteIcon /><span class="hidden sm:block">Очистить список</span></button>
      </div>
    </div>

    <div v-if="!hasItems" class="flex flex-col items-center justify-center">
      <FavoritesIcon width="100" height="90" class="text-blue mb-6" />
      <div class="mb-2">В избранном пока ничего нет</div>
      <div class="opacity-50">Нажмите <FavoritesIcon class="inline -mt-1" width="21" height="19" /> для добавления в избранное</div>
      <NuxtLink to="/catalog" class="btn is-large mt-10 xl:mb-20 min-w-[300px]">Перейти в каталог</NuxtLink>
    </div>

    <div v-if="hasItems">
      <div class="text-[#E5A35B] text-sm font-medium mb-10">Вы сохранили {{ pluralize(data.data?.length, ['товар', 'товара', 'товаров']) }}</div>
      <ProductList
        :data="
          data.data?.map((item) => ({
            ...item,
            img: item.img.split(',')[0],
          }))
        "
        class="items-favorites"
      >
        <template #controls="row">
          <Add2Compare :productID="row.item.productID" />

          <RemoveButton @click="remove(row.item.productID)" />
        </template>
        <template #price="row">
          <div class="w-[188px]">
            <Add2Cart :productID="row.item.productID" />
          </div>
        </template>
      </ProductList>
    </div>
  </main>
</template>
<script setup>
const router = useRouter();
const { items, hasItems, remove, clear } = useFavorites();

const { data } = await useFetch('/api/products', {
  method: 'POST',
  body: {
    sortby: 'popular',
    sortdir: 'desc',
    where: {
      'productID:in': items,
    },
  },
});

definePageMeta({
  layout: 'default',
});

const meta = {
  title: 'Сохранённые товары | Интернет-магазин Iven',
  description: 'Сохранённые товары.',
};

const onPrint = () => router.push('/print/favorites');

useSeoMeta({
  title: () => meta.title,
  ogTitle: () => meta.title,
  description: () => meta.description,
  ogDescription: () => meta.description,
  robots: 'noindex',
});
</script>
