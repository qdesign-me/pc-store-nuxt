import db from '../../../db/db';

const getTotal = async (uri: string) => {
  const sql = `select count(*) as total
  from site_products p
  join site_categories c on c.categoryID = p.categoryID and c.uri like '${uri}%'
  where p.enabled=1 LIMIT 0,100`;
  const [res] = await db.execute(sql);
  return res?.[0]?.total;
};

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const mapping: Record<string, string> = {
    364: '364,18,28,29,30,32,34,162,171,172,175,177,178,193,215,229,241,377,378,389,423,498,554,602,605,812,1005,1012, 1, 0', //'365, 28, 6, 3, 10, 9, 1, 0',
    365: '365, 2,3,4,5,6,7,8,9,10,16,19,26,76,497, 1, 0', //'365, 28, 6, 3, 10, 9, 1, 0',
    498: '498, 364, 213,499,549,908,1025,1026,1027,1028,1029, 1, 0',
    362: '362, 313,14,15,17,20,21,22,23,24,25,27,67,69,117,183,368,825,972, 1, 0',
  };
  const current = mapping[body.categoryID];
  const [data] = await db.execute(
    `select categoryID, name, meta_description, uri, parent from site_categories where visible=1 and categoryId not in (7, 26, 497) and parent in (${current}) order by parent, sort_order`
  );

  const menumap = new Map();

  data.forEach((item) => {
    menumap.set(item?.categoryID, item);
  });

  data.forEach(async (item) => {
    if (item.parent) {
      const parent = menumap.get(item.parent);
      if (parent) {
        if (!parent.nodes) parent.nodes = [];
        parent.nodes.push(item);
      }
    }
  });

  for (const item of data) {
    const it = menumap.get(item.categoryID);
    if (it.parent === body.categoryID) it.total = await getTotal(it.uri);
  }

  const menu = menumap.get(body.categoryID);

  return menu;

  // for (const item of data) {
  //   if (item.parent) {
  //     const parent = menumap.get(item.parent);
  //     if (parent) {
  //       if (!parent.nodes) parent.nodes = [];
  //       parent.nodes.push(item);
  //     }
  //   }

  //   if (item.parent === body.categoryID) {
  //     item.total = await getTotal(item.uri);
  //   }
  // }
});
