import { notificationModel, userModel } from '../db/models';
import { NotificationInterface } from '../@types/models';

const getNotification = async (notificationId: string) => {
  const notification = await notificationModel.findOne({ _id: notificationId }).lean();
  if (!notification) {
    throw new Error(`notification does not exist`);
  }
  return { notification };
};

const getAllNotification = async () => {
  const notifications = await notificationModel.find().lean();
  if (!notifications) {
    throw new Error(`No notifications available`);
  }
  return { notifications };
};

const createNotification = async (notificationBody: NotificationInterface, userId: string) => {
  const notification = await notificationModel.create(notificationBody);
  if (!notification) {
    throw new Error(`Error creating notification`);
  }
  await userModel.findByIdAndUpdate(userId, { notifications: notification._id }, { new: true });
  return { notification };
};

const notificationService = {
  getNotification,
  getAllNotification,
  createNotification,
};

export default notificationService;
