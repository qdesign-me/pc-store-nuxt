const store = {
  state: () => ({
    config: null,
    items: {},
  }),
};
export const useAppStore = defineStore('app', store);
