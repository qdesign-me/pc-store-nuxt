import db from '../../../db/db';

const getPopularProduct = async (ids) => {
  const [data] = await db.execute(
    `select  (select group_concat(ip.filename) from site_pictures ip where ip.productID=p.productID group by ip.productID) as img,  p.name, p.Price_bn, p.PriceSale_bn, p.uri from site_products p where p.enabled=1 and p.categoryID in (${ids}) order by p.viewed_times desc LIMIT 1`
  );
  return data?.[0];
};
export default defineEventHandler(async (event) => {
  const [data] = await db.execute(
    `select categoryID, name, uri, parent from site_categories where visible=1 and categoryId not in (213, 549, 908) and parent in (498, 365,28, 362,364, 497, 3,10, 9, 1, 0) order by parent, sort_order`
  );
  const menumap = new Map();

  const products = {
    498: [213, 499, 549, 908, 1025, 1026, 1027, 1028, 1029],
    365: [2, 3, 4, 5, 6, 7, 8, 9, 10, 16, 19, 26, 76, 497],
    28: [981, 982, 983],
    362: [13, 14, 15, 17, 20, 21, 22, 23, 24, 25, 27, 67, 69, 117, 183, 368, 825, 972],
    364: [18, 28, 29, 30, 32, 34, 162, 171, 172, 175, 177, 178, 193, 215, 229, 241, 377, 378, 389, 423, 498, 554, 602, 605, 812, 1005, 1012],
    497: [383, 537, 538],
  };

  data.forEach((item) => {
    menumap.set(item?.categoryID, item);
  });

  data.forEach(async (item) => {
    if (item.parent) {
      const parent = menumap.get(item.parent);
      if (!parent.nodes) parent.nodes = [];
      parent.nodes.push(item);
    }
  });

  for (const item of data) {
    if (products[item.categoryID]) {
      const it = menumap.get(item.categoryID);
      it.product = await getPopularProduct(products[item.categoryID].join(','));
    }
  }

  const menu = [menumap.get(498), menumap.get(365), menumap.get(28), menumap.get(362), menumap.get(364), menumap.get(497)];

  return menu;
});
