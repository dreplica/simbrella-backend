import { userModel } from "../db/models";
import { SendOptionsTypes } from "../@types/mailer";
import { LOGIN_EMAIL_SUBJECT, ROLES } from "../utils/constants";
import { decrypt, encrypt } from "../utils/cryptography";
import { sendMail } from "../utils/mailer";

const loginEmail = async (email: string) => {
  const user = await userModel.findOne({ email });
  if (!user) {
    console.error(`user with email ${email} does not exist`);
    throw new Error(`Login failed`);
  }
  const token = encrypt({ data: { id: user.id, role: user.role }, exp: "2h" });
  return { token };
  // await sendMail({
  //   from: process.env["MAIL_AUTH_USER"],
  //   to: user.email,
  //   subject: LOGIN_EMAIL_SUBJECT,
  //   // if time, change to ejs helper
  //   html: `<div>
  //   <p>Please login using the link below</p>
  //   <small>Link expires in 2 hours</small>
  //   <a href='${process.env["API_ENDPOINT"]}/${token}'>Login here
  //   </a>
  //   or use this link ${process.env["API_ENDPOINT"]}/${token}
  //   </div>`,
  // });
};

const emailConfirm = async (token: string) => {
  const { email: userEmail } = decrypt<{ email: string }>(token);

  const user = await userModel.findOne({ email: userEmail }).lean();
  if (!user) {
    console.error(`user with email ${userEmail} does not exist`);
    throw new Error(`Login failed`);
  }

  const { role, id } = user;
  const userToken = encrypt({ id, role });
  await userModel.updateOne({ id });

  return { user: { ...user, token: userToken } };
};

const adminRegister = async ({ email, name, role }) => {
  const isUser = await userModel.findOne({ email });
  if (isUser) {
    console.error(`User account creation failed, already exist`);
    throw new Error("Account already exist, please login");
  }
  await userModel.create({ email, name, role });
};

const authService = {
  loginEmail,
  emailConfirm,
  adminRegister,
};

export default authService;
