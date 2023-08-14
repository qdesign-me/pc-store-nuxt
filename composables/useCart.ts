export const useCart = () => {
  const items = useCookie<Record<string, any>>('items');
  items.value = items.value || {};

  const add = (productID: number, qty: number) => {
    const newItems = { ...items.value, [productID]: qty };
    if (!qty) delete newItems[String(productID)];
    items.value = newItems;
  };
  const remove = (productID: number) => {
    const newItems = { ...items.value };
    delete newItems[String(productID)];
    items.value = newItems;
  };
  const clear = () => (items.value = []);

  const total = computed(() => Object.values(items.value ?? {}).reduce((acc, item) => acc + +item, 0));

  const hasItems = computed(() => Object.keys(items.value).length > 0);
  return {
    items,
    add,
    remove,
    clear,
    hasItems,
    total,
  };
};
