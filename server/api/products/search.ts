import db from '~/db/db';
async function getKurs() {
  const [data] = await db.execute(`SELECT currency_value FROM iven_currency_types where name='BYR'`);
  return data[0].currency_value;
}

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const q = body.search;
  if (!q) return { data: [] };

  const kurs = await getKurs();

  const [data] = await db.execute(
    `SELECT (select ip.filename from iven_product_pictures ip where ip.productID=iven_products.productID limit 1) as img, uri, productID, name, ROUND(Price * ${kurs}, 2) as Price, ROUND(PriceSale * ${kurs}, 2) as PriceSale FROM iven_products where enabled=1 and productID='${q}' or name like '%${q}%' limit 5`
  );

  return { data };
});
