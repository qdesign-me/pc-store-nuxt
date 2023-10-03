import db from '../../../db/db';

async function getProduct(sql: string) {
  const [data] = await db.execute(sql);
  return data[0];
}

async function getSimilar(sql: string) {
  const [data] = await db.execute(sql);
  return data;
}

async function getFeatures(sql: string) {
  const [data] = await db.execute(sql);
  return data;
}

export default defineEventHandler(async (event) => {
  console.log('API PRODUCTS/ONE');
  const body = await readBody(event);
  const uri = body.uri;

  const data = await getProduct(
    `select (select group_concat(ip.filename) from site_pictures ip where ip.productID=p.productID group by ip.productID) as img, p.productID, p.categoryID, p.model, p.name, c.uri as curi, p.description, p.enabled, p.meta_description, p.is_auction, p.is_new, p.Price_bn, p.PriceSale_bn, c.name as cat_name, c.uri , c.breadcrumbs from site_products p join site_categories c on c.categoryID=p.categoryID  where p.uri='${uri}' limit 1`
  );

  let products = await getSimilar(
    `select (select concat('https://win7.by/data/big/', thumbnail) from site_pictures where photoID=site_products.default_picture) as img, productID, name, Price_bn, PriceSale_bn, uri, is_auction, is_new from site_products where  categoryID='${data.categoryID}' and productID<>${data.productID} and enabled=1 limit 4`
  );

  data['features'] = await getFeatures(
    `select sfop.value,  sf.label, sf.tooltip, sf.filter_type, sf.suffix from site_features_on_products sfop join site_products_features sf on sf.featureID = sfop.featureID where sfop.productID=${data.productID} order by sf.sort_order`
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
