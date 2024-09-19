import { Response, Request, NextFunction } from "express";

import { deriveValidationError } from "../utils/utils";
import { projectValidation } from "../utils/validation";

const createProjectMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { value, error } = projectValidation.createProject.validate(req.body);

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
  createProjectMiddleware,
}

export default projectMiddleware;