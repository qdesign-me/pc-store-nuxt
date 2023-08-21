import db from '../../../db/db';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { items } = body;

  const ids = Object.keys(items);

  const whereCond = `productID in (${ids})`;

  const sql = `select (select group_concat(ip.filename) from site_pictures ip where ip.productID=site_products.productID group by ip.productID) as img, productID, name,  model, Price_bn, PriceSale_bn, uri, is_auction, is_new from site_products where enabled=1 and ${whereCond}`;

  let [data] = await db.execute(sql);

  const total = {
    qty: 0,
    price: 0,
  };

  data = data.map((item: Record<string, any>) => {
    const qty = items[item.productID];
    total.qty += qty;
    total.price += qty * item.Price_bn;
    return { ...item, qty };
  });

  return {
    total,
    data,
  };
});
