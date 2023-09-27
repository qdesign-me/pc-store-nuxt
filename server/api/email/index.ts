import nodemailer, { TransportOptions } from 'nodemailer';

const processBody = (data: Record<string, any>) => {
  const subject = data.subject;
  const attachments: Record<string, any>[] = [];
  let html = '';
  if (data.action === 'subscribe') {
    html = `Контакт: ${data.contact}`;
  }
  if (data.action === 'warranty') {
    html = `Имя: ${data.name}<br/>
    Фамилия: ${data.surname}<br/>
    Неисправность:<br>
    ${data.message}`;
    attachments.push({
      filename: data.file,
      path: data.fileData,
    });
  }
  if (data.action === 'correct') {
    html = `Страница: ${data.page}<br/>
    Сообщение:<br>
    ${data.message}`;
  }
  if (data.action === 'subscribe-details') {
    if (data.email) html += `Email: ${data.email}<br>`;
    if (data.viber) html += `Viber: ${data.viber}<br>`;
    if (data.telegram) html += `Telegram: ${data.telegram}<br>`;
  }
  if (!html.length)
    return {
      status: 'error',
    };
  return {
    subject,
    html,
    attachments,
  };
};

export default defineEventHandler(async (event) => {
  console.log('API BODY');
  const data = await readBody(event);

  const to = process.env.EMAIL_ADMIN;
  const from = process.env.EMAIL_FROM;
  const mailConfig = {
    host: process.env.EMAIL_SERVER,
    port: process.env.EMAIL_PORT,
    secure: process.env.EMAIL_ISSECURE === 'true' ? true : false,
    // requireTLS: true,//process.env.EMAIL_REQUIRETLS === 'true' ? true : false,
    auth: {
      user: process.env.EMAIL_FROM,
      pass: process.env.EMAIL_PASSWORD,
    },
  };

  const transporter = nodemailer.createTransport(mailConfig as TransportOptions);

  const info = processBody(data);

  const res = await transporter.sendMail({
    from,
    to,
    cc: 'qdesign.by@gmail.com',
    ...info,
  });
  return {
    res,
  };
});
