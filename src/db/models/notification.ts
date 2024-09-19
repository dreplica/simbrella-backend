import { Schema, model } from "mongoose";

import { NOTIFICATION_STATUS, MODELS } from "../../utils/constants";
import { NotificationInterface } from "../../@types/models";

const notificationSchema = new Schema<NotificationInterface>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    message: {
      type: String,
      required: true,
      trim: true,
    },
    to: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    has_url: {
      type: Boolean,
    },
    url: {
      type: String,
    },
    status: {
      type: String,
      enum: ["seen", "unseen"],
      trim: true,
      default: NOTIFICATION_STATUS.UNSEEN,
    },
  },
  {
    timestamps: true,
  }
);

const taskModel = model<NotificationInterface>(
  MODELS.NOTIFICATION,
  notificationSchema
);

export default taskModel;
