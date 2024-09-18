import { Schema, model } from "mongoose";

import { MODELS, PROJECT_STATUS } from "../../utils/constants";
import { ProjectInterface } from "../../types/models";

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
    teams: [
      {
        type: Schema.Types.ObjectId,
        ref: "project",
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
