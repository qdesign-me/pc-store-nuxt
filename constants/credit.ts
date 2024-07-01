export const cards = [
  { title: 'Черепаха', period: 8, percent: 7, img: '/img/info/vtb.png' },
  { title: 'Халва', period: 2, percent: 7, img: '/img/info/halva.png' },
  { title: 'Магнит', period: 3, percent: 7, img: '/img/info/magnit.png' },
];

export const banks = [
  {
    title: 'Беларусбанк',
    img: '/img/info/belarusb-logo.png',
    variants: [
      { title: 'на срок до 6 мес.', period: 6, calcperiod: 5, percent: 5 },
      { title: 'на срок до 9 мес.', period: 9, calcperiod: 5, percent: 6 },
      { title: 'на срок до 12 мес.', period: 12, calcperiod: 5, percent: 8 },
      { title: 'на срок до 24 мес.', period: 24, calcperiod: 5, percent: 9 },
    ],
  },
  {
    title: 'ВТБ',
    img: '/img/info/vtb-logo.png',
    variants: [
      { title: 'на срок 12 мес', period: 12, calcperiod: 12, percent: 12 },
      { title: 'на срок 24 мес', period: 24, calcperiod: 24, percent: 22 },
      { title: 'на срок 36 мес', period: 36, calcperiod: 36, percent: 34 },
    ],
  },
];
export const calcFullPrice = (price: number, percent: number) => {
  return ((price * (100 + percent)) / 100).toFixed(2);
};
export const calcFullPricePeriod = (price: number, percent: number, period: number) => {
  return (+calcFullPrice(price, percent) / period).toFixed(2);
};
