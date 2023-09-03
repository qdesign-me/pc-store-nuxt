export default defineEventHandler(async (event) => {
  return {};
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
