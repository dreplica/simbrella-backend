import { Schema, model } from "mongoose";

import { MODELS, ROLES } from "../../utils/constants";
import { UserInterface } from "../../@types/models";


// lets add settings, to add notification preference e.g receive email or not
const userSchema = new Schema<UserInterface>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    role: {
      type: String,
      enum: ["admin", "manager", "member"],
      trim: true,
      default: ROLES.MEMBER,
    },
    token: {
      type: String,
      trim: true,
    },
    notifications: [
      {
        type: Schema.Types.ObjectId,
        ref: "notification",
      },
    ],
    projects: [
      {
        type: Schema.Types.ObjectId,
        ref: "project",
      },
    ],
    tasks: [
      {
        type: Schema.Types.ObjectId,
        ref: "task",
      },
    ],
    isDisabled: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const userModel = model<UserInterface>(MODELS.USER, userSchema);

export default userModel;
