export const useCart = () => {
  const highlight = useState<null | any>(() => null);
  const items = useCookie<Record<string, any>>('items');
  items.value = items.value || {};

  const add = (productID: number, qty: number, isNew: boolean = false) => {
    const newItems = { ...items.value, [productID]: qty } as Record<string, number>;
    if (!qty) delete newItems[String(productID)];
    items.value = newItems;

    if (isNew) highlight.value = { [productID]: 1 };
  };

  const clearHighlight = () => {
    highlight.value = null;
  };
  const remove = (productID: number) => {
    const newItems = { ...items.value };
    delete newItems[String(productID)];
    items.value = [newItems];
  };
  const clear = () => (items.value = {});

  const total = computed(() => Object.values(items.value ?? {}).reduce((acc, item) => acc + +item, 0));

  const hasItems = computed(() => Object.keys(items.value).length > 0);
  return {
    items,
    add,
    remove,
    clear,
    hasItems,
    total,
    highlight,
    clearHighlight,
  };
};
