import db from '~/db/db';

export default defineEventHandler(async (event) => {
  const q = event.node.req.url?.split('?q=')[1];

  console.log(`SELECT uri FROM iven_products where productID = '${q}'`);
  const [data] = await db.execute(`SELECT uri FROM iven_products where productID = '${q}'`);
  const url = data?.[0]?.uri;
  return { url };
});
