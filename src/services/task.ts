import { projectModel, taskModel, userModel } from '../db/models';
import { TaskInterface } from '../@types/models';
import { mongooseTransaction, setEmptyObjectValuesToNull } from '../utils/utils';

const getTask = async (id: string) => {
  const task = await taskModel
    .findById(id)
    .populate([
      { path: 'assignedTo', select: 'name role' },
      { path: 'comments.user', select: 'name' },
    ])
    .lean();
  if (!task) {
    throw new Error(`task does not exist`);
  }
  return { task };
};

const getAllTask = async (projectId: string) => {
  const tasks = await projectModel
    .findById(projectId)
    .populate({ path: 'tasks', populate: { path: 'assignedTo', select: '_id name role' } })
    .lean();

  if (!tasks) {
    console.error(`Failed to fetch task from project with id ${projectId}`);
    throw new Error(`No tasks available on this project`);
  }
  return { tasks };
};

type CreateTaskType = TaskInterface & { projectId: string };
const createTask = async (taskPayload: CreateTaskType) => {
  const { title, description, projectId } = setEmptyObjectValuesToNull(taskPayload);
  return await mongooseTransaction(async (session) => {
    const task = new taskModel({
      title,
      description,
    });

    await projectModel.findByIdAndUpdate(projectId, { $addToSet: { tasks: task._id } });
    await task.save({ session });
    return { task };
  });
};

const updateTask = async (taskPayload: TaskInterface) => {
  const { id, title, description, status, assignedTo } = setEmptyObjectValuesToNull(taskPayload);
  const task = await taskModel
    .findByIdAndUpdate(id, { description, title, status }, { new: true })
    .populate([
      { path: 'assignedTo', select: 'name role' },
      { path: 'comments.user', select: 'name' },
    ])
    .lean();

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

    if (!task) {
      console.error(`task with id ${taskId} does not exist`);
      throw new Error(`task not found`);
    }
    return { task };
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
    .populate([
      { path: 'assignedTo', select: 'name role' },
      { path: 'comments.user', select: 'name' },
    ])
    .lean();
  if (!task) {
    console.error(`task with id ${taskId} does not exist`);
    throw new Error(`task not found`);
  }

  return { task };
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
  addComment,
  getAllComments,
};

export default taskService;
