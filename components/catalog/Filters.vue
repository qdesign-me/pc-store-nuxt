<template>
  <div class="xl:pr-10 flex-col gap-4 xl:flex">
    <div class="btn flex w-full relative is-plain xl:hidden" @click="showFilters"><SortAndFilter />Сортировка и фильтры</div>
    <div class="hidden xl:block all-filters">
      <div class="text-center text-sm font-medium border-b border-[#D9D9D9] pt-2 pb-6 -mx-5 px-5 relative xl:hidden">
        Сортировка и фильтры <button @click="hideFilters"><CloseIcon class="absolute top-2 right-5" /></button>
      </div>
      <div class="inside">
        <div class="is-filter">
          <FilterItemAsPrice :min="Math.floor(props.products?.price_min)" :max="Math.ceil(props.products?.price_max)" :uri="props.uri" />
        </div>
        <div v-for="block in props.blocks" :key="block.label" class="is-filter">
          <div class="label-wrap">
            <div class="label">{{ block.label }}</div>
            <Tooltip v-if="block.tooltip">
              <div class="help-trigger"></div>
              <template #text>{{ block?.tooltip }}</template>
            </Tooltip>
          </div>

          <FilterItem :block="block" :uri="props.uri" />
        </div>
        <div v-if="O">
          <button class="btn" @click="emit('reset')">Очичтить фильтры <span class="filters-clear"></span></button>
        </div>

        <SortingLinks :uri="uri" />
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps(['blocks', 'products', 'uri']);
const emit = defineEmits(['reset']);

const showFilters = () => {
  document.querySelector('body').classList.add('mobi-filters');
};
const hideFilters = () => {
  document.querySelector('body').classList.remove('mobi-filters');
};
</script>
