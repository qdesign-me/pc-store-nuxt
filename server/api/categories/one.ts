import db from '../../../db/db';

const getFilters = async (category: { categoryID: number; uri: string }) => {
  const sql = `select spf.label, spf.tooltip, spf.alias, spf.suffix, spf.filter_type, spf.sort_value, spf.preffered_values, group_concat(distinct sfop.value) as value from  site_features_on_products sfop 
  join site_features_on_categories sfoc on sfoc.featureID=sfop.featureID and sfoc.categoryID=${category?.categoryID}
  join site_products_features spf on spf.featureID=sfop.featureID 
  join site_products sp on sp.productID = sfop.productID 
  join site_categories sc on sc.categoryID = sp.categoryID and sc.uri like '${category.uri}%' 
  group by label, tooltip, alias `;
  const [data] = await db.execute(sql);
  return data;
};

const getMinMax = async (uri: string) => {
  const sql = `select min(Price_bn) as priceMin, max(Price_bn) from site_products p join site_categories c on c.categoryID = p.categoryID  where c.uri='${uri}'`;
  const [data] = await db.execute(sql);
  return {
    min: data[0]['priceMin'],
    max: data[0]['priceMax'],
  };
};

const getCategory = async (uri: string) => {
  const sql = `select categoryID, name, uri, meta_description, breadcrumbs from site_categories where uri='${uri}'`;
  const [data] = await db.execute(sql);
  return data[0];
};

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const data = await getCategory(body.uri);
  const blocks = await getFilters(data);
  const minmax = await getMinMax(body.uri);

  return {
    blocks,
    data,
    minmax,
  };
});
