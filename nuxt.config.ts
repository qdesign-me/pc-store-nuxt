// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      htmlAttrs: {
        lang: 'ru',
      },
    },
  },
  components: [
    '~/components/mobi',
    '~/components/layout',
    '~/components/general',
    '~/components/icons',
    '~/components/compare',
    '~/components/promo',
    '~/components/product',
    '~/components/catalog',
    '~/components',
  ],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  css: ['~/assets/css/main.scss'],
  modules: ['@pinia/nuxt', 'nuxt-swiper', '@ant-design-vue/nuxt', 'nuxt-simple-sitemap'],
  pinia: {
    autoImports: ['defineStore', 'acceptHMRUpdate'],
  },
  antd: {
    components: ['Image'],
  },
  swiper: {
    modules: ['pagination'],
  },

  sitemap: {
    inferStaticPagesAsRoutes: false,
  },
});
