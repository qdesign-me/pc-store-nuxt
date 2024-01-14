export const useThanks = () => {
  const value = useCookie('thanks');
  const message = useCookie('thanksmessage');
  const hide = () => {
    value.value = 'hidden';
    message.value = '';
  };
  const show = (customMessage = '') => {
    value.value = 'show';
    message.value = customMessage;
  };

  return {
    value,
    show,
    hide,
    message,
  };
};
