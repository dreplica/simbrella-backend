import * as Joi from 'joi';

const createProject = Joi.object({
  title: Joi.string().min(3).max(30).required().messages({
    'string.base': 'Title should be a type of string',
    'string.empty': 'Title cannot be empty',
    'string.min': 'Title should have a minimum length of {#limit}',
    'string.max': 'Title should have a maximum length of {#limit}',
    'any.required': 'Title is a required field',
  }),
  description: Joi.string().required().messages({
    'string.base': 'description should be a type of string',
  }),
});

const updateProject = Joi.object({
  id: Joi.string().length(24).required().messages({
    'string.base': 'id should be a type of string',
    'string.empty': 'id cannot be empty',
    'string.length': 'id length should be 24',
  }),
  title: Joi.string().min(3).max(30).messages({
    'string.base': 'Title should be a type of string',
    'string.empty': 'Title cannot be empty',
    'string.min': 'Title should have a minimum length of {#limit}',
    'string.max': 'Title should have a maximum length of {#limit}',
    'any.required': 'Title is a required field',
  }),
  description: Joi.string().messages({
    'string.base': 'description should be a type of string',
  }),
  status: Joi.string().valid('complete', 'active', 'inactive').messages({
    'string.base': 'Status should be a type of string',
    'any.only': 'Status must be one of [complete, active, inactive]',
  }),
});

// remove either add user or remove project user, 
// they are the same and can be shared
const addUserToProject = Joi.object({
  id: Joi.string().required().required().messages({
    'string.base': 'id should be a type of string',
  }),
  userId: Joi.string().required().messages({
    'string.base': 'userId should be a type of string',
  }),
});

const removeProjectUser = Joi.object({
  id: Joi.string().required().required().messages({
    'string.base': 'id should be a type of string',
  }),
  userId: Joi.string().required().messages({
    'string.base': 'userId should be a type of string',
  }),
});

const projectValidation = {
  createProject,
  updateProject,
  addUserToProject,
  removeProjectUser,
};

export default projectValidation;
