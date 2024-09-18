import mongoose from "mongoose";
import CONSTANTS from "../../utils/constants";

// Define the User Schema
const userSchema = new mongoose.Schema(
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
      enum: ['admin', 'manager', 'member'],
      default: CONSTANTS.ROLES.MEMBER,
    },
  },
  {
    timestamps: true, // Automatically creates 'createdAt' and 'updatedAt'
  }
);

// Create the User Model
const USER_MODEL = mongoose.model(CONSTANTS.MODELS.USER, userSchema);

export default USER_MODEL;
