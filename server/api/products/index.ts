import db from '../../../db/db';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { take = 4, sortby = 'popular', sortdir = 'desc', filters = {} } = body;
  const select = 'productID, name, Price_bn, PriceSale_bn, uri, is_auction, is_new';
  const sorttypes = {
    name: 'name',
    popular: 'viewed_times',
    price: 'Price_bn',
    rank: 'name',
    reviews: 'name',
    video: 'name',
  };

  const where = Object.keys(filters).length
    ? Object.keys(filters)
        .map((key) => `${key}='${filters[key]}'`)
        .join(' and ')
    : 1;

  const [data] = await db.execute(`select ${select} from site_products where enabled=1 and ${where} order by ${sorttypes[sortby]} ${sortdir} limit ${take}`);

  return {
    total: 4,
    data,
  };
});
