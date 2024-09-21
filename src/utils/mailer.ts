import * as nodemailer from "nodemailer";
import { SendOptionsTypes, TransportOptionTypes } from "../@types/mailer";

const createTransport = (transportOptions: TransportOptionTypes) => {
  return nodemailer.createTransport(transportOptions);
};

const processEmail = async (
  transporter: nodemailer.Transporter,
  sendOptions: SendOptionsTypes
) => {
  const info = await transporter.sendMail(sendOptions);
  console.log("Message sent: %s", info.messageId);
};

export const sendMail = async (emailDetails: SendOptionsTypes) => {
  const transporter = createTransport({
    host: process.env["MAIL_HOST"],
    port: parseInt(process.env["MAIL_PORT"]) || 587,
    secure: true,
    auth: {
      pass: process.env["MAIL_AUTH_PASS"] as string,
      user: process.env["MAIL_AUTH_USER"] as string,
    },
    tls: {
      // ciphers: 'SSLv3',
      rejectUnauthorized: false, // Optional, helps with certificate issues
    },
  });
  await processEmail(transporter, emailDetails);
};
