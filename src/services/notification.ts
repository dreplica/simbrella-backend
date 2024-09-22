import { notificationModel, userModel } from '../db/models';
import { NotificationInterface } from '../@types/models';

const getNotification = async (id: string) => {
  const notification = await notificationModel.findOne({ user: id }).lean();
  if (!notification) {
    throw new Error(`notification does not exist`);
  }
  return { notification };
};

const getAllNotification = async (id: string) => {
  const notifications = await notificationModel.find({user: id}).lean();
  if (!notifications) {
    throw new Error(`No notifications available`);
  }
  return { notifications };
};

const createNotification = async (notificationBody: NotificationInterface) => {

  const notification = await notificationModel.insertMany(notificationBody);

  if (!notification) {
    throw new Error(`Error creating notification`);
  }
  return { notification };
};

const notificationService = {
  getNotification,
  getAllNotification,
  createNotification,
};

export default notificationService;
