import { userModel } from '../db/models';
import { SendOptionsTypes } from '../@types/mailer';
import { LOGIN_EMAIL_SUBJECT, ROLES } from '../utils/constants';
import { decrypt, encrypt } from '../utils/cryptography';
import { sendMail } from '../utils/mailer';

const loginEmail = async (email: string) => {
  const user = await userModel.findOne({ email }).lean();
  if (!user) {
    console.error(`user with email ${email} does not exist`);
    throw new Error(`Login failed`);
  }

  const token = encrypt({ data: { id: user._id, role: user.role }, exp: '2h' });
  await sendMail({
    from: process.env['MAIL_ADDRESS'],
    to: user.email,
    subject: LOGIN_EMAIL_SUBJECT,
    // if time, change to ejs helper
    html: `<div>
    <p>omo Please login using the link below</p>
    <small>Link expires in 2 hours</small>
    <a href='${process.env['APP_URL']}/token/${token}'>Login here
    </a>
    or use this link ${process.env['APP_URL']}/token/${token}
    </div>`,
  });
};

const emailConfirm = async (token: string) => {
  const { data } = decrypt<Record<string, any>>(token);
  const user = await userModel.findOne({ _id: data.id }, 'name role').lean();
  if (!user) {
    console.error(`user with id ${data.id} does not exist`);
    throw new Error(`Login failed`);
  }

  const { role, _id: id } = user;
  const userToken = encrypt({ data: { id, role }, exp: '120h' });
  await userModel.updateOne({ id });

  return { user: { ...user, token: `${userToken}` } };
};

const adminRegister = async ({ email, name, role }: { email: string; name: string; role: string }) => {
  const isUser = await userModel.findOne({ email });
  if (isUser) {
    console.error(`User account creation failed, already exist`);
    throw new Error('Account already exist, please login');
  }
  await userModel.create({ email, name, role });
};

const authService = {
  loginEmail,
  emailConfirm,
  adminRegister,
};

export default authService;
