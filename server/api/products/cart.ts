import db from '../../../db/db';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { items } = body;
  const select = `(select group_concat(ip.filename) from site_pictures ip where ip.productID=site_products.productID group by ip.productID) as img, productID, name,  model, Price_bn, PriceSale_bn, uri, is_auction, is_new`;

  const ids = Object.keys(items);
  console.log('start', ids);
  const whereCond = `productID in (${ids})`;

  const sql = `select ${select} from site_products   where enabled=1 and ${whereCond}`;
  console.log({ items, sql });
  const [data] = await db.execute(sql);

  return {
    data,
  };
});
