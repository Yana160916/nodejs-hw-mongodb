import nodemailer from 'nodemailer';
import { env } from './env.js';

export const sendEmail = async ({ from, to, subject, html }) => {
  const transporter = nodemailer.createTransport({
    host: env('SMTP_HOST'),
    port: parseInt(env('SMTP_PORT')),
    secure: false,
    auth: {
      user: env('SMTP_USER'),
      pass: env('SMTP_PASSWORD'),
    },
  });

  const mailOptions = {
    from,
    to,
    subject,
    html,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    throw new Error('Failed to send the email, please try again later.');
  }
};
