<template>
  <div class="pagination">
    <button v-for="link in links" :key="link.page" :class="{ active: current === link.page }" @click="handleClick(link.page)" :title="link.page">{{ link.label }}</button>
  </div>
</template>

<script setup>
const props = defineProps(['total', 'uri']);
const filters = inject('filters');

const current = computed(() => +(filters.value.page ?? 1));

const handleClick = (page) => {
  const newFitlers = { ...filters.value };
  newFitlers.page = page;
  const searchQuery = buildQuery(newFitlers);
  const path = `${props.uri}${searchQuery}`;
  navigateTo(path);
  const box = document.querySelector('.breadcrumbs');
  box.scrollIntoView({ behavior: 'smooth' });
};

const links = computed(() => {
  const out = [];
  const max = Math.ceil(props.total / 12);
  const value = current.value;
  out.push({
    label: 1,
    page: 1,
  });
  if (value < 4) {
    if (max > 1) {
      for (let i = 2; i < Math.min(4, max); i++) {
        out.push({
          label: i,
          page: i,
        });
      }
    }
    if (max > 4) {
      out.push({
        label: '...',
        page: 4,
      });
      if (max)
        out.push({
          label: max,
          page: max,
        });
    }
    if ([2, 3].includes(max)) {
      out.push({
        label: max,
        page: max,
      });
    }
  } else if (value > max - 4) {
    out.push({
      label: '...',
      page: max - 4,
    });
    for (let i = max - 3; i < max; i++) {
      out.push({
        label: i,
        page: i,
      });
    }
    out.push({
      label: max,
      page: max,
    });
  } else {
    out.push({
      label: '...',
      page: value - 2,
    });
    out.push({
      label: value - 1,
      page: value - 1,
    });
    out.push({
      label: value,
      page: value,
    });
    out.push({
      label: value + 1,
      page: value + 1,
    });
    out.push({
      label: '...',
      page: value + 2,
    });
    out.push({
      label: max,
      page: max,
    });
  }

  return out;
});
</script>
