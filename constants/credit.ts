export const cards = [
  { title: 'Черепаха', period: 8, percent: 6, img: '/img/info/vtb.png' },
  { title: 'Халва', period: 2, percent: 6, img: '/img/info/halva.png' },
  { title: 'Магнит', period: 3, percent: 6, img: '/img/info/magnit.png' },
];

export const banks = [
  {
    title: 'Беларусбанк',
    img: '/img/info/belarusb-logo.png',
    variants: [
      { title: 'На срок до 6 мес.', period: 6, percent: 5 },
      { title: 'На срок до 9 мес.', period: 9, percent: 18 },
      { title: 'На срок до 12 мес.', period: 12, percent: 16 },
      { title: 'На срок до 24 мес.', period: 24, percent: 15 },
    ],
  },
  {
    title: 'ВТБ',
    img: '/img/info/vtb-logo.png',
    variants: [
      { title: 'На срок 6 мес', period: 6, percent: 20 },
      { title: 'На срок 12 мес', period: 12, percent: 20 },
      { title: 'На срок 24 мес', period: 24, percent: 20 },
      { title: 'На срок 36 мес', period: 36, percent: 20 },
    ],
  },
];
export const calcFullPrice = (price: number, percent: number) => {
  return ((price * (100 + percent)) / 100).toFixed(2);
};
export const calcFullPricePeriod = (price: number, percent: number, period: number) => {
  return (+calcFullPrice(price, percent) / period).toFixed(2);
};
