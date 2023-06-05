import { useAppStore } from '~/stores/app';

export default defineNuxtPlugin({
  name: 'app-init',
  enforce: 'pre',
  hooks: {
    async 'app:created'() {
      console.log('app:created');
      const nuxtApp = useNuxtApp();
      const store = useAppStore(nuxtApp.$pinia);
      if (process) {
        const hostname = process?.env?.NUXT_PUBLIC_HOSTNAME;
        if (hostname?.length) {
          const initData = await fetch(`${hostname}/api/config`).then((res) => res.json());
          store.config = initData.config;
        }
      }
    },
  },
});
