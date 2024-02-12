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
    '~/components/account',
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
  modules: ['@pinia/nuxt', 'nuxt-swiper', '@ant-design-vue/nuxt', 'nuxt-simple-sitemap', 'yandex-metrika-module-nuxt3', '@nuxtjs/google-gtag', '@nuxt/image', 'nuxt-scheduler'],
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
  yandexMetrika: {
    id: '95705823',
    clickmap: true,
    trackLinks: true,
    accurateTrackBounce: true,
    webvisor: true,
    trackHash: true,
    ecommerce: 'dataLayer',
  },

  'google-gtag': {
    id: 'G-L2CG7ZPL61',
    config: {},
    debug: true,
    additionalAccounts: [
      {
        id: 'AW-620701504',
        config: {
          send_page_view: false,
        },
      },
    ],
  },
  image: {
    domains: ['win7.by'],
  },
  site: {
    url: 'https://i-ven.by',
  },
});
