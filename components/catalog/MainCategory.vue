<template>
  <main class="container">
    <div class="breadcrumbs">
      <NuxtLink to="/">Главная </NuxtLink>

      <span>{{ props?.data.name }}</span>
    </div>
    <h1>{{ props?.data.name }}</h1>

    <div class="grid md:grid-cols-4 2xl:grid-cols-6 gap-2.5 box-maincat">
      <div class="item col-span-2" v-for="(node, index) in props?.data.nodes" :key="node.categoryID">
        <template v-if="node.nodes">
          <BigLogo class="bg z-[0]" v-if="!index" />
          <NuxtLink :to="node.uri" class="relative z-[10]">
            <div class="note">{{ props.data.name }}</div>
            <div class="title-sm">{{ node.name }}</div>
            <div class="note">
              <strong>{{ node.total }}</strong> {{ pluralize(node.total, ['товар', 'товара', 'товаров']).replace(node.total, '') }}
            </div>
          </NuxtLink>
          <div class="links">
            <NuxtLink :to="link.uri" v-for="(link, index) in node?.nodes" :key="link.categoryID" v-show="index < 10">{{ link.name }}</NuxtLink>
            <div v-if="node?.nodes.length > 10" class="text-xs leading-[20px]">+ {{ node?.nodes.length - 10 }} еще</div>
          </div>
          <div class="img">
            <img loading="lazy" :src="config[node.categoryID]" alt="" v-if="config[node.categoryID]" />
          </div>
        </template>
        <NuxtLink :to="node.uri" v-else>
          <BigLogo class="bg" v-if="!index" />
          <div class="relative z-[10]">
            <div class="note">{{ props.data.name }}</div>
            <div class="title-sm">{{ node.name }}</div>
            <div class="note">
              <strong>{{ node.total }}</strong> {{ pluralize(node.total, ['товар', 'товара', 'товаров']).replace(node.total, '') }}
            </div>
          </div>

          <div class="img">
            <img loading="lazy" :src="config[node.categoryID]" alt="" v-if="config[node.categoryID]" />
          </div>
        </NuxtLink>
      </div>
    </div>
  </main>
</template>

<script setup>
const props = defineProps(['data']);
const config = {
  2: '/img/products/komplektuyuszie/intelcore.png',
  4: '/img/products/komplektuyuszie/Intel-lga.png',
  3: '/img/products/komplektuyuszie/cooler.png',
  5: '/img/products/komplektuyuszie/operativka.png',
  6: '/img/products/komplektuyuszie/ssd.png',
  8: '/img/products/komplektuyuszie/videocard.png',
  76: '/img/products/komplektuyuszie/audiocard.png',
  9: '/img/products/komplektuyuszie/controller.png',
  10: '/img/products/komplektuyuszie/optprivod.png',
  16: '/img/products/komplektuyuszie/korpus.png',
  19: '/img/products/komplektuyuszie/blockpit.png',
};
</script>
