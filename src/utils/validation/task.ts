import * as Joi from "joi";
import { Schema } from "mongoose";

const createTask = Joi.object({
  title: Joi.string().min(3).max(30).required().messages({
    "string.base": "Title should be a type of string",
    "string.empty": "Title cannot be empty",
    "string.min": "Title should have a minimum length of {#limit}",
    "string.max": "Title should have a maximum length of {#limit}",
    "any.required": "Title is a required field",
  }),
  description: Joi.string().required().messages({
    "string.base": "description should be a type of string",
  }),
  assigned: Joi.string().length(24).required().messages({
    "string.base": "description should be a type of string",
  }),
  project: Joi.string().length(24).required().messages({
    "string.base": "description should be a type of string",
  }),
});

const updateProject = Joi.object({
  id: Joi.string().length(24).required().messages({
    "string.base": "id should be a type of string",
    "string.empty": "id cannot be empty",
    "string.length": "id length should be 24",
  }),
  title: Joi.string().min(3).max(30).messages({
    "string.base": "Title should be a type of string",
    "string.empty": "Title cannot be empty",
    "string.min": "Title should have a minimum length of {#limit}",
    "string.max": "Title should have a maximum length of {#limit}",
    "any.required": "Title is a required field",
  }),
  description: Joi.string().messages({
    "string.base": "description should be a type of string",
  }),
  tasks: Joi.string().messages({
    "string.base": "task should be a type of string",
  }),
  teams: Joi.string().messages({
    "string.base": "team should be a type of string",
  }),
  status: Joi.string().valid("complete", "active", "inactive").messages({
    "string.base": "Status should be a type of string",
    "any.only": "Status must be one of [complete, active, inactive]",
  }),
});

const deleteProjectUser = Joi.object({
  id: Joi.string().required().required().messages({
    "string.base": "id should be a type of string",
  }),
  userId: Joi.string().required().messages({
    "string.base": "userId should be a type of string",
  }),
});

const projectValidation = {
  createProject,
  updateProject,
  deleteProjectUser,
};

export default projectValidation;
