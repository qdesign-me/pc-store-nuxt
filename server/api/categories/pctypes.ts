import db from '../../../db/db';

export default defineEventHandler(async (event) => {
  const [data] = await db.execute(`SELECT name, fullPath as uri FROM iven_categories where parent=498 and visible=1 LIMIT 0,100`);

  return {
    data,
  };
});
