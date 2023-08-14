export const useFavorites = () => {
  const items = useCookie<number[]>('favorites');
  items.value = items.value || [];

  const toggle = (productID: number) => {
    const newItems = items.value.includes(productID) ? items.value.filter((item) => item !== productID) : [...items.value, productID];
    items.value = newItems;
  };
  const remove = (productID: number) => {
    items.value = items.value.filter((item) => item !== productID);
  };
  const clear = () => (items.value = []);

  const hasItems = computed(() => items.value.length > 0);
  return {
    items,
    toggle,
    remove,
    clear,
    hasItems,
  };
};
