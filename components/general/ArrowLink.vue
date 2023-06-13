<template>
  <div class="note" v-bind="$attrs">
    <span><slot /></span>
    <ArrowRightIcon class="group-hover:translate-x-2 transition" />
  </div>
</template>
