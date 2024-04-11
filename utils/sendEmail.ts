import nodemailer, { TransportOptions } from 'nodemailer';

export async function sendEmail(info: any, to: string) {
  const from = process.env.EMAIL_FROM as string;
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

  return transporter.sendMail({
    from,
    to,

    ...info,
  });
}
