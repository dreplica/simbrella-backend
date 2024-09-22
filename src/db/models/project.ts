import { Schema, model } from "mongoose";

import { MODELS, PROJECT_STATUS } from "../../utils/constants";
import { ProjectInterface } from "../../@types/models";

const projectSchema = new Schema<ProjectInterface>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
      unique: false,
    },
    creator: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "user",
    },
    tasks: [
      {
        type: Schema.Types.ObjectId,
        ref: "task",
      },
    ],
    members: [
      {
        type: Schema.Types.ObjectId,
        ref: "user",
      },
    ],
    status: {
      type: String,
      enum: ["complete", "active", "inactive"],
      trim: true,
      default: PROJECT_STATUS.INACTIVE,
    },
  },
  {
    timestamps: true,
  }
);

const projectModel = model<ProjectInterface>(MODELS.PROJECT, projectSchema);

export default projectModel;
