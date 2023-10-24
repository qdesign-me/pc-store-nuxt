import db from '../../../db/db';

async function getKurs() {
  const [data] = await db.execute(`SELECT currency_value FROM iven_currency_types where name='BYR'`);
  return data[0].currency_value;
}

export default defineEventHandler(async (event) => {
  console.log('API PRODUCTS/INDEX');
  const body = await readBody(event);
  const { take = 100, sortby = 'popular', sortdir = 'desc', where = {} } = body;
  const kurs = await getKurs();
  const select = `(select group_concat(ip.filename separator '|') from iven_product_pictures ip where ip.productID=iven_products.productID group by ip.productID) as img, productID, name,  model, ROUND(Price * ${kurs}, 2) as Price, ROUND(PriceSale * ${kurs}, 2) as PriceSale, LOWER(uri) as uri, is_auction, is_new`;
  const sorttypes: Record<string, string> = {
    name: 'name',
    popular: 'viewed_times',
    price: 'Price',
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
  const sql = `select ${select} from iven_products  where enabled=1 and ${whereCond} order by ${sorttypes[sortby]} ${sortdir} limit ${take}`;

  const [data] = await db.execute(sql);

  return {
    data,
  };
});
