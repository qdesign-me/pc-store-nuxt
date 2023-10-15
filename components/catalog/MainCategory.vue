<template>
  <main class="container">
    <div class="breadcrumbs">
      <NuxtLink to="/">Главная </NuxtLink>

      <span>{{ props?.data.name }}</span>
    </div>
    <h1>{{ props?.data.name }}</h1>

    <div class="grid md:grid-cols-4 2xl:grid-cols-6 gap-2.5 box-maincat">
      <div class="item col-span-2" v-for="(node, index) in props?.data.nodes" :key="node.categoryID">
        <div class="it" v-if="node.nodes">
          <BigLogo class="bg z-[0]" v-if="!index" />
          <NuxtLink :to="node.uri" class="relative z-[10]">
            <div class="note">{{ props.data.name }}</div>
            <div class="title-sm">{{ node.name }}</div>
            <div class="note">
              <strong>{{ node.total }}</strong> {{ pluralize(node.total, ['товар', 'товара', 'товаров']).replace(node.total, '') }}
            </div>
          </NuxtLink>
          <div class="catlinks mt-auto lg:max-w-[70%] pt-4 z-[2]">
            <NuxtLink :to="link.uri" v-for="(link, index) in node?.nodes" :key="link.categoryID" v-show="index < 10">{{ link.name }}</NuxtLink>
            <div v-if="node?.nodes.length > 10" class="text-xs leading-[20px]">+ {{ node?.nodes.length - 10 }} еще</div>
          </div>
          <div class="img">
            <img loading="lazy" :src="`/img/products/komplektuyuszie/${node.categoryID}.png`" alt="" v-if="config.includes(node.categoryID)" />
          </div>
        </div>
        <NuxtLink :to="node.uri" v-else class="it">
          <BigLogo class="bg" v-if="!index" />
          <div class="relative z-[10]">
            <div class="note">{{ props.data.name }}</div>
            <div class="title-sm">{{ node.name }}</div>
            <div class="note">
              <strong>{{ node.total }}</strong> {{ pluralize(node.total, ['товар', 'товара', 'товаров']).replace(node.total, '') }}
            </div>
          </div>

          <div class="img">
            {{ node.categoryID }}
            <img loading="lazy" :src="`/img/products/komplektuyuszie/${node.categoryID}.png`" alt="" v-if="config.includes(node.categoryID)" />
          </div>
        </NuxtLink>
      </div>
    </div>
  </main>
</template>

<script setup>
const props = defineProps(['data']);
const config = [2, 4, 3, 5, 6, 8, 76, 9, 10, 16, 19, 178, 28, 18, 171, 215, 554, 378, 812, 423, 602, 162, 172, 29, 32, 389];
</script>
