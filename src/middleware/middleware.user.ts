import { Response, Request, NextFunction } from "express";
import { createUserValidationSchema } from "../utils/validation";
import { deriveValidationError } from "../utils/utils";

export const createUserMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { value, error } = createUserValidationSchema.validate(req.body);

  if (error) {
    const errorResponse = deriveValidationError(error);
    return res.status(400).json({
      success: false,
      message: "Validation error",
      errors: errorResponse,
    });
  }

  req.body = value;
  next();
};
