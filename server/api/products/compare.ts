import db from '../../../db/db';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const highlightUp = ['Ёмкость накопителя', 'Диагональ экрана', 'Дата выхода на рынок'];
  const highlightDown = ['Стоимость при оплате единым платежом'];

  const id = body.id ?? [];
  let sql = '';

  const data = {
    products: [],
    features: {
      'Стоимость при оплате единым платежом': {
        items: [],
        bg: [],
        suffix: ' Br',
      },
    },
  };
  sql = `select (select concat('https://win7.by/data/big/', thumbnail) from iven_product_pictures where photoID=site_products.default_picture) as img, productID, uri, name, Price_Bn, is_auction, is_new
from site_products where productID in (${id})`;
  const [products] = await db.execute(sql);

  data.products = products;

  sql = `select sfop.productID, sfop.value, spf.label, spf.tooltip, spf.suffix, spf.filter_type from  site_features_on_products sfop
  join  site_products_features spf on spf.featureID=sfop.featureID where productID in (${id}) `;
  const [features] = await db.execute(sql);

  data.products.forEach((item, index) => {
    data.features['Стоимость при оплате единым платежом'].items[index] = Math.round(item.Price_Bn);
  });
  features.forEach((item) => {
    if (!data.features[item.label]) {
      data.features[item.label] = {
        tooltip: item.tooltip,
        items: [],
        equal: false,
        bg: [],
        suffix: item.suffix,
      };
    }
    const value = item.filter_type === 'boolean' ? (item.value === '1' ? 'Да' : 'Нет') : item.value;
    //if (item.suffix && value?.length) value = `${value}${item.suffix}`;
    const idx = data.products.findIndex((it) => it.productID === item.productID);
    data.features[item.label]['items'][idx] = value;
  });

  Object.keys(data.features).forEach((key) => {
    if (data.features[key].items.every((item) => item === data.features[key].items[0])) data.features[key].equal = true;
    if (highlightUp.includes(key)) {
      const sorted = data.features[key].items.sort((a, b) => Number(b) - Number(a));
      data.features[key].items.forEach((item, index) => {
        if (item === sorted[0]) data.features[key].bg[index] = 'bg-lightblue/10';
      });
    }
    if (highlightDown.includes(key)) {
      const sorted = data.features[key].items.sort((a, b) => Number(a) - Number(b));
      data.features[key].items.forEach((item, index) => {
        if (item === sorted[0]) data.features[key].bg[index] = 'bg-lightred/20';
      });

      //console.log({ sorted });
    }
  });

  return { data };
});
