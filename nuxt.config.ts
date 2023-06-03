// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  components: ['~/components/layout', '~/components/general', '~/components/icons', '~/components/compare', '~/components/promo', '~/components/product', '~/components'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  css: ['~/assets/css/main.scss'],
  modules: ['@pinia/nuxt'],
  pinia: {
    autoImports: ['defineStore', 'acceptHMRUpdate'],
  },
});
