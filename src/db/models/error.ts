import { Schema, model } from "mongoose";

import { MODELS } from "../../utils/constants";

const errorSchema = new Schema(
  {
    message: {
      type: String,
      trim: true,
    },
    errorDetails: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const errorModel = model(MODELS.ERROR, errorSchema);

export default errorModel;
