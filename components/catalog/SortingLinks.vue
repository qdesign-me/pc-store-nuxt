<template>
  <div class="text-sm flex gap-3 mb-6">
    Сортировать
    <div v-for="link in Object.keys(links)" class="flex gap-2 items-center cursor-pointer" :class="{ 'text-blue': filters['sortby'] === link }" @click="handleClick(link)">
      {{ links[link] }}
      <template v-if="link !== 'popular'">
        <ChevronDownIcon v-if="filters['sortby'] === link && filters['sortdir'] == 'asc'" width="8" height="5" class="rotate-180" />
        <ChevronDownIcon v-if="filters['sortby'] === link && filters['sortdir'] == 'desc'" width="8" height="5" />
      </template>
    </div>
  </div>
</template>

<script setup>
const links = {
  popular: 'по популярности',
  price: 'по цене',
  // rank: 'по рейтингу',
  // reviews: 'по отзывам',
  //video: 'по обзорам',
  name: 'по названию',
};

const filters = inject('filters');

const handleClick = (link) => {
  filters['sortdir'] = link === 'popular' ? 'desc' : filters['sortby'] !== link ? 'asc' : filters['sortdir'] === 'asc' ? 'desc' : 'asc';
  filters['sortby'] = link;
};
</script>
