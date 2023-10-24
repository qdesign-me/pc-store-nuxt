import db from '../../../db/db';

const clone = (it) => JSON.parse(JSON.stringify(it));

export default defineEventHandler(async (event) => {
  const menumap = new Map();
  const [data] = await db.execute(`SELECT categoryID, name, parent,  uri FROM iven_categories`);
  data.forEach((item) => {
    menumap.set(item?.categoryID, item);
  });

  data.forEach((item) => {
    const parents = [{ name: item.name, uri: item.uri }];
    let it = clone(item);
    while (it.parent) {
      const parent = menumap.get(it.parent);
      parents.push({ name: parent.name, uri: parent.uri });
      it = clone(parent);
    }
    const bc = parents.filter((item) => item.name !== 'Главная категория').reverse();
    const breadcrumbs = bc.reduce((acc, item, index) => {
      const uri = index ? `${acc[index - 1].uri}/${item.uri}` : `/${item.uri}`;
      const name = item.name.replaceAll('"', '&quot;');
      return [...acc, { name, uri: uri.toLowerCase() }];
    }, []);
    const fullPath =
      '/' +
      bc
        .map((item) => item.uri)
        .join('/')
        .toLowerCase();

    const categoryID = item.categoryID;
    // db.execute(`update iven_categories set fullPath='${fullPath}', breadcrumbs='${JSON.stringify(breadcrumbs)}' where categoryID='${categoryID}'`);
  });
  return {
    data,
  };
});
