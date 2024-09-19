import { Request, Response } from "express";
import {
  createUserService,
  deleteUserService,
  getAllUserService,
  getUserService,
  updateUserService,
} from "../services";

const getUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const { user } = await getUserService(id);
    res.status(201).json({ data: user, ok: true });
  } catch (error) {
    res.status(400).json({
      message: "Error fetching user",
      error: (error as Error).message,
    });
  }
};

const getAllUser = async (req: Request, res: Response) => {
  try {
    const { users } = await getAllUserService();
    res.status(201).json({ data: users, ok: true });
  } catch (error) {
    res.status(400).json({
      message: "Error fetching user",
      error: (error as Error).message,
    });
  }
};

const createUser = async (req: Request, res: Response) => {
  const { email, name, role } = req.body;
  try {
    const user = await createUserService({ name, email, role });
    res.status(201).json({ data: user, ok: true });
  } catch (error) {
    res.status(400).json({
      message: "Error creating user",
      error: (error as Error).message,
    });
  }
};

const deleteUser = async (req: Request, res: Response) => {
  const { userId } = req.params;
  try {
    const user = await deleteUserService(userId);
    // delete user from project, delete user from task
    // revert task to unassigned
    // if manager revert project manager to admin
    res.status(201).json({ data: user, ok: true });
  } catch (error) {
    console.error({ error });
    res
      .status(400)
      .json({ message: "Error deleting user", error: error.message }); // lets have a wrapper that returns error mesage
  }
};

// users can update {name, email}
const updateUser = async (req: Request, res: Response) => {
  const { id, email, name, role } = req.body;
  try {
    const { user } = await updateUserService({ id, email, name, role });
    res.status(201).json({ data: user, ok: true });
  } catch (error) {
    res.status(400).json({ message: "Error updating user", error });
  }
};

const userController = {
  getUser,
  getAllUser,
  createUser,
  deleteUser,
  updateUser,
};

export default userController;
