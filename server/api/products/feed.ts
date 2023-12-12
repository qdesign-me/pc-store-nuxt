import { writeFile } from 'fs/promises';
import { notAllowedCats } from '~/configs';
import db from '~/db/db';

/*`<offer id="18295" available="true">
  <name>Парогенератор Bosch TDS 4040</name>
  <typePrefix>Парогенератор</typePrefix>
  <model>TDS 4040</model>
  <vendor>Bosch</vendor>
  <description>Мощность: 2400 Вт; Постоянная подача пара: есть; Вертикальное отпаривание: есть; Вес: 3.4 кг; Автоматическое отключение: есть; Автоматическая регулировка пара: есть; Расход при паровом ударе: 270 г/мин; Максимальное давление пара: 5.5 бар;</description>
  <vendorCode>100028173415</vendorCode>
  <param name="Цвет">белый, синий, серый</param>
  <param name="Материал">Пластик</param>   
  <param name="Размер" unit="см">Длина 38.5 Ширина 19.2 Высота 26</param>
  <param name="Длина" unit="см">38.5</param>
  <param name="Ширина" unit="см">19.2</param>
  <param name="Высота" unit="см">26</param>
  <condition type="showcasesample">
        <quality>good</quality>
  </condition>
  <categoryId>123</categoryId>
  <picture>https://avatars.mds.yandex.net/get-mpic/5209485/img_id4945386046892792794.jpeg/orig</picture>
  <url>https://market.yandex.ru/product--parogenerator-bosch-tds-4040/1807277658</url>
  <price>11670</price>
  <oldprice>12000</oldprice>
  <currencyId>RUR</currencyId>
  <sales_notes>сроки доставки и оплаты</sales_notes>
</offer>`;
*/

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
function getItem(item: Record<string, any>) {
  // const features = await getFeatures(item.productID);
  // console.log({ features });
  const payment =
    item.Price > 500 ? 'Оплата: Наличные, Б/Н, пластиковые карты, ЕРИП, карты рассрочки (Черепаха, Магнит, Халва)' : 'Оплата: Наличные, Б/Н, пластиковые карты, ЕРИП.';
  const saleNotes = `${payment} Самовывоз только в Минске. Стоимость и сроки доставки по РБ уточняйте в отделе продаж. Возможность и стоимость доставки по стране в удобный для Вас день уточняйте у специалиста call-центра.`;
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
  <condition>new</condition>
  <currencyId>BYN</currencyId>
  <store>false</store>
  <pickup>true</pickup>
  <delivery>true</delivery>
  <sales_notes>${saleNotes}</sales_notes>
</offer>`;
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
  const items = data
    .slice(1)
    .map((item) => `<category id="${item.categoryID}" parentId="${item.parent}">${item.name}</category>`)
    .join('');

  return `<category id="1">Главная категория</category>${items}`;
}

async function getProducts(start: number, kurs: any) {
  console.log(start);
  const [data] = await db.execute(
    `SELECT productID, categoryID, typePrefix, vendorCode, vendor, name, uri, model, ROUND(Price * ${kurs}, 2) as Price,
    (select ip.filename from iven_product_pictures ip where ip.productID=iven_products.productID  limit 1) as img
    FROM iven_products where enabled=1 and  categoryID not in (${notAllowedCats.join(',')})  LIMIT ${start}, 1000`
  );
  return data;
}
export default defineEventHandler(async (event) => {
  const categories = await getCategories();
  console.log('get categories');
  const kurs = await getKurs();
  console.log('get kurs');
  console.log('getting products');
  const offers = [];
  let start: number = 0;
  do {
    const data = await getProducts(start, kurs);
    if (data?.length > 0) {
      start = start + 1000;
      offers.push(data.map((item) => getItem(item)).join(''));
    } else {
      start = -1;
    }
  } while (start > 0);
  console.log('got products');

  // event.node.res.setHeader('content-type', 'text/xml'); // we need to tell nitro to return this as a xml file
  // event.node.res.end(

  const today = new Date();

  const content = `<?xml version="1.0" encoding="UTF-8"?>
    <yml_catalog date="${today.toISOString()}">
        <shop>
            <name>Iven — интернет магазин компьютеров и комплектующих, техники для офиса и электроники.</name>
            <company>ООО «Компьютеры Айвен»</company>
            <url>https://i-ven.by</url>
            <currencies>
                <currency id="BYN" rate="1"/>
            </currencies>
            <categories>
            ${categories}
            </categories>
            <offers>${offers.join('')}</offers>
        </shop>
    </yml_catalog>`;

  const filePath = `./feed.xml`;
  console.log('writing file');
  await writeFile(filePath, content);
  console.log('done');
  return {
    status: 'ok',
  };

  const zip = new JSZip();

  zip.file('feed.xml', content);

  const zipped = await zip.generateAsync({ type: 'nodebuffer' });
  await writeFile(`./public/yandexfeed.zip`, zipped);

  return {
    status: 'ok',
  };
});
