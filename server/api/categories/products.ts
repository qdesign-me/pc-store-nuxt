//@ts-nocheck
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
  const {
    uri,
    filters: { take = 12, sortby = 'popular', sortdir = 'desc', page = 1, ...rest },
  } = body;

  const skip = (page - 1) * 12;

  const select = `(select group_concat(ip.filename) from site_pictures ip where ip.productID=p.productID group by ip.productID) as img, 
  c.uri, p.productID, p.name, p.Price_bn, p.PriceSale_bn, p.uri, p.is_auction, p.is_new `;
  const sorttypes: Record<string, string> = {
    name: 'p.name',
    popular: 'p.viewed_times',
    price: 'p.Price_bn',
    rank: 'p.name',
    reviews: 'p.name',
    video: 'p.name',
  };

  const andFilters = Object.entries(
    Object.keys(rest).reduce((acc, key) => {
      if (['', undefined, null].includes(rest[key])) return acc;
      let clean = key.replace('[from]', '').replace('[to]', '');
      const current = { ...acc[clean] };
      if (key.includes(`[from]`)) return { ...acc, [clean]: { ...current, from: rest[key] } };
      if (key.includes(`[to]`)) return { ...acc, [clean]: { ...current, to: rest[key] } };
      return { ...acc, [clean]: { ...current, value: rest[key] } };
    }, {})
  )
    .map((row) => {
      const field = row[0];
      let condition = '';
      const values = row[1];
      if (field === 'price') {
        const priceTo = values.to ?? 9999999;
        const priceFrom = values.from ?? 0;
        return `and p.Price_bn between ${priceFrom} and ${priceTo}`;
      }

      if (values.to && !values.from) {
        condition = `(fop.value <= ${values.to})`;
      } else if (values.from && !values.to) {
        condition = `(fop.value >= ${values.from})`;
      } else if (values.from && values.to) {
        condition = `(fop.value >= ${values.from} and fop.value <= ${values.to})`;
      } else {
        condition = `fop.value in (${values.value
          .split(',')
          .filter((item: string) => item.length)
          .map((item: string) => "'" + item + "'")} )`;
      }

      return `and productID in (select fop.productID  from site_features_on_products fop  join site_products_features spf on spf.featureID = fop.featureID and spf.alias='${field}' where ${condition})`;
    })
    .join(' ');

  const results = { data: [], total: 0 };
  const sql = `select ${select}
  from site_products p 
  join site_categories c on c.categoryID = p.categoryID and c.uri like '${uri}%' 
   where 1 ${andFilters} order by ${sorttypes[sortby]} ${sortdir} limit ${skip}, ${take}`;

  results.data = await fetchAll(sql);

  results.total = await fetchColumn(`select count(*) as total
  from site_products p 
  join site_categories c on c.categoryID = p.categoryID  and c.uri like '${uri}%' 
  where 1 ${andFilters} `);
  return results;
});
