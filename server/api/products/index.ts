import db from '../../../db/db';

export default defineEventHandler(async (event) => {
  console.log('API PRODUCTS/INDEX');
  const body = await readBody(event);
  const { take = 100, sortby = 'popular', sortdir = 'desc', where = {} } = body;
  const select = `(select group_concat(ip.filename) from site_pictures ip where ip.productID=site_products.productID group by ip.productID) as img, productID, name,  model, Price_bn, PriceSale_bn, uri, is_auction, is_new`;
  const sorttypes: Record<string, string> = {
    name: 'name',
    popular: 'viewed_times',
    price: 'Price_bn',
    rank: 'name',
    reviews: 'name',
    video: 'name',
  };

  const whereCond = Object.keys(where).length
    ? Object.keys(where)
        .map((key) => {
          const temp = key.split(':');
          const field = temp[0];
          const operator = temp[1] ?? '=';
          let criteria = where[key];
          if (operator === '=') criteria = `'${criteria}'`;
          if (operator === 'in') criteria = `(${criteria})`;
          return `${field} ${operator} ${criteria}`;
        })
        .join(' and ')
    : 1;
  const sql = `select ${select} from site_products  where enabled=1 and ${whereCond} order by ${sorttypes[sortby]} ${sortdir} limit ${take}`;
  console.log(sql, body.where);
  const [data] = await db.execute(sql);

  return {
    data,
  };
});
