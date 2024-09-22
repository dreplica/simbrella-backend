import { Request, Response } from 'express';
import { userService } from '../services';
import { mongooseTransaction } from '../utils/utils';

const getUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const { user } = await userService.getUser(id);
    res.status(201).json({ data: user, success: true });
  } catch (error) {
    res.status(400).json({
      message: 'Error fetching user',
      error: (error as Error).message,
    });
  }
};

const getAllUser = async (req: Request, res: Response) => {
  try {
    const { users } = await userService.getAllUser();
    res.status(201).json({ data: users, success: true });
  } catch (error) {
    res.status(400).json({
      message: 'Error fetching user',
      error: (error as Error).message,
    });
  }
};

const createUser = async (req: Request, res: Response) => {
  const { email, name, role } = req.body;
  try {
    const {user} = await userService.createUser({ name, email, role });
    res.status(201).json({ data: user, success: true });
  } catch (error) {
    res.status(400).json({
      message: 'Error creating user',
      error: (error as Error).message,
    });
  }
};

const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const {user} = await userService.deleteUser(id);
    res.status(201).json({ data: user, success: true });
  } catch (error) {
    console.error({ error });
    res.status(400).json({ message: 'Error deleting user', error: (error as Error).message }); // lets have a wrapper that returns error mesage
  }
};

// users can update {name, notification preference}
const updateUser = async (req: Request, res: Response) => {
  try {
    const { user } = await userService.updateUser(req.body);
    res.status(201).json({ data: user, success: true });
  } catch (error) {
    res.status(400).json({ message: 'Error updating user', error });
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
