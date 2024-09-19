import { Request, Response } from "express";
import { authService } from "../services";
import { ROLES } from "../utils/constants";

export const adminRegister = async (req: Request, res: Response) => {
  const { email, name } = req.body;
  try {
    await authService.adminRegister({
      email,
      name,
      role: ROLES["ADMIN"],
    });

    res.status(201).json({
      data: [],
      ok: true,
      message: "Account created, please login",
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Error creating account", error });
  }
};

export const loginEmail = async (req: Request, res: Response) => {
  const { email } = req.body;
  try {
    // later we will remove the derive value
    await authService.loginEmail(email);
    res.status(200).json({
      data: [],
      ok: true,
      message: "Check email for login link",
    });
  } catch (error) {
    console.error(error)
    res.status(400).json({ message: "Error authenticating user", error });
  }
};

export const emailConfirm = async (req: Request, res: Response) => {
  console.log(req.params)
  const { token } = req.params;

  try {
    const { user } = await authService.emailConfirm(token);
    res
      .status(200)
      .json({ data: user, ok: true, message: "Check email for login link" });
  } catch (error) {
    console.error({error})
    res.status(400).json({ message: "Error authenticating user", error });
  }
};

const authController = {
  adminRegister,
  loginEmail,
  emailConfirm,
};

export default authController;
