//@ts-nocheck
import { notAllowedCats } from '~/configs';
import db from '../../../db/db';

async function fetchAll(sql: string) {
  const [data] = await db.execute(sql);
  return data;
}
async function fetchRow(sql: string) {
  const [data] = await db.execute(sql);
  return data[0];
}
async function fetchColumn(sql: string) {
  const [data] = await db.execute(sql);
  const columns = Object.keys(data[0]);
  return data[0][columns[0]];
}

async function getKurs() {
  const [data] = await db.execute(`SELECT currency_value FROM iven_currency_types where name='BYR'`);
  return data[0].currency_value;
}

export default defineEventHandler(async (event) => {
  console.log('API CATEGORIES/PRODUCTS');
  const body = await readBody(event);
  const {
    uri,
    filters: { take = 12, sortby = 'popular', sortdir = 'desc', page = 1, ...rest },
  } = body;

  const kurs = await getKurs();

  const skip = (page - 1) * 12;

  const select = `(select group_concat(ip.filename) from iven_product_pictures ip where ip.productID=p.productID group by ip.productID) as img, 
   p.productID, p.name, ROUND(p.Price * ${kurs}, 2) as Price, ROUND(p.PriceSale * ${kurs}, 2) as PriceSale, p.uri, p.is_auction, p.is_new `;
  const sorttypes: Record<string, string> = {
    name: 'p.name',
    popular: 'p.viewed_times',
    price: 'p.Price',
    rank: 'p.name',
    reviews: 'p.name',
    video: 'p.name',
  };
  let priceFilter = '';
  let andFilters = Object.entries(
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
        priceFilter = `and ROUND(p.Price * ${kurs}, 2) between ${priceFrom} and ${priceTo}`;
        return priceFilter;
      }
      if (field === 'q') {
        const q = values.value.trim();
        return `and (p.name like '%${q}%' )`;
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

      return `and productID in (select fop.productID from iven_features_on_products fop  join iven_products_features spf on spf.featureID = fop.featureID and spf.alias='${field}' where ${condition})`;
    })
    .join(' ');

  const results = { data: [], total: 0 };

  const urlCheck = ['/search', '/top-prodazh', '/novinki', '/akcii'].includes(uri) ? '' : `join iven_categories c on c.categoryID = p.categoryID and c.fullPath like '${uri}%'`;
  if (uri === '/akcii') {
    andFilters += ' and p.PriceSale > 0';
  }
  if (uri === '/novinki') {
    andFilters += ' and p.is_new > 0';
  }
  if (uri === '/top-prodazh') {
    // const [data] = await db.execute(`select ProductID as ids from iven_products where enabled=1 order by viewed_times desc limit 100`);
    // const ids = data.map(({ ids }) => ids).join(',');
    // andFilters += ` and p.ProductID in (${ids})`;
    andFilters += ` and p.viewed_times > 1000`;
  }
  const sql = `select ${select} 
  from iven_products p 
  ${urlCheck}
  where p.enabled=1 and p.categoryID not in (${notAllowedCats.join(',')})  ${andFilters} order by ${sorttypes[sortby]} ${sortdir} limit ${skip}, ${take}`;
  console.log({ sql });
  results.data = await fetchAll(sql);

  const total = await fetchColumn(`select count(*) as total from iven_products p 
  ${urlCheck}
  where p.enabled=1 and p.categoryID not in (${notAllowedCats.join(',')}) ${andFilters}`);

  const { price_min, price_max } = await fetchRow(`select min(ROUND(p.Price * ${kurs}, 2)) as price_min, max(ROUND(p.Price * ${kurs}, 2)) as price_max
  from iven_products p 
  ${urlCheck}
  where p.enabled=1 and p.categoryID not in (${notAllowedCats.join(',')}) ${andFilters.replace(priceFilter, '')} `);
  return { ...results, uri, total, price_min, price_max, kurs };
});
