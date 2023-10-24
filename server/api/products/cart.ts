import db from '../../../db/db';

async function getKurs() {
  const [data] = await db.execute(`SELECT currency_value FROM iven_currency_types where name='BYR'`);
  return data[0].currency_value;
}

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { items } = body;

  if (!items || Object.keys(items).length === 0)
    return {
      total: 0,
      data: [],
    };
  console.log('API PRODUCTS/CART');

  const kurs = await getKurs();

  const ids = Object.keys(items);

  const whereCond = `productID in (${ids})`;

  const sql = `select (select ip.filename from iven_product_pictures ip where ip.productID=iven_products.productID  limit 1) as img, productID, name, warranty, model, ROUND(Price * ${kurs}, 2) as Price, ROUND(PriceSale * ${kurs}, 2) as PriceSale, uri, is_auction, is_new from iven_products where enabled=1 and ${whereCond}`;

  let [data] = await db.execute(sql);

  const total = {
    qty: 0,
    price: 0,
  };

  data = data.map((item: Record<string, any>) => {
    const qty = items[item.productID];
    const itemTotal = (qty * item.Price).toFixed(2);
    total.qty += qty;
    total.price += +itemTotal;
    return { ...item, qty, itemTotal };
  });

  return {
    total,
    data,
  };
});
