<template>
  <div class="text-sm flex flex-wrap gap-3 mb-6">
    <div class="block w-full md:inline-block md:w-[initial]">Сортировать</div>
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
const props = defineProps(['uri']);
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
  const newFitlers = { ...filters.value };
  newFitlers['sortdir'] = link === 'popular' ? 'desc' : newFitlers['sortby'] !== link ? 'asc' : newFitlers['sortdir'] === 'asc' ? 'desc' : 'asc';
  newFitlers['sortby'] = link;
  newFitlers['page'] = undefined;
  const searchQuery = buildQuery(newFitlers);
  const path = `${props.uri}${searchQuery}`;
  navigateTo(path);
};
</script>
