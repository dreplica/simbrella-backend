import { projectModel, taskModel, userModel } from '../db/models';
import { TaskInterface } from '../@types/models';
import { mongooseTransaction, setEmptyObjectValuesToNull } from '../utils/utils';

const getTask = async (id: string) => {
  const task = await taskModel.findById(id).lean();
  if (!task) {
    throw new Error(`task does not exist`);
  }
  return { task };
};

const getAllTask = async (projectId: string) => {
  const tasks = await projectModel.findById(projectId).populate('tasks').lean();

  if (!tasks) {
    console.error(`Failed to fetch task from project with id ${projectId}`);
    throw new Error(`No tasks available on this project`);
  }
  return { tasks };
};

type CreateTaskType = TaskInterface & { projectId: string; assignedTo: string };
const createTask = async (taskPayload: CreateTaskType) => {
  const { title, description, assignedTo, projectId } = setEmptyObjectValuesToNull(taskPayload);
  return await mongooseTransaction(async (session) => {
    const task = new taskModel({
      title,
      description,
      isAssigned: !!assignedTo,
    });

    if (assignedTo) {
      await userModel.findByIdAndUpdate(assignedTo, { $addToSet: { tasks: task._id } }, { session });
    }

    await projectModel.findByIdAndUpdate(projectId, { $addToSet: { tasks: task._id } });
    await task.save({ session });
    return { task };
  });
};

const updateTask = async (taskPayload: TaskInterface) => {
  const { id, title, description, status } = setEmptyObjectValuesToNull(taskPayload);
  const task = await taskModel.findByIdAndUpdate(id, { description, title, status }, { new: true }).lean();

  if (!task) {
    console.error(`task with id ${id} does not exist`);
    throw new Error(`task not found`);
  }
  return { task };
};

const deleteTask = async (taskId: string) => {
  return mongooseTransaction(async (session) => {
    const task = await taskModel.findByIdAndDelete({ _id: taskId }, { session }).lean();

    await projectModel.findOneAndUpdate({ tasks: taskId }, { $pull: { tasks: taskId } }, { session }).lean();

    await userModel.findOneAndUpdate({ tasks: taskId }, { $pull: { tasks: taskId } }, { session }).lean();

    if (!task) {
      console.error(`task with id ${taskId} does not exist`);
      throw new Error(`task not found`);
    }
    return { task };
  });
};

const addTaskUser = async (taskId: string, userId: string) => {
  return mongooseTransaction(async (session) => {
    const task = await taskModel.findByIdAndUpdate(taskId, { isAssigned: true }, { session }).lean();
    if (!task) {
      console.error(`task with id ${taskId} does not exist`);
      throw new Error(`task not found`);
    }

    const user = await userModel.findByIdAndUpdate(userId, { $addToSet: { tasks: taskId } }, { session }).lean();
    if (!user) {
      console.error(`user with id ${userId} does not exist`);
      throw new Error(`user not found`);
    }
    return { data: { user, task } };
  });
};

const removeTaskUser = async (taskId: string, userId: string) => {
  return mongooseTransaction(async (session) => {
    const task = await taskModel.findByIdAndUpdate(taskId, { isAssigned: false }, { session }).lean();
    if (!task) {
      console.error(`task with id ${taskId} does not exist`);
      throw new Error(`task not found`);
    }

    const user = await userModel.findByIdAndUpdate(userId, { $pull: { tasks: taskId } }, { session }).lean();
    if (!user) {
      console.error(`user with id ${userId} does not exist`);
      throw new Error(`user not found`);
    }
    return { data: { task, user } };
  });
};

const addComment = async (taskId: string, userId: string, message: string) => {
  const task = await taskModel
    .findByIdAndUpdate(
      taskId,
      {
        $push: {
          comments: {
            user: userId,
            message,
          },
        },
      },
      { new: true }
    )
    .lean();
  if (!task) {
    console.error(`task with id ${taskId} does not exist`);
    throw new Error(`task not found`);
  }

  return { comment: task.comments[task.comments.length - 1] };
};

const getAllComments = async (taskId: string) => {
  const task = await taskModel
    .findById(taskId, { comments: true, _id: true })
    .populate('comments.user', 'name _id')
    .lean();
  if (!task) {
    console.error(`task with id ${taskId} does not exist`);
    throw new Error(`task not found`);
  }
  return { comments: task.comments };
};

const taskService = {
  getTask,
  getAllTask,
  createTask,
  updateTask,
  deleteTask,
  addTaskUser,
  removeTaskUser,
  addComment,
  getAllComments,
};

export default taskService;
