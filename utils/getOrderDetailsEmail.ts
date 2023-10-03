function myprice(price: number | string) {
  return price
    ?.toLocaleString('ru-RU', {
      style: 'currency',
      currency: 'BYN',
    })
    .replace('BYN', 'Br')
    .trim();
}

export function getOrderDetailsEmail(orderID: number, body: Record<string, any>) {
  return (
    `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
  <html xmlns="http://www.w3.org/1999/xhtml">
    <head>
      <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
      <title>i-ven.by</title>
    </head>
    <body style="margin: 0; padding: 0; background: #f6f6f6">
      <div style="height: 100%; padding-top: 20px; background: #f6f6f6">
        <!-- body -->
        <table class="body-wrap" style="padding: 0 20px 20px 20px; width: 100%; background: #f6f6f6; margin-top: 10px">
          <tr>
            <td></td>
            <td class="container" style="border: 1px solid #f0f0f0; background: #ffffff; width: 800px; margin: auto">
              <div class="content">
                <table style="width: 100%">
                  <tr>
                    <td>
                      <div style="font-family: Arial; color: #111111; font-weight: 200; line-height: 1.2em; margin: 40px 20px; font-size: 16px">
                        <h3>Здравствуйте, ${body.info.name}</h3>
                        <p>
                          Ваш заказ №${orderID}, размещённый на сайте <a href="https://i-ven.by" style="text-decoration:none">i-ven.by</a>, принят в обработку.<br />
                          После готовности вашего заказа вы будете проинформированы.
                        </p>
                        <br /><br />
                      
                        <h3>Информация о заказе</h3>
    
                        <table style="width: 100%">
                          <thead>
                            <tr>
                              <th style="padding-right: 20px;">&nbsp;</th>
                              <th style="font-family: Arial; text-align: left; color: #111111; font-size: 12px; white-space: nowrap; padding-right: 20px;">Наименование</th>
                              <th style="font-family: Arial; text-align: left; color: #111111; font-size: 12px; white-space: nowrap; padding-right: 20px;">Кол-во</th>
                              <th style="font-family: Arial; text-align: left; color: #111111; font-size: 12px; white-space: nowrap;">Стоимость</th>
                            </tr>
                          </thead>
                          ` +
    body.cart.data
      .map((item: Record<string, any>) => {
        const link = `https://i-ven.by/p/${item.uri.replace('.html', '')}`;
        const src = 'https://win7.by/data/big/' + item.img.split(',')[0];
        return `<tr>
                            <td style="font-family: Arial; text-align: left; color: #111111;padding-right:20px">
                              <a href="${link}" style="color: #348eda">
                                <img
                                  src="${src}"
                                  width="80"
                                />
                              </a>
                            </td>
                            <td style="font-family: Arial; text-align: left; color: #111111; padding-right: 20px;">
                              <a href="${link}" style="color: #348eda;text-decoration:none">
                               ${item.name}
                              </a>
                              <div>
                                <small>Артикул: <b>${item.model}</b></small>
                              </div>
                            </td>
                            <td style="font-family: Arial; text-align: left; color: #111111; padding-right: 20px;">${item.qty} шт.</td>
                            <td style="font-family: Arial; text-align: left; color: #111111">
                              <span>${myprice(item.itemTotal).replace('Br', '')}</span><small>&nbsp;Br</small>
                            </td>
                          </tr>`;
      })
      .join('') +
    `
                        </table>
    
                        <p>
                          <strong>Заказчик</strong>: ${body.info.name}<br />
                          <strong>Телефон</strong>: +375${body.info.phone}<br />
                          <strong>Способ доставки</strong>: ${body.info.delivery}<br />
                          ${body.info.delivery !== 'Самовывоз' ? '<strong>Адрес доставки</strong>: ' + body.info.address + '<br />' : ''}
                          <strong>Способ оплаты</strong>: ${body.info.payment}<br />
                          ${body.info.comment ? '<strong>Комментарий</strong>: ' + body.info.comment + '<br />' : ''}
                          ${body.info.rekHTML.length > 0 ? '<strong>Реквизиты</strong>:<br/>' + body.info.rekHTML : ''}
                        </p>
                        <h3>Итого: <span>${myprice(body.total.total).replace('Br', '')}</span><small>&nbsp;Br</small></h3>
                        <p>
                          <em>Благодарим за ваш выбор!<br />С наилучшими пожеланиями, компания I-Ven.</em>
                        </p>
                      </div>
                    </td>
                  </tr>
                </table>
              </div>
              <!-- /content -->
            </td>
            <td></td>
          </tr>
        </table>
        <!-- /body -->
        <!-- footer -->
        <table style="clear: both !important; width: 100%">
          <tr>
            <td></td>
            <td class="container">
              <!-- content -->
              <div class="content">
                <table style="width: 100%; text-align: center">
                  <tr>
                    <td align="center">
                      <p style="font-family: Arial; color: #666666; font-size: 12px">
                        <a href="https://i-ven.by" style="color: #999999"> i-ven.by </a>
                      </p>
                    </td>
                  </tr>
                </table>
              </div>
              <!-- /content -->
            </td>
            <td></td>
          </tr>
        </table>
        <!-- /footer -->
      </div>
    </body>
  </html>
  `
  );
}
