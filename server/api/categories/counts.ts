import db from '../../../db/db';

const getTotal = async (uri: string) => {
  const sql = `select count(*) as total
  from iven_products p
  where p.enabled=1 and p.categoryId in (SELECT categoryID FROM iven_categories where fullPath like '${uri}%')`;
  console.log(sql);
  const [res] = await db.execute(sql);
  return res?.[0]?.total;
};

export default defineEventHandler(async () => {
  const [data] = await db.execute(`select categoryID,  fullPath as uri, parent from iven_categories where visible=1 and categoryId  in (498, 28, 20)  order by parent, sort_order`);
  for (const item of data) {
    item.total = await getTotal(item.uri);
  }
  return data.reduce((acc, item) => {
    return { ...acc, [item.uri]: item.total };
  }, {});
});
