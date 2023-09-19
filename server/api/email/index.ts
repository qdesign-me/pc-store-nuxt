import nodemailer from 'nodemailer';

const processBody = (data: Record<string, any>) => {
  const subject = data.subject;
  let html = '';
  if (data.action === 'subscribe') {
    html = `Контакт: ${data.contact}`;
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
  };
};

export default defineEventHandler(async (event) => {
  const data = await readBody(event);

  const email = 'qdesign.by@gmail.com';

  const mailConfig = {
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    requireTLS: true,
    auth: {
      user: email,
      pass: 'ypooounzqjxdhjqs',
    },
  };
  const transporter = nodemailer.createTransport(mailConfig);

  const info = processBody(data);

  const res = await transporter.sendMail({
    from: email,
    to: email,
    ...info,
  });
  return {
    res,
  };
});
// import formidable from 'formidable';
// import nodemailer from 'nodemailer';
// const mailConfig = {
//   host: 'smtp.gmail.com',
//   port: 587,
//   secure: false,
//   requireTLS: true,
//   auth: {
//     user: 'qdesign.by@gmail.com',
//     pass: 'ypooounzqjxdhjqs',
//   },
// };
// export default defineEventHandler(async (event) => {
//   const form = formidable();
//   const [fields, files] = await form.parse(event.node.req);
//   const status = {};
//   const html = '';
//   console.log(fields, files);

//   const subject = fields.subject[0];
//   const name = fields.name[0];
//   const transporter = nodemailer.createTransport(mailConfig);
//   const mailOptions: Record<string, any> = {
//     from: `"${process.env.MAIL_USERNAME}" <${process.env.MAIL_USEREMAIL}>`,
//     to: process.env.MAIL_ADMIN,
//     subject,
//     html,
//   };

//   // const status = await transporter.sendMail(mailOptions);

//   // if (attachments.length) {
//   //   mailOptions.attachments = attachments;
//   // }
//   return {
//     status,
//   };
// });
// /*
// const mailConfig = {
//   host: 'smtp.gmail.com',
//   port: 587,
//   secure: false,
//   requireTLS: true,
//   auth: {
//     user: 'qdesign.by@gmail.com',
//     pass: 'ypooounzqjxdhjqs',
//   },
// };

// const transporter = nodemailer.createTransport(smtpTransport(mailConfig));

// export const sendEmail = async (subject, html, attachments = [], cc = '') => {
//   const mailOptions: Record<string, any> = {
//     from: `"${process.env.MAIL_USERNAME}" <${process.env.MAIL_USEREMAIL}>`,
//     to: process.env.MAIL_ADMIN,
//     subject,
//     html,
//   };

//   if (attachments.length) {
//     mailOptions.attachments = attachments;
//   }

//   return transporter.sendMail(mailOptions);
// };
// */
