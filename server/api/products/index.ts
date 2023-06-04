import db from '../../../db/db';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { take = 100, sortby = 'popular', sortdir = 'desc', where = {} } = body;
  const select = `(select concat('https://win7.by/data/big/', thumbnail) from iven_product_pictures where photoID=site_products.default_picture) as img, productID, name, Price_bn, PriceSale_bn, uri, is_auction, is_new`;
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
  const sql = `select ${select} from site_products   where enabled=1 and ${whereCond} order by ${sorttypes[sortby]} ${sortdir} limit ${take}`;
  console.log(sql);
  const [data] = await db.execute(sql);

  return {
    data,
  };
});
