import { Schema, model } from 'mongoose';
import { TASK_STATUS, MODELS } from '../../utils/constants';
import { TaskInterface } from '../../@types/models';

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
      ref: 'user',
    },
    assigned: {
      type: Boolean,
    },
    comments: [
      {
        _id: {
          type: Schema.Types.ObjectId,
        },
        user: { type: Schema.Types.ObjectId, ref: 'user' },
        message: { type: String },
        createdAt: { type: Date, default: Date.now },
      },
    ],
    status: {
      type: String,
      enum: ['todo', 'inprogress', 'done'],
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
