import db from '../../../db/db';
export default defineEventHandler(async (event) => {
  const [response] = await db.execute('select `key`, `value` from iven_config');
  const config = response.reduce((acc, item: any) => {
    return { ...acc, [item.key]: item.value };
  }, {});
  return {
    config,
  };
});
