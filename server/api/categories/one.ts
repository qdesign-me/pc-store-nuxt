import db from '../../../db/db';

const getFilters = async (category: { categoryID: number; uri: string }) => {
  const sql = `select spf.label, spf.tooltip,  concat('filter_', spf.alias) as alias, spf.suffix, spf.filter_type, spf.sort_value, spf.preffered_values, group_concat(distinct sfop.value separator ',') as value from  iven_features_on_products sfop 
  join iven_features_on_categories sfoc on sfoc.featureID=sfop.featureID and sfoc.categoryID=${category?.categoryID}
  join iven_products_features spf on spf.featureID=sfop.featureID 
  join iven_products sp on sp.productID = sfop.productID 
  join iven_categories sc on sc.categoryID = sp.categoryID and sc.fullPath like '${category.uri}%' 
  group by label, tooltip, alias order by spf.sort_order`;

  const [data] = await db.execute(sql);
  // fix duplicates
  return data.map((item: any) => ({ ...item, value: [...new Set(item.value.split(',').map((item: any) => item.trim()))].join(',') }));
};

const getCategory = async (uri: string) => {
  const sql = `select categoryID, name, fullPath as uri, meta_description, breadcrumbs from iven_categories where fullPath='${uri}'`;
  const [data] = await db.execute(sql);
  return data[0];
};

const getChildren = async (categoryID: number) => {
  const sql = `SELECT name, fullPath as uri FROM iven_categories where visible=1 and parent=${categoryID}`;

  const [data] = await db.execute(sql);
  return data;
};

export default defineEventHandler(async (event) => {
  console.log('API CATEGORIES/ONE');

  const body = await readBody(event);
  if (body.uri === '/search')
    return {
      data: {
        name: 'Поиск',
        breadcrumbs: '[]',
      },
      blocks: [],
      minmax: {},
    };
  const data = await getCategory(body.uri);
  if (!data) return {};
  //const children = await getChildren(data.categoryID);
  const children: any = [];
  const blocks = await getFilters(data);

  return {
    blocks,
    children,
    data,
    // minmax,
  };
});
