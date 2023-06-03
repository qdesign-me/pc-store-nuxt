import db from '../../../db/db';
export default defineEventHandler(async (event) => {
  const [data] = await db.execute(`select categoryID, name, uri, parent from site_categories where visible=1 and parent in (365,362,364, 1, 0) order by parent, sort_order`);
  const menumap = new Map();

  data.forEach((item) => {
    menumap.set(item.categoryID, item);
  });

  data.forEach((item) => {
    if (item.parent) {
      const parent = menumap.get(item.parent);
      if (!parent.nodes) parent.nodes = [];
      parent.nodes.push(item);
    }
  });

  const menu = [menumap.get(365), menumap.get(362), menumap.get(364)];

  return menu;
});
