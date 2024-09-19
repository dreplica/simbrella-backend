import { taskModel, userModel } from "../db/models";
import { TaskInterface } from "../@types/models";
import { ROLES } from "../utils/constants";
import { setEmptyObjectValuesToNull } from "../utils/utils";

const getTask = async (id: string) => {
  const task = await taskModel.findOne({ _id: id }).lean();
  if (!task) {
    throw new Error(`task does not exist`);
  }
  return { task };
};

// i can get all task assigned to me, if not user role i can see all task
const getAllTask = async () => {
  const tasks = await taskModel.find().lean();
  if (!tasks) {
    throw new Error(`No tasks available`);
  }
  return { tasks };
};

const createTask = async (taskBody: TaskInterface) => {
  const task = await taskModel.create(taskBody);
  return { task };
};

const updateTask = async (taskBody: TaskInterface) => {
  const nullifyData = setEmptyObjectValuesToNull<TaskInterface>(taskBody);

  const task = await taskModel
    .findOneAndUpdate({ _id: nullifyData.id }, nullifyData)
    .lean();

  if (!task) {
    console.error(`task with id ${nullifyData} does not exist`);
    throw new Error(`task not found`);
  }
  return { task };
};

const deleteTask = async (taskId: string) => {
  const task = await taskModel.findByIdAndDelete({ _id: taskId }).lean();
  if (!task) {
    console.error(`task with id ${taskId} does not exist`);
    throw new Error(`task not found`);
  }
  return { task };
};

const deleteTaskUser = async ({ userId, taskId }) => {
  const user = await userModel
    .findByIdAndUpdate({ _id: userId }, { $pop: { tasks: taskId } })
    .lean();
  const task = await taskModel
    .findByIdAndUpdate({ _id: taskId }, { $pop: { teams: userId } })
    .lean();
  if (!task) {
    console.error(`task with id ${taskId} does not exist`);
    throw new Error(`task not found`);
  }
  return { task };
};

const taskService = {
  getTask,
  getAllTask,
  createTask,
  updateTask,
  deleteTask,
  deleteTaskUser,
};

export default taskService;
