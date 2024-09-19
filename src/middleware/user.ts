import { Response, Request, NextFunction } from "express";

import { deriveValidationError } from "../utils/utils";
import { userValidation } from "../utils/validation";

const createUserMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { value, error } = userValidation.createUser.validate(req.body);

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


const userMiddleware = {
  createUserMiddleware,
}

export default userMiddleware;