import { writeFile } from 'fs/promises';
import { notAllowedCats } from '~/configs';
import db from '~/db/db';

async function getFeatures(productID: number) {
  const [data] = await db.execute(
    `select sfop.value,  sf.label, sf.tooltip, sf.filter_type, sf.suffix from iven_features_on_products sfop join iven_products_features sf on sf.featureID = sfop.featureID where sfop.productID=${productID} order by sf.sort_order`
  );
  return data.map((item: Record<string, any>) => ({
    ...item,
    value: item.filter_type !== 'boolean' ? item.value : item.value === 'yes' ? 'Да' : 'Нет',
  }));
}
const fixname = (str: string) => {
  if (!str) return '';
  return str.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('>', '&gt;').replaceAll('<', '&lt;').replaceAll("'", '&apos;').replaceAll('&amp;gt;', '&gt;');
};
function getItem(item: Record<string, any>, categories: any, format: 'google' | 'yandex') {
  const payment =
    item.Price > 500 ? 'Оплата: Наличные, Б/Н, пластиковые карты, ЕРИП, карты рассрочки (Черепаха, Магнит, Халва)' : 'Оплата: Наличные, Б/Н, пластиковые карты, ЕРИП.';
  const saleNotes = `${payment} Самовывоз только в Минске. Стоимость и сроки доставки по РБ уточняйте в отделе продаж. Возможность и стоимость доставки по стране в удобный для Вас день уточняйте у специалиста call-центра.`;

  if (format === 'yandex') {
    return `
  <offer id="${item.productID}" available="true">
  <name>${fixname(item.name)}</name>
  ${item.typePrefix ? '<typePrefix>' + fixname(item.typePrefix) + '</typePrefix>' : ''}
  ${item.model ? '<model>' + fixname(item.model) + '</model>' : ''}
  ${item.vendor ? '<vendor>' + fixname(item.vendor) + '</vendor>' : ''}
  ${item.vendorCode ? '<vendorCode>' + fixname(item.vendorCode) + '</vendorCode>' : ''}
  <categoryId>${item.categoryID}</categoryId>
  <picture>https://img.i-ven.by/big/${fixname(item.img)}</picture>
  <url>https://i-ven.by/p/${fixname(item.uri.replace('.html', ''))}</url>
  <price>${item.Price}</price>
  <currencyId>BYN</currencyId>
  <store>false</store>
  <pickup>true</pickup>
  <delivery>true</delivery>
  <sales_notes>${saleNotes}</sales_notes>
</offer>`;
  }
  const category = categories.find((it) => it.categoryID === item.categoryID)?.name;

  return `<item>
    <g:link>https://i-ven.by/p/${fixname(item.uri.replace('.html', ''))}</g:link>
    <g:id>${item.productID}</g:id>
    <g:price>${item.Price} BYN</g:price>
    <g:condition>new</g:condition>
    <g:availability>in stock</g:availability>
    <g:product_type>${category}</g:product_type>
    <g:image_link>https://img.i-ven.by/big/${fixname(item.img)}</g:image_link>
    ${item.vendor ? '<g:brand>' + fixname(item.vendor) + '</g:brand>' : ''}
    <g:title>${fixname(item.name)}</g:title>
    <g:description>${saleNotes}</g:description>
  </item>`;
}

async function getKurs() {
  const [data] = await db.execute(`SELECT currency_value FROM iven_currency_types where name='BYR'`);
  return data[0].currency_value;
}
async function getCategories() {
  const [data] = await db.execute(
    `select categoryID, name, parent from iven_categories 
    where 
    visible=1  
    and categoryId not in (${notAllowedCats.join(',')}) 
    order by parent, sort_order`
  );
  return data;
}

async function getProducts(start: number, kurs: any) {
  const [data] = await db.execute(
    `SELECT productID, categoryID, typePrefix, vendorCode, vendor, name, uri, model, ROUND(Price * ${kurs}, 2) as Price,
    (select ip.filename from iven_product_pictures ip where ip.productID=iven_products.productID  limit 1) as img
    FROM iven_products where enabled=1 and  categoryID not in (${notAllowedCats.join(',')})  LIMIT ${start}, 1000`
  );
  return data;
}

function getWrap(categories: any, offers: any, format: 'google' | 'yandex') {
  const today = new Date();

  if (format === 'yandex') {
    const items =
      `<category id="1">Главная категория</category>` +
      categories
        .slice(1)
        .map((item) => `<category id="${item.categoryID}" parentId="${item.parent}">${item.name}</category>`)
        .join('');

    return `<?xml version="1.0" encoding="UTF-8"?>
    <yml_catalog date="${today.toISOString()}">
        <shop>
            <name>Iven — интернет магазин компьютеров и комплектующих, техники для офиса и электроники.</name>
            <company>ООО «Компьютеры Айвен»</company>
            <url>https://i-ven.by</url>
            <currencies>
                <currency id="BYN" rate="1"/>
            </currencies>
            <categories>
            ${items}
            </categories>
            <offers>${offers.join('')}</offers>
        </shop>
    </yml_catalog>`;
  }

  return `<?xml version="1.0"?>
<rss version="2.0" xmlns:g="http://base.google.com/ns/1.0">
  <channel>
    <title>Iven — интернет магазин компьютеров и комплектующих, техники для офиса и электроники.</title>
    <link>https://i-ven.by</link>
    ${offers}
    </channel></rss>`;
}
export default defineEventHandler(async (event) => {
  const format = event.node.req.originalUrl === '/api/products/feed?format=google' ? 'google' : 'yandex';
  const categories = await getCategories();
  console.log('get feed', format);
  const kurs = await getKurs();

  const offers = [];
  let start: number = 0;
  do {
    const data = await getProducts(start, kurs);
    if (data?.length > 0) {
      start = start + 1000;
      offers.push(data.map((item) => getItem(item, categories, format)).join(''));
    } else {
      start = -1;
    }
  } while (start > 0);

  const content = getWrap(categories, offers, format);

  const filePath = format === 'google' ? './gfeed.xml' : './feed.xml';
  await writeFile(filePath, content);
  console.log('done');
  return {
    status: 'ok',
  };
});
