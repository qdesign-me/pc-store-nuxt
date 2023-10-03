import db from '../../../db/db';

const getFilters = async (category: { categoryID: number; uri: string }) => {
  return {};
  const sql = `select spf.label, spf.tooltip, spf.alias, spf.suffix, spf.filter_type, spf.sort_value, spf.preffered_values, group_concat(distinct sfop.value) as value from  site_features_on_products sfop 
  join site_features_on_categories sfoc on sfoc.featureID=sfop.featureID and sfoc.categoryID=${category?.categoryID}
  join site_products_features spf on spf.featureID=sfop.featureID 
  join site_products sp on sp.productID = sfop.productID 
  join site_categories sc on sc.categoryID = sp.categoryID and sc.uri like '${category.uri}%' 
  group by label, tooltip, alias `;
  const [data] = await db.execute(sql);
  return data;
};

const getCategory = async (uri: string) => {
  const sql = `select categoryID, name, uri, meta_description, breadcrumbs from site_categories where uri='${uri}'`;

  const [data] = await db.execute(sql);
  return data[0];
};

export default defineEventHandler(async (event) => {
  console.log('API CATEGORIES/ONE');
  const body = await readBody(event);
  if (body.uri === '/search')
    return {
      data: {
        name: 'Поиск',
      },
      blocks: [],
      minmax: {},
    };
  const data = await getCategory(body.uri);
  // const blocks = await getFilters(data);

  return {
    // blocks,
    data,
    // minmax,
  };
});
