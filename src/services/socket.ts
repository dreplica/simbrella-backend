import { NotificationInterface, Realtime, TaskInterface, UserInterface } from '../@types/models';
import { notificationModel, projectModel, userModel } from '../db/models';
import { sendMail } from '../utils/mailer';
import { taskValidation } from '../utils/validation';
import taskService from './task';

type CreateTaskType = TaskInterface & { projectId: string; assignedTo: string };
const notificationCreate = async (data: Omit<NotificationInterface, 'user'>, ids: string[]) => {
  const bulk = ids.map((id) => ({ ...data, user: id }));
  return await notificationModel.insertMany(bulk);
};

export const processNotification = async (taskId: string) => {
  if (!taskId) return;
  try {
    const getAllUsersEmailOnProject = await projectModel
      .find({ tasks: taskId }, 'members')
      .populate('members', 'email');

    const taskUrl = `${process.env['APP_URL']}/dashboard/task/${taskId}`;
    const emails = getAllUsersEmailOnProject.map((val) => val.email).join(', ');
    const ids = getAllUsersEmailOnProject.map((val) => val._id);
    await sendMail({
      from: 'me',
      bcc: emails,
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
      ids as unknown as string[]
    );
    return;
  } catch (error) {
    console.error();
    return;
  }
};

const socketCreateTask = async (payload: Realtime['payload']) => {
  const { value } = taskValidation.createTask.validate(payload);
  const { task } = await taskService.createTask(value as CreateTaskType);
  return task;
};

const socketUpdateTask = async (payload: TaskInterface) => {
  const { value } = await taskValidation.updateTask.validate(payload);
  const { task } = await taskService.updateTask(value);

  return task;
};

const socketDeleteTask = async ({ id }: { id: string }) => {
  await taskService.deleteTask(id);
  return [];
};

type TaskUserType = { id: string; userId: string; message?: string };

const socketCommentTaskUser = async ({ id, userId, message }: TaskUserType) => {
  const { task } = await taskService.addComment(id, userId, message!);
  return task;
};

const taskSocektOperation = async (data: Realtime) => {
  const { operation, payload } = data;
  switch (operation) {
    case 'create':
      return socketCreateTask(payload);
    case 'update':
      return socketUpdateTask(payload as unknown as TaskInterface);
    case 'delete':
      return socketDeleteTask(payload as unknown as { id: string });
    case 'comment':
      return socketCommentTaskUser(payload as unknown as TaskUserType);
    case 'success':
      return processNotification(payload.id);
    default:
      return;
  }
};

export const filterSocketRequest = async (message: Realtime) => {
  const { type, operation, payload } = message;
  if (type === 'task') {
    try {
      const response = await taskSocektOperation({ operation, payload });
      return JSON.stringify({ type, operation, response });
    } catch (error) {
      return JSON.stringify({ type: 'error', message: `Error completing ${type} - ${operation}` });
    }
  }
  return { error: 'Type or operation not specified' };
};
