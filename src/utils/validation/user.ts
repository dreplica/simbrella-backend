import * as Joi from "joi";

const createUser = Joi.object({
  name: Joi.string().min(3).max(30).required().messages({
    "string.base": "Name should be a type of string",
    "string.empty": "Name cannot be empty",
    "string.min": "Name should have a minimum length of {#limit}",
    "string.max": "Name should have a maximum length of {#limit}",
    "any.required": "Name is a required field",
  }),
  email: Joi.string().email().required().messages({
    "string.base": "Email should be a type of string",
    "string.email": "Email must be a valid email address",
    "any.required": "Email is a required field",
  }),
  role: Joi.string()
    .valid("admin", "manager", "member")
    .default("member")
    .messages({
      "string.base": "Role should be a type of string",
      "any.only": "Role must be one of [admin, manager, member]",
    }),
});

const userValidation = {
  createUser,
};

export default userValidation;