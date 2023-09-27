import db from '../../../db/db';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { items } = body;

  if (!items || Object.keys(items).length === 0)
    return {
      total: 0,
      data: [],
    };
  console.log('API PRODUCTS/CART 1', JSON.stringify(body));

  const ids = Object.keys(items);

  const whereCond = `productID in (${ids})`;

  const sql = `select (select ip.filename from site_pictures ip where ip.productID=site_products.productID  limit 1) as img, productID, name,  model, Price_bn, PriceSale_bn, uri, is_auction, is_new from site_products where enabled=1 and ${whereCond}`;

  let [data] = await db.execute(sql);

  const total = {
    qty: 0,
    price: 0,
  };

  data = data.map((item: Record<string, any>) => {
    const qty = items[item.productID];
    const itemTotal = qty * item.Price_bn;
    total.qty += qty;
    total.price += itemTotal;
    return { ...item, qty, itemTotal };
  });

  return {
    total,
    data,
  };
});
