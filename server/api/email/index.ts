import { sendEmail } from '~/utils/sendEmail';

const processBody = (data: Record<string, any>) => {
  const subject = data.subject;
  const attachments: Record<string, any>[] = [];
  let html = '';
  if (data.action === 'subscribe') {
    html = `Контакт: ${data.contact}<br/>
    Способ связи: ${data.way}`;
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
  const data = await readBody(event);

  const info = processBody(data);

  const to = process.env.EMAIL_ADMIN as string;

  const res = await sendEmail(info, to);
  return {
    res,
  };
});
