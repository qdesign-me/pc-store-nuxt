import db from '../../../db/db';
export default defineEventHandler(async (event) => {
  console.log('API CONFIG');
  const [response] = await db.execute('select `key`, `value` from site_config');
  const config = response.reduce((acc, item: any) => {
    return { ...acc, [item.key]: item.value };
  }, {});

  return {
    config,
  };
});
