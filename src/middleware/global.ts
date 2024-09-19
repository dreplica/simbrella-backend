import { Response, Request, NextFunction } from "express";
import Joi from "joi";

import { deriveValidationError } from "../utils/utils";

const inputMiddleware =
  (schemaValidation: Joi.ObjectSchema<any>) =>
  (req: Request, res: Response, next: NextFunction) => {
    const { value, error } = schemaValidation.validate(req.body);
    if (error) {
      const errorResponse = deriveValidationError(error);
      return res.status(400).json({
        success: false,
        message: "Validation error",
        errors: errorResponse,
      });
    }

    req.body = value;
    // no need for req.user since we are passing auth middleware
    next();
  };

const projectMiddleware = {
  inputMiddleware,
};

export default projectMiddleware;
