import { Request, Response } from "express";
import { loginEmailService, emailConfirmService } from "../services";

export const loginEmailController = async (req: Request, res: Response) => {
  const { email } = req.body;
  try {
    const { token } = await loginEmailService(email);
    res
      .status(200)
      .json({ data: {token}, ok: true, message: "Check email for login link" });
  } catch (error) {
    res.status(400).json({ message: "Error authenticating user", error });
  }
};

export const emailConfirmController = async (req: Request, res: Response) => {
  const { token } = req.params;

  try {
    const user = await emailConfirmService(token);
    res
      .status(200)
      .json({ data: [], ok: true, message: "Check email for login link" });
  } catch (error) {
    res.status(400).json({ message: "Error authenticating user", error });
  }
};
