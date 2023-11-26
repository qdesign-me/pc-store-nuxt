<template>
  <div class="container">
    <table class="simple-table mb-4">
      <thead>
        <tr>
          <th width="120"></th>
          <th width="120"><strong>ID</strong></th>
          <th><strong>Наименование</strong></th>
          <th width="120"><strong>Цена, руб.</strong></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in data.data">
          <td>
            <div class="img max-w-[80x] flex-shrink-0"><img width="80" :src="'//img.i-ven.by/big/' + item.img" /></div>
          </td>
          <td>
            {{ item.productID }}
          </td>
          <td>
            {{ item.name }}
          </td>
          <td>
            {{ price(item.Price) }}
          </td>
        </tr>
      </tbody>
    </table>
    <strong class="text-sm">Дата: {{ display }}</strong>
  </div>
</template>
<script setup>
const date = new Date();
const display = date.getMonth() + 1 + '/' + date.getDate() + '/' + date.getFullYear() + ' ' + date.getHours() + ':' + date.getMinutes();
const { items } = useFavorites();

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

definePageMeta({ layout: 'print' });

const meta = {
  title: 'Сохранённые товары | Интернет-магазин Iven',
  description: 'Сохранённые товары.',
};
useSeoMeta({
  title: () => meta.title,
  ogTitle: () => meta.title,
  description: () => meta.description,
  ogDescription: () => meta.description,
  robots: 'noindex',
});
</script>
