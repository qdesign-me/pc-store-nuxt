import { sendEmail } from '~/utils/sendEmail';
import db from '../../../db/db';
import { getOrderDetailsEmail } from '../../../utils/getOrderDetailsEmail';

function padTo2Digits(num: number) {
  return num.toString().padStart(2, '0');
}

function formatDate(date: any) {
  return (
    [date.getFullYear(), padTo2Digits(date.getMonth() + 1), padTo2Digits(date.getDate())].join('-') +
    ' ' +
    [padTo2Digits(date.getHours()), padTo2Digits(date.getMinutes())].join(':')
  );
}

async function getKurs() {
  const [data] = await db.execute(`SELECT currency_value FROM iven_currency_types where name='BYR'`);
  return data[0].currency_value;
}

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const phone = body.info.phone.replaceAll(' ', '').replaceAll('-', '').replaceAll('+375', '').replaceAll('(', '').replaceAll(')', '');
  body.info.order_time = formatDate(new Date());
  //body.info.customer_ip = event.node.req.socket.remoteAddress || event.node.req.headers['x-forwarded-for'];
  body.info.customer_ip = '';

  body.info.statusID = 0;
  body.info.manager_comment = '';
  body.info.payment = body.info.unp ? 'Банковскиий перевод' : body.info.payment;
  body.info.phone = phone;
  body.info.rek = body.info.unp
    ? `${body.info.name}
УНП ${body.info.unp}
Банковские реквизиты:
р/c: ${body.info.account}
${body.info.bankaddress}
BIC: ${body.info.bankbic}
${body.info.fio}, действующий(ая) на основании: ${body.info.reason}`
    : '';
  body.info.rekHTML = body.info.unp
    ? `${body.info.name}<br/>
УНП ${body.info.unp}<br/>
Банковские реквизиты:<br/>
р/c: ${body.info.account}<br/>
${body.info.bankaddress}<br/>
BIC: ${body.info.bankbic}<br/>
${body.info.fio},<br/>
действующий(ая) на основании: ${body.info.reason}`
    : '';
  body.info.city = body.info.city ?? '';
  body.info.address =
    body.info.delivery !== 'Самовывоз'
      ? `${body.info.city}, ${body.info.street} ${body.info.building}${body.info.block ? ' к' + body.info.block : ''},  ${body.info.apt}${
          body.info.zip ? ', ' + body.info.zip : ''
        }`
      : '';
  body.total.order_discount = 0;

  let customerID;
  let sql = `SELECT customerID FROM win7_customers where phone='${phone}' LIMIT 1`;
  let res = await db.execute(sql);
  customerID = res?.[0]?.[0]?.customerID;

  if (!customerID) {
    sql = `SELECT customerID FROM win7_customers where email='${body.info.email}' LIMIT 1`;
    res = await db.execute(sql);
    customerID = res?.[0]?.[0]?.customerID;
  }
  if (!customerID) {
    sql = `insert into win7_customers 
    (customerID, login, name, cust_password, Email, city, adress, phone, price, privelege)
    values
    (null, '${body.info.email}', '${body.info.name}', 'md5(1234)', '${body.info.email}', '${body.info.city ?? ''}', '${body.info.address}', '${body.info.phone}', 4,0)`;
    res = await db.execute(sql);

    customerID = res[0].insertId;
  }
  const deliveries: Record<string, any> = {
    Самовывоз: 'Самовывоз',
    'Доставка в пределах МКАД': 'Курьер Минск',
    'Доставка по Беларуси': 'Курьер РБ',
  };
  const delivery: Record<string, any> = deliveries[body.info.delivery];
  const payments: Record<string, any> = {
    Наличными: 'Наличные',
    'Оплата банковской картой': 'Карточка',
    'Оплата через ЕРИП': 'ЕРИП',
    'Банковский перевод': 'Безнал',
    'Оплата в кредит': 'Кредит',
    Рассрочка: 'Рассрочка',
  };
  const payment = payments[body.info.payment] ?? 'Безнал';

  sql = `insert into win7_orders 
  (orderID, customerID, order_time, customer_ip, shipping_type, payment_type, customers_comment, manager_comment, rek, statusID, shipping_cost, order_discount, order_amount, name, phone, email, city, address) 
  values
  (null, '${customerID}', '${body.info.order_time}', '${body.info.customer_ip}', '${delivery}', '${payment}', '${body.info.comment}', '${body.info.manager_comment}', '${body.info.rek}', '${body.info.statusID}', '${body.total.deliveryPrice}', '${body.total.order_discount}', '${body.total.total}', '${body.info.name}', '${body.info.phone}', '${body.info.email}', '${body.info.city}', '${body.info.address}')`;
  const test = getOrderDetailsEmail(1, body);

  res = await db.execute(sql);

  const orderID = res[0].insertId;

  let productsSQL = `insert into win7_ordered_carts 
  (itemID, orderID, productID, name, serial, warranty, Price, Quantity, status_ID, seller_ID) 
  values`;
  body.cart.data.forEach((item: Record<string, any>, index: number) => {
    const it: Record<string, any> = {
      itemID: null,
      orderID,
      productID: item.productID,
      name: item.name,
      warranty: item.warranty,
      Price: item.Price,
      Quantity: item.qty,
      serial: '',
      status_ID: 0,
      seller_ID: 0,
    };
    if (index > 0) productsSQL += ', ';
    productsSQL += `(null, '${it.orderID}', '${it.productID}', '${it.name}', '${it.serial}', '${it.warranty}', '${it.Price}', '${it.Quantity}', '${it.status_ID}','${it.seller_ID}')`;
  });

  await db.execute(productsSQL);

  const html = getOrderDetailsEmail(orderID, body);

  const to = process.env.EMAIL_ADMIN as string;

  await sendEmail(
    {
      subject: `Заказ №${orderID} на сайте i-ven.by`,
      html,
    },
    to
  );
  await sendEmail(
    {
      subject: `Заказ №${orderID} на сайте i-ven.by`,
      html,
    },
    body.info.email
  );
  return { status: 'ok', orderID };
});
