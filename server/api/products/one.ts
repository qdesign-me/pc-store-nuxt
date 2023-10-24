import db from '../../../db/db';

async function getProduct(sql: string) {
  const [data] = await db.execute(sql);
  return data[0];
}

async function getSimilar(sql: string) {
  console.log('similar', sql);
  const [data] = await db.execute(sql);
  return data;
}

async function getFeatures(sql: string) {
  const [data] = await db.execute(sql);
  return data;
}

async function getKurs() {
  const [data] = await db.execute(`SELECT currency_value FROM iven_currency_types where name='BYR'`);
  return data[0].currency_value;
}

export default defineEventHandler(async (event) => {
  console.log('API PRODUCTS/ONE');
  const body = await readBody(event);
  const uri = body.uri;

  const kurs = await getKurs();

  const data = await getProduct(
    `select (select group_concat(ip.filename separator '|') from iven_product_pictures ip where ip.productID=p.productID group by ip.productID) as img, p.productID, p.categoryID, p.model, p.name, c.uri as curi, p.description, p.enabled, p.meta_description, p.is_auction, p.is_new, ROUND(p.Price * ${kurs}, 2) as Price, ROUND(p.PriceSale * ${kurs}, 2) as PriceSale, c.name as cat_name, c.fullPath as uri , c.breadcrumbs from iven_products p join iven_categories c on c.categoryID=p.categoryID  where p.uri='${uri}' limit 1`
  );

  await db.execute(`update iven_products set viewed_times=viewed_times+1 where productID=${data['productID']}`);

  let products = await getSimilar(
    `select (select group_concat(filename separator '|') from iven_product_pictures where productID=iven_products.productID) as img, productID, name, ROUND(Price * ${kurs}, 2) as Price, ROUND(PriceSale * ${kurs}, 2) as PriceSale, uri, is_auction, is_new from iven_products where  categoryID='${data.categoryID}' and productID<>${data.productID} and enabled=1 limit 4`
  );

  data['features'] = await getFeatures(
    `select sfop.value,  sf.label, sf.tooltip, sf.filter_type, sf.suffix from iven_features_on_products sfop join iven_products_features sf on sf.featureID = sfop.featureID where sfop.productID=${data.productID} order by sf.sort_order`
  );
  data['features'] = data['features'].map((item: Record<string, any>) => ({
    ...item,
    value: item.filter_type !== 'boolean' ? item.value : item.value === '1' ? 'Да' : 'Нет',
  }));
  const similar = {
    link: data.uri,
    products,
  };

  return {
    data,
    similar,
  };
});
