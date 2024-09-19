import { notificationModel, userModel } from "../db/models";
import { NotificationInterface } from "../@types/models";
import { setEmptyObjectValuesToNull } from "../utils/utils";

const getNotification = async (notificationId: string) => {
  const notification = await notificationModel
    .findOne({ _id: notificationId })
    .lean();
  if (!notification) {
    throw new Error(`notification does not exist`);
  }
  return { notification };
};

const getAllNotification = async () => {
  const notifications = await notificationModel.findOne().lean();
  if (!notifications) {
    throw new Error(`No notifications available`);
  }
  return { notifications };
};

const createNotification = async (notificationBody: NotificationInterface) => {
  const notification = await notificationModel.create(notificationBody);

  return { notification };
};

const updateNotification = async (notificationBody: NotificationInterface) => {
  const nullifyData =
    setEmptyObjectValuesToNull<NotificationInterface>(notificationBody);

  const notification = await notificationModel
    .findOneAndUpdate({ _id: nullifyData.id }, nullifyData)
    .lean();

  if (!notification) {
    console.error(`notification with id ${nullifyData} does not exist`);
    throw new Error(`notification not found`);
  }
  return { notification };
};

const deleteNotification = async (notificationId: string) => {
  const notification = await notificationModel
    .findByIdAndDelete({ _id: notificationId })
    .lean();
  if (!notification) {
    console.error(`notification with id ${notificationId} does not exist`);
    throw new Error(`notification not found`);
  }
  return { notification };
};

const deleteNotificationUser = async ({ userId, notificationId }) => {
  const user = await userModel
    .findByIdAndUpdate(
      { _id: userId },
      { $pop: { notifications: notificationId } }
    )
    .lean();
  const notification = await notificationModel
    .findByIdAndUpdate({ _id: notificationId }, { $pop: { teams: userId } })
    .lean();
  if (!notification) {
    console.error(`notification with id ${notificationId} does not exist`);
    throw new Error(`notification not found`);
  }
  return { notification };
};

const notificationService = {
  getNotification,
  getAllNotification,
  createNotification,
  updateNotification,
  deleteNotification,
  deleteNotificationUser,
};

export default notificationService;
