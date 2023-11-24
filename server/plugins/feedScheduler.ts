import { useScheduler } from '#scheduler';
import { writeFile } from 'fs/promises';
import { notAllowedCats } from '~/configs';
import db from '~/db/db';

export default defineNitroPlugin(() => {
  startScheduler();
});

async function getFeatures(productID) {
  const [data] = await db.execute(
    `select sfop.value,  sf.label, sf.tooltip, sf.filter_type, sf.suffix from iven_features_on_products sfop join iven_products_features sf on sf.featureID = sfop.featureID where sfop.productID=${productID} order by sf.sort_order`
  );
  return data.map((item: Record<string, any>) => ({
    ...item,
    value: item.filter_type !== 'boolean' ? item.value : item.value === 'yes' ? 'Да' : 'Нет',
  }));
}

function getItem(item) {
  // const features = await getFeatures(item.productID);
  // console.log({ features });
  const payment =
    item.Price > 500 ? 'Оплата: Наличные, Б/Н, пластиковые карты, ЕРИП, карты рассрочки (Черепаха, Магнит, Халва)' : 'Оплата: Наличные, Б/Н, пластиковые карты, ЕРИП.';
  const saleNotes = `${payment} Самовывоз только в Минске. Стоимость и сроки доставки по РБ уточняйте в отделе продаж. Возможность и стоимость доставки по стране в удобный для Вас день уточняйте у специалиста call-центра.`;
  return `<offer id="${item.productID}" available="true">
  <name>${item.name}</name>
  ${item.typePrefix ? '<typePrefix>' + item.typePrefix + '</typePrefix>' : ''}
  ${item.model ? '<model>' + item.model + '</model>' : ''}
  ${item.vendor ? '<vendor>' + item.vendor + '</vendor>' : ''}
  ${item.vendorCode ? '<vendorCode>' + item.vendorCode + '</vendorCode>' : ''}
  <categoryId>${item.categoryID}</categoryId>
  <picture>https://img.i-ven.by/big/${item.img}</picture>
  <url>https://i-ven.by/p/${item.uri.replace('.html', '')}</url>
  <price>${item.Price}</price>
  <condition>new</condition>
  <currencyId>BYN</currencyId>
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
  const items = data.slice(1).map((item) => `<category id="${item.categoryID}" parentId="${item.parent}">${item.name}</category>`);

  return `<category id="1">Главная категория</category>${items}`;
}

async function getProducts(start: number, kurs: any) {
  console.log(start);
  const [data] = await db.execute(
    `SELECT productID, categoryID, typePrefix, vendorCode, vendor, name, uri, model, ROUND(Price * ${kurs}, 2) as Price,
    (select ip.filename from iven_product_pictures ip where ip.productID=iven_products.productID  limit 1) as img
    FROM iven_products where enabled=1 and  categoryID not in (${notAllowedCats.join(',')})  LIMIT ${start},1000`
  );
  return data;
}

function startScheduler() {
  const scheduler = useScheduler();

  scheduler
    .run(async () => {
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
    })
    .everyFourHours();
}
