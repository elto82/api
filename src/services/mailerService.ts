import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

export const MailService = async (
  toUser: string,
  subject: string,
  htmlTemplate: string
) => {
  let transporter = nodemailer.createTransport({
    service: process.env.SMTP_SERVICE,
    auth: {
      user: process.env.SMTP_USERNAME,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  let sendmail = await transporter.sendMail({
    from: `"Inmobiliaria PropTech" <${process.env.SMTP_USERNAME}>`, // sender address,
    to: toUser,
    subject: subject,
    // text: 'Hello World'
    html: htmlTemplate,
  });

  return sendmail;
};
