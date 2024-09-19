import { Request, Response } from "express";
import { taskService } from "../services";

const getTask = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const { user } = await taskService.getTaskService(id);
    res.status(201).json({ data: user, ok: true });
  } catch (error) {
    res.status(400).json({
      message: "Error fetching user",
      error: (error as Error).message,
    });
  }
};

const getAllTask = async (req: Request, res: Response) => {
  try {
    const { id, role } = req.user;
    // need to get task for a particular user
    const { users } = await taskService.getAllTaskService(id, role);
    res.status(201).json({ data: users, ok: true });
  } catch (error) {
    res.status(400).json({
      message: "Error fetching user",
      error: (error as Error).message,
    });
  }
};

const createTask = async (req: Request, res: Response) => {
  const { email, name, role } = req.body;
  try {
    const user = await taskService.createTaskService({ name, email, role });
    res.status(201).json({ data: user, ok: true });
  } catch (error) {
    res.status(400).json({
      message: "Error creating user",
      error: (error as Error).message,
    });
  }
};

const deleteTask = async (req: Request, res: Response) => {
  const { userId } = req.params;
  try {
    const user = await taskService.deleteTaskService(userId);
    res.status(201).json({ data: user, ok: true });
  } catch (error) {
    console.error({ error });
    res
      .status(400)
      .json({ message: "Error deleting user", error: error.message }); // lets have a wrapper that returns error mesage
  }
};

// users can update {name, email}
const updateTask = async (req: Request, res: Response) => {
  const { id, email, name, role } = req.body;
  try {
    const { user } = await taskService.updateTaskService({
      id,
      email,
      name,
      role,
    });
    res.status(201).json({ data: user, ok: true });
  } catch (error) {
    res.status(400).json({ message: "Error updating user", error });
  }
};

const taskController = {
  getTask,
  getAllTask,
  createTask,
  deleteTask,
  updateTask,
};

export default taskController;
