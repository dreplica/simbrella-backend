import { Schema, model } from "mongoose";

import { MODELS } from "../../utils/constants";
import { TeamsInterface } from "../../@types/models";

const teamSchema = new Schema<TeamsInterface>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    users: [
      {
        type: Schema.Types.ObjectId,
        ref: "user",
      },
    ],
    projects: [
      {
        type: Schema.Types.ObjectId,
        ref: "project",
      },
    ],
    creator: {
      type: Schema.Types.ObjectId,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const teamModel = model<TeamsInterface>(MODELS.TEAM, teamSchema);

export default teamModel;
