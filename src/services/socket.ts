import { NotificationInterface, TaskInterface, UserInterface } from '../@types/models';
import { notificationModel, userModel } from '../db/models';
import { sendMail } from '../utils/mailer';
import { setEmptyObjectValuesToNull } from '../utils/utils';
import { taskValidation } from '../utils/validation';
import notificationService from './notification';
import taskService from './task';

const update = {
  type: 'task',
  operation: 'create',
  payload: {
    title: '',
    description: '',
    assignedTo: '',
    projectId: '',
  },
};

type CreateTaskType = TaskInterface & { projectId: string; assignedTo: string };

const notificationCreate = async (data: NotificationInterface, userId: string) => {
  return await notificationService.createNotification(data, userId);
};

export const processNotification = async (user: UserInterface, taskId: string) => {
  const taskUrl = `${process.env['APP_URL']}/dashboard/task/${taskId}`;
  await sendMail({
    from: 'me',
    to: user?.email as string,
    subject: 'Task Notification',
    html: `<p>you just got a task update<p/>< <a href="${taskUrl}">check it out</a>`,
  });

  // add changes to notification
  await notificationCreate(
    {
      title: 'Update on task',
      message: `check it out`,
      has_url: true,
      url: taskUrl,
    },
    user._id as string
  );
};

const socketCreateTask = async (payload: (typeof update)['payload']) => {
  const { assignedTo } = payload;
  const { value } = taskValidation.createTask.validate(payload);
  const { task } = await taskService.createTask(value as CreateTaskType);
  const user = await userModel.findById(assignedTo).lean().exec();

  if (user) {
    await processNotification(user as UserInterface, task._id.toString());
  }
  return { task, assignedUser: assignedTo };
};

const socketUpdateTask = async (payload: TaskInterface) => {
  const { value } = taskValidation.updateTask.validate(payload);
  const { task } = await taskService.updateTask(value);
  const user = await userModel.findOne({ tasks: task._id }).lean();

  if (user) {
    await processNotification(user, task._id.toString());
  }
  return { task, assignedUser: user };
};

const socketDeleteTask = async ({ id }: { id: string }) => {
  const { task } = await taskService.deleteTask(id);
  const user = await userModel.findOneAndDelete({ tasks: id }).lean();

  if (user) {
    await processNotification(user, task._id.toString());
  }
  return { task, assignedUser: user };
};

type TaskUserType = { taskId: string; userId: string; message?: string };
const socketAddTaskUser = async ({ taskId, userId }: TaskUserType) => {
  const {
    data: { task, user },
  } = await taskService.addTaskUser(taskId, userId);

  if (user) {
    await processNotification(user, task._id.toString());
  }
  return { task, assignedUser: user };
};

const socketRemoveTaskUser = async ({ taskId, userId }: TaskUserType) => {
  const {
    data: { task, user },
  } = await taskService.removeTaskUser(taskId, userId);

  if (user) {
    await processNotification(user, task._id.toString());
  }
  return { task, assignedUser: user };
};

const socketCommentTaskUser = async ({ taskId, userId, message }: TaskUserType) => {
  const { comment } = await taskService.addComment(taskId, userId, message!);
  const user = await userModel.findOne({ tasks: taskId }).lean();

  if (user) {
    await processNotification(user, taskId.toString());
  }
  return { comment, assignedUser: user };
};

const taskSocektOperation = async (data: Omit<typeof update, 'type'>) => {
  const { operation, payload } = data;
  switch (operation) {
    case 'create':
      socketCreateTask(payload);
    case 'update':
      socketUpdateTask(payload as unknown as TaskInterface);
    case 'delete':
      socketDeleteTask(payload as unknown as { id: string });
    case 'assign':
      socketAddTaskUser(payload as unknown as TaskUserType);
    case 'remove':
      socketRemoveTaskUser(payload as unknown as TaskUserType);
    case 'comment':
      socketCommentTaskUser(payload as unknown as TaskUserType);
    default:
      break;
  }
};

export const filterSocketRequest = (message: typeof update) => {
  const { type, operation, payload } = message;
  if (type === 'task') {
    return taskSocektOperation({ operation, payload });
  }
};
