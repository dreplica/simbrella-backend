import { userModel } from "../db/models";
import { SendOptionsTypes } from "../types/mailer";
import { LOGIN_EMAIL_SUBJECT } from "../utils/constants";
import { decrypt, encrypt } from "../utils/cryptography";
import { sendMail } from "../utils/mailer";

export const loginEmailService = async (email: string) => {
  const user = await userModel.findOne({ email });
  if (!user) {
    console.error(`user with email ${email} does not exist`);
    throw new Error(`Login failed`);
  }
  const token = encrypt({ email, exp: "2h" });

  console.log(
    {
        from: process.env["MAIL_AUTH_USER"],
        to: user.email,
        subject: LOGIN_EMAIL_SUBJECT,
        // if time, change to ejs helper
        html: `<div>
        <p>Please login using the link below</p>
        <small>Link expires in 2 hours</small>
        <a href='${process.env["API_ENDPOINT"]}/${token}'>Login here
        </a>
        or use this link ${process.env["API_ENDPOINT"]}/${token}
        </div>`,
      }
  )
  await sendMail({
    from: process.env["MAIL_AUTH_USER"],
    to: user.email,
    subject: LOGIN_EMAIL_SUBJECT,
    // if time, change to ejs helper
    html: `<div>
    <p>Please login using the link below</p>
    <small>Link expires in 2 hours</small>
    <a href='${process.env["API_ENDPOINT"]}/${token}'>Login here
    </a>
    or use this link ${process.env["API_ENDPOINT"]}/${token}
    </div>`,
  });
  return { token };
};

export const emailConfirmService = async (token: string) => {
  const { email: userEmail } = decrypt<{ email: string }>(token);

  const user = await userModel.findOne({ email: userEmail });
  if (!user) {
    console.error(`user with email ${userEmail} does not exist`);
    throw new Error(`Login failed`);
  }

  const { email, name, role, id } = user;
  const userToken = encrypt({ id, role });
  await userModel.updateOne({ id }, { token: userToken });

  return { email, name, role, userToken };
};
