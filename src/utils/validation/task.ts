import * as Joi from "joi";

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
  projectId: Joi.string().length(24).required().messages({
    "string.base": "projectId required should be a type of string",
  }),
});

const updateTask = Joi.object({
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
  assignedTo: Joi.string().length(24).messages({
    "string.base": "assignedTo should be a type of string",
  }),
  description: Joi.string().messages({
    "string.base": "description should be a type of string",
  }),
  status: Joi.string().valid("todo", "inprogress", "done").messages({
    "string.base": "Status should be a type of string",
    "any.only": "Status must be one of [todo, inprogress, done]",
  }),
});

const addTaskComment = Joi.object({
  id: Joi.string().length(24).required().messages({
    "string.base": "id should be a type of string",
    "string.empty": "id cannot be empty",
    "string.length": "id length should be 24",
  }),
  userId: Joi.string().length(24).required().messages({
    "string.base": "userId should be a type of string",
    "string.empty": "userId cannot be empty",
    "string.length": "userId length should be 24",
  }),
  message: Joi.string().min(1).max(500).required().messages({
    "string.base": "Message should be a type of string",
    "string.empty": "Message cannot be empty",
    "string.min": "Message should have a minimum length of {#limit}",
    "string.max": "Message should have a maximum length of {#limit}",
    "any.required": "Message is a required field",
  })
});

const taskValidation = {
  createTask,
  updateTask,
  addTaskComment,
};

export default taskValidation;
