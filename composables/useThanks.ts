export const useThanks = () => {
  const value = useCookie<number[]>('thanks');

  const hide = () => {
    value.value = 'hidden';
  };
  const show = () => {
    value.value = 'show';
  };

  return {
    value,
    show,
    hide,
  };
};
