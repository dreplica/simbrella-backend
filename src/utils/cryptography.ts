import jwt from "jsonwebtoken";

type EncryptOptionType = {
  exp?: string | number;
  [k: string]: unknown;
};

const SECRET = process.env.JWT_SECRET || 'sxdfh';

export const decrypt = <T>(token: string): T => {
  if (!token) throw new Error("invalid token");
  return jwt.verify(token, SECRET as string) as T;
};

export const encrypt = (options: EncryptOptionType) => {
  const { exp, data } = options;

  return jwt.sign({ data }, SECRET as string, {
    expiresIn: exp,
  });
};
