<template>
  <div class="note" v-bind="$attrs">
    <span class="underline underline-offset-4"><slot /></span>
    <ArrowRightIcon class="group-hover:translate-x-2 transition" />
  </div>
</template>
