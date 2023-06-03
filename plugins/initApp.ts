import { useAppStore } from '~/stores/app';

export default defineNuxtPlugin({
  name: 'app-init',
  enforce: 'pre',
  hooks: {
    async 'app:created'() {
      console.log('app:created');
      const nuxtApp = useNuxtApp();
      const store = useAppStore(nuxtApp.$pinia);
      const initData = await fetch('http://localhost:3000/api/config').then((res) => res.json());
      store.config = initData.config;
    },
  },
});
