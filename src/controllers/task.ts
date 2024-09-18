import { Request, Response } from "express";
import {
  createTaskService,
  deleteTaskService,
  getAllTaskService,
  getTaskService,
  updateTaskService,
} from "../services";

export const getTaskController = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const { user } = await getTaskService(id);
    res.status(201).json({ data: user, ok: true });
  } catch (error) {
    res.status(400).json({
      message: "Error fetching user",
      error: (error as Error).message,
    });
  }
};

export const getAllTaskController = async (req: Request, res: Response) => {
  try {
    const { users } = await getAllTaskService();
    res.status(201).json({ data: users, ok: true });
  } catch (error) {
    res.status(400).json({
      message: "Error fetching user",
      error: (error as Error).message,
    });
  }
};

export const createTaskController = async (req: Request, res: Response) => {
  const { email, name, role } = req.body;
  try {
    const user = await createTaskService({ name, email, role });
    res.status(201).json({ data: user, ok: true });
  } catch (error) {
    res.status(400).json({
      message: "Error creating user",
      error: (error as Error).message,
    });
  }
};

export const deleteTaskController = async (req: Request, res: Response) => {
  const { userId } = req.params;
  try {
    const user = await deleteTaskService(userId);
    res.status(201).json({ data: user, ok: true });
  } catch (error) {
    console.error({ error });
    res
      .status(400)
      .json({ message: "Error deleting user", error: error.message }); // lets have a wrapper that returns error mesage
  }
};

// users can update {name, email}
export const updateTaskController = async (req: Request, res: Response) => {
  const { id, email, name, role } = req.body;
  try {
    const { user } = await updateTaskService({ id, email, name, role });
    res.status(201).json({ data: user, ok: true });
  } catch (error) {
    res.status(400).json({ message: "Error updating user", error });
  }
};
