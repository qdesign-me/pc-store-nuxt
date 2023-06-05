import db from '../../../db/db';

async function fetchAll(sql: string) {
  const [data] = await db.execute(sql);
  return data;
}
async function fetchColumn(sql: string) {
  const [data] = await db.execute(sql);
  const columns = Object.keys(data[0]);
  return data[0][columns[0]];
}

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { take = 12, sortby = 'popular', sortdir = 'desc', where = {} } = body;
  const select = `(select concat('https://win7.by/data/big/', thumbnail) from iven_product_pictures where photoID=p.default_picture) as img, 
  c.uri, p.productID, p.name, p.Price_bn, p.PriceSale_bn, p.uri, p.is_auction, p.is_new `;
  const sorttypes: Record<string, string> = {
    name: 'p.name',
    popular: 'p.viewed_times',
    price: 'p.Price_bn',
    rank: 'p.name',
    reviews: 'p.name',
    video: 'p.name',
  };
  const uri = body.uri;
  const results = { data: [], total: 0 };
  const sql = `select ${select}
  from site_products p 
  join site_categories c on c.categoryID = p.categoryID  and c.uri like '${uri}%' 
   where p.enabled=1 order by ${sorttypes[sortby]} ${sortdir} limit ${take}`;

  console.log(sql, body);
  results.data = await fetchAll(sql);

  results.total = await fetchColumn(`select count(*) as total
  from site_products p 
  join site_categories c on c.categoryID = p.categoryID  and c.uri like '${uri}%' 
   where p.enabled=1`);

  return results;
});
