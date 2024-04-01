export function price(price: number | string) {
  return Number(price)
    ?.toLocaleString('ru-RU', {
      style: 'currency',
      currency: 'BYN',
    })
    .replace('BYN', 'Br')
    .trim();
}
