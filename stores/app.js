import Cookies from 'js-cookie';
const store = {
  state: () => ({
    config: null,
    compare: [],
    items: {},
    favorites: [],
  }),

  actions: {
    addCart(productID, count) {
      this.$patch((state) => {
        const items = { ...state.items, [productID]: count };
        if (count === 0) delete items[productID];
        Cookies.set('items', JSON.stringify(items), { expires: 1000000, path: '/' });
        console.log(state, items);
        state.items = items;
      });
    },
    toggleCompare(productID) {
      this.$patch((state) => {
        const items = state.compare.includes(productID) ? state.compare.filter((item) => item !== productID) : [...state.compare, productID];
        Cookies.set('compare', JSON.stringify(items), { expires: 1000000, path: '/' });
        state.compare = items;
      });
    },
    removeCompare(productID) {
      this.$patch((state) => {
        const items = state.compare.filter((item) => item !== productID);
        Cookies.set('compare', JSON.stringify(items), { expires: 1000000, path: '/' });
        state.compare = items;
      });
    },
    clearCompare() {
      this.$patch((state) => {
        Cookies.set('compare', JSON.stringify([]), { expires: 1000000, path: '/' });
        state.compare = [];
      });
    },
    toggleFavorites(productID) {
      this.$patch((state) => {
        const items = state.favorites.includes(productID) ? state.favorites.filter((item) => item !== productID) : [...state.favorites, productID];
        Cookies.set('favorites', JSON.stringify(items), { expires: 1000000, path: '/' });
        state.favorites = items;
      });
    },
  },
};
export const useAppStore = defineStore('app', store);
