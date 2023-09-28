import db from '../../../db/db';

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

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  console.log(body);
  body.info.order_time = formatDate(new Date());
  body.info.customerID = 1;
  body.info.customer_ip = event.node.req.socket.remoteAddress || event.node.req.headers['x-forwarded-for'];
  body.info.statusID = 1;
  body.info.manager_comment = '';
  body.info.payment = body.info.unp ? 'Банковскиий перевод' : body.info.payment;
  body.info.phone = body.info.phone.replaceAll(' ', '').replaceAll('-', '').replaceAll('+375', '').replaceAll('(', '').replaceAll(')', '');
  body.info.rek = body.info.unp
    ? `${body.info.name}
УНП ${body.info.unp}
Банковские реквизиты:
р/c: ${body.info.account}
${body.info.bankaddress}
BIC: ${body.info.bankbic}
${body.info.fio}, действующий(ая) на основании: ${body.info.reason}`
    : '';
  body.info.city = body.info.city ?? '';
  body.info.address =
    body.info.delivery !== 'Самовывоз'
      ? `${body.info.city}, ${body.info.street} ${body.info.building}${body.info.block ? ' к' + body.info.block : ''},  ${body.info.apt}${
          body.info.zip ? ', ' + body.info.zip : ''
        }`
      : '';
  body.total.order_discount = 0;
  console.log({ body });

  const sql = `insert into site_orders 
  (orderID, customerID, order_time, customer_ip, shipping_type, payment_type, customers_comment, manager_comment, rek, statusID, shipping_cost, order_discount, order_amount, name, phone, email, city, address) 
  values
  (null, '${body.info.customerID}', '${body.info.order_time}', '${body.info.customer_ip}', '${body.info.delivery}', '${body.info.payment}', '${body.info.comment}', '${body.info.manager_comment}', '${body.info.rek}', '${body.info.statusID}', '${body.total.deliveryPrice}', '${body.total.order_discount}', '${body.total.total}', '${body.info.name}', '${body.info.phone}', '${body.info.email}', '${body.info.city}', '${body.info.address}')`;

  const res = await db.execute(sql);

  const orderID = res[0].insertId;

  let productsSQL = `insert into site_ordered_carts 
  (itemID, orderID, productID, name, serial, warranty, Price, Quantity, status_ID, seller_ID) 
  values`;
  body.cart.data.forEach((item: Record<string, any>, index: number) => {
    const it: Record<string, any> = {
      itemID: null,
      orderID,
      productID: item.productID,
      name: item.name,
      warranty: item.warranty,
      Price: item.Price_bn,
      Quantity: item.qty,
      serial: '',
      status_ID: 0,
      seller_ID: 0,
    };
    if (index > 0) productsSQL += ', ';
    productsSQL += `(null, '${it.orderID}', '${it.productID}', '${it.name}', '${it.serial}', '${it.warranty}', '${it.Price}', '${it.Quantity}', '${it.status_ID}','${it.seller_ID}')`;
  });

  await db.execute(productsSQL);
  return { status: 'ok' };
});
