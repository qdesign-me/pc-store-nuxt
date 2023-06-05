import { useAppStore } from '~/stores/app';

export default defineNuxtPlugin({
  name: 'app-init',
  enforce: 'pre',
  hooks: {
    async 'app:created'() {
      console.log('app:created');
      const nuxtApp = useNuxtApp();
      const store = useAppStore(nuxtApp.$pinia);
      const hostname = process?.env?.BASE_URL ?? '';
      const initData = await fetch(`${hostname}/api/config`).then((res) => res.json());
      store.config = initData.config;
    },
  },
});
