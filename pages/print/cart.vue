<template>
  <div class="container">
    <table class="simple-table mb-4">
      <thead>
        <tr>
          <th width="120"></th>
          <th width="120"><strong>ID</strong></th>
          <th><strong>Наименование</strong></th>
          <th width="120"><strong>Цена, руб.</strong></th>
          <th class="text-center" width="120"><strong>Кол-во</strong></th>
          <th class="text-right" width="140"><strong>Сумма, руб.</strong></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in data.data">
          <td>
            <div class="img max-w-[80x] flex-shrink-0"><img width="80" :src="'https://win7.by/data/big/' + item.img" /></div>
          </td>
          <td>
            {{ item.model }}
          </td>
          <td>
            {{ item.name }}
          </td>
          <td>
            {{ price(item.Price_bn) }}
          </td>
          <td class="text-center">
            {{ item.qty }}
          </td>
          <td class="text-right">
            {{ price(item.itemTotal) }}
          </td>
        </tr>
        <tr>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td class="text-center"><strong>Итого:</strong></td>
          <td class="text-right">
            <strong>{{ price(data.total.price) }}</strong>
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
const { items } = useCart();

const { data, status } = await useFetch('/api/products/cart', {
  method: 'POST',
  body: {
    sortby: 'popular',
    sortdir: 'desc',
    items: items,
  },
});

// setTimeout(() => window.print(), 2000);

definePageMeta({ layout: 'print' });

const meta = {
  title: 'Корзина | Интернет-магазин Iven',
  description: 'Корзина товаров.',
};
useSeoMeta({
  title: () => meta.title,
  ogTitle: () => meta.title,
  description: () => meta.description,
  ogDescription: () => meta.description,
  robots: 'noindex',
});
</script>
