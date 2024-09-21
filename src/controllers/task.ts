import { Request, Response } from 'express';
import { taskService } from '../services';

const getTask = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const { task } = await taskService.getTask(id);
    res.status(201).json({ data: task, success: true });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error fetching task',
      error: (error as Error).message,
    });
  }
};

const getAllTask = async (req: Request, res: Response) => {
  try {
    const { projectId } = req.params;
    const { tasks } = await taskService.getAllTask(projectId);
    res.status(201).json({ data: tasks, success: true });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error fetching task',
      error: (error as Error).message,
    });
  }
};

const createTask = async (req: Request, res: Response) => {
  try {
    const user = await taskService.createTask(req.body);
    res.status(201).json({ data: user, success: true });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error creating task',
      error: (error as Error).message,
    });
  }
};

const updateTask = async (req: Request, res: Response) => {
  try {
    const { task } = await taskService.updateTask(req.body);
    res.status(201).json({ data: task, success: true });
  } catch (error) {
    console.error({ error });
    res.status(400).json({ success: false, message: 'Error updating task', error: (error as Error).message });
  }
};

const deleteTask = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const { task } = await taskService.deleteTask(id);
    res.status(201).json({ data: task, success: true });
  } catch (error) {
    console.error({ error });
    res.status(400).json({ success: false, message: 'Error deleting task', error: (error as Error).message });
  }
};

const addTaskUser = async (req: Request, res: Response) => {
  const { id, userId } = req.body;
  try {
    await taskService.addTaskUser(id, userId);
    res.status(201).json({ data: [], success: true });
  } catch (error) {
    res.status(400).json({ success: false, message: 'Error adding user', error });
  }
};

// users can update {name, email}
const removeTaskUser = async (req: Request, res: Response) => {
  const { id, userId } = req.body;
  try {
    await taskService.removeTaskUser(id, userId);
    res.status(201).json({ data: [], success: true });
  } catch (error) {
    res.status(400).json({ success: false, message: 'Error removing user', error: (error as Error).message });
  }
};

// users can update {name, email}
const addComment = async (req: Request, res: Response) => {
  const { id, message, userId } = req.body;
  try {
    const { comment } = await taskService.addComment(id, userId, message);
    res.status(201).json({ data: comment, success: true });
  } catch (error) {
    res.status(400).json({ success: false, message: 'Error updating user', error });
  }
};

const getAllComments = async (req: Request, res: Response) => {
  try {
    const { comments } = await taskService.getAllComments(req.params.id);
    res.status(201).json({ data: comments, success: true });
  } catch (error) {
    res.status(400).json({ success: false, message: 'Error updating user', error: (error as Error).message });
  }
};


const taskController = {
  getTask,
  getAllTask,
  createTask,
  deleteTask,
  updateTask,
  addTaskUser,
  removeTaskUser,
  getAllComments,
  addComment,
};

export default taskController;
