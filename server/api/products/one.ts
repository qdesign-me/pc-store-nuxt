import db from '../../../db/db';

const days: Record<string, any> = {
  1: 'Понедельник',
  2: 'Вторник',
  3: 'Среда',
  4: 'Четверг',
  5: 'Пятница',
  6: 'Суббота',
  7: 'Воскресенье',
};

async function getProduct(sql: string) {
  const [data] = await db.execute(sql);
  return data[0];
}

async function getSimilar(sql: string) {
  const [data] = await db.execute(sql);
  return data;
}

async function getFeatures(sql: string) {
  const [data] = await db.execute(sql);
  return data;
}

async function getKurs() {
  const [data] = await db.execute(`SELECT currency_value FROM iven_currency_types where name='BYR'`);
  return data[0].currency_value;
}

async function getAvailable(availability: number, nowDay: number) {
  const [data] = await db.execute(
    `SELECT DATE_FORMAT(PostTime, '%H.%i') as PostTime, Pickup1, Pickup2, Delivery1, Delivery2 from win7_whenpickup where Seller_ID='${availability}' and NowDay='${nowDay}'`
  );
  return data[0];
}

const getDayName = (day: number) => {
  if (day === 0) return 'Сегодня';
  if (day < 7) return days[day];
  return days[day - 7];
};

function padTo2Digits(num: number) {
  return num.toString().padStart(2, '0');
}

function formatDate(date: Date) {
  return [padTo2Digits(date.getDate()), padTo2Digits(date.getMonth() + 1), date.getFullYear()].join('.');
}

const getFutureDate = (day: number) => {
  const add = day > 7 ? day - 7 : day;
  const today = new Date();

  const result = today.setDate(today.getDate() + add);
  console.log(day, add, result);
  return formatDate(new Date(result));
};

export default defineEventHandler(async (event) => {
  const d = new Date();
  const day = d.getDay();
  //getDay 0-6  Sunday - Saturday
  const nowDay = day === 0 ? 7 : day;
  const nowTime = Number(d.getHours() + '.' + d.getMinutes());
  console.log('API PRODUCTS/ONE');
  const body = await readBody(event);
  const uri = body.uri;
  console.log(uri);

  const kurs = await getKurs();

  const data = await getProduct(
    `select (select group_concat(ip.filename separator '|') from iven_product_pictures ip where ip.productID=p.productID group by ip.productID) as img, p.productID, p.categoryID, p.model, p.name, c.uri as curi, p.description, p.enabled, p.meta_description, p.is_auction, p.is_new, ROUND(p.Price * ${kurs}, 2) as Price, ROUND(p.PriceSale * ${kurs}, 2) as PriceSale, c.name as cat_name, c.fullPath as uri , c.breadcrumbs, p.availability from iven_products p join iven_categories c on c.categoryID=p.categoryID  where p.uri='${uri}' limit 1`
  );

  // TODO check perfomance, re-enable
  //await db.execute(`update iven_products set viewed_times=viewed_times+1 where productID=${data['productID']}`);

  let products = await getSimilar(
    `select (select group_concat(filename separator '|') from iven_product_pictures where productID=iven_products.productID) as img, productID, name, ROUND(Price * ${kurs}, 2) as Price, ROUND(PriceSale * ${kurs}, 2) as PriceSale, uri, is_auction, is_new from iven_products where  categoryID='${data.categoryID}' and productID<>${data.productID} and enabled=1 limit 4`
  );
  const availableData = await getAvailable(data['availability'], nowDay);
  const available = {
    pickup_text: 'Уточняйте',
    delivery_text: 'Уточняйте',
    delivery_rb_text: 'Уточняйте',
    pickup: 21,
    delivery: 21,
    delivery_rb: 21,
    delivery_date: '',
    delivery_rb_date: '',
  };

  if (availableData) {
    if (availableData.PostTime > nowTime) {
      available.delivery = availableData.Delivery1 - nowDay;
      available.pickup = availableData.Pickup1 - nowDay;
    } else {
      available.delivery = availableData.Delivery2 - nowDay;
      available.pickup = availableData.Pickup2 - nowDay;
    }
    if (available.pickup < 0) {
      available.pickup += 7;
    }
    if (available.delivery < 0) {
      available.delivery += 7;
    }
    available.pickup_text = getDayName(available.pickup + nowDay);
    available.delivery_text = getDayName(available.delivery + nowDay);
    available.delivery_date = getFutureDate(available.delivery);
    available.delivery_rb_text = getDayName(available.delivery + nowDay + 2);
    available.delivery_rb_date = getFutureDate(available.delivery + 2);
  }
  //console.log('availability', data['availability'], nowDay, availableData, available);

  data['available'] = available;

  data['features'] = await getFeatures(
    `select sfop.value,  sf.label, sf.tooltip, sf.filter_type, sf.suffix from iven_features_on_products sfop join iven_products_features sf on sf.featureID = sfop.featureID where sfop.productID=${data.productID} order by sf.sort_order`
  );
  data['features'] = data['features'].map((item: Record<string, any>) => ({
    ...item,
    value: item.filter_type !== 'boolean' ? item.value : item.value === 'yes' ? 'Да' : 'Нет',
  }));
  const similar = {
    link: data.uri,
    products,
  };

  return {
    data,
    similar,
  };
});
