import { Schema, model } from "mongoose";
import { TASK_STATUS, MODELS } from "../../utils/constants";
import { TaskInterface } from "../../types/models";


const taskSchema = new Schema<TaskInterface>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    creator: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    assigned: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    team: {
      type: Schema.Types.ObjectId,
      ref: "project",
    },
    comments: [
      {
        user: { type: Schema.Types.ObjectId, ref: "user" },
        message: { type: String },
      },
    ],
    status: {
      type: String,
      enum: ["todo", "inprogress", "done"],
      trim: true,
      default: TASK_STATUS.TODO,
    },
  },
  {
    timestamps: true,
  }
);

const taskModel = model<TaskInterface>(MODELS.TASK, taskSchema);

export default taskModel;
