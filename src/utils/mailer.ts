// import * as nodemailer from "nodemailer";
// import { SendOptionsTypes, TransportOptionTypes } from "../types/mailer";

// const createTransport = (transportOptions: TransportOptionTypes) => {
//   return nodemailer.createTransport(transportOptions);
// };

// const processEmail = async (
//   transporter: nodemailer.Transporter,
//   sendOptions: SendOptionsTypes
// ) => {
//   try {
//     const info = await transporter.sendMail(sendOptions);
//     console.log("Message sent: %s", info.messageId);
//   } catch (error) {
//     console.error(error);
//   }
// };

// export const sendMail = async (emailDetails: SendOptionsTypes) => {
//   //   console.log({
//   //     host: process.env["MAIL_HOST"],
//   //     port: parseInt(process.env["MAIL_PORT"]) || 587,
//   //     secure: true,
//   //     auth: {
//   //       type: process.env["MAIL_TYPE"],
//   //       user: process.env["MAIL_AUTH_USER"],
//   //       refreshToken: process.env["MAIL_REFRESH_TOKEN"],
//   //       clientId: process.env["MAIL_CLIENT_ID"],
//   //       ClientSecret: process.env["MAIL_CLIENT_SECRET"],
//   //     },
//   //   });
//   const transporter = createTransport({
//     host: process.env["MAIL_HOST"],
//     port: parseInt(process.env["MAIL_PORT"]) || 587,
//     secure: false,
//     auth: {
//       type: process.env["MAIL_TYPE"] || "",
//       user: process.env["MAIL_AUTH_USER"],
//       refreshToken: process.env["MAIL_REFRESH_TOKEN"] || "",
//       clientId: process.env["MAIL_CLIENT_ID"] || "",
//       clientSecret: process.env["MAIL_CLIENT_SECRET"] || "",
//     },
//   });
//   await processEmail(transporter, emailDetails);
// };
