export function price(price: number | string) {
  return price
    ?.toLocaleString('ru-RU', {
      style: 'currency',
      currency: 'BYN',
    })
    .replace('BYN', 'Br')
    .trim();
}
