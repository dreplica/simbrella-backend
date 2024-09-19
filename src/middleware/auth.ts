import { Response, Request, NextFunction } from "express";

import { decrypt } from "../utils/cryptography";
import { ROLES } from "../utils/constants";
import { userModel } from "../db/models";

const authorizeMiddleware =
  (userRole: ROLES[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers["authorization"] as string;
    console.log(authHeader);
    if (!authHeader) {
      return res.status(404).json({
        success: false,
        message: "user not authorized",
        errors: req.headers,
      });
    }
    const token = authHeader.split(" ")[1];
    try {
      const {
        data: { id, role },
      } = decrypt<{ data: { id: string; role: string } }>(token);

      if (!id) {
        return res.status(404).json({
          success: false,
          message: "user not authorized",
          errors: "",
        });
      }
      const permission = await userModel
        .findOne({
          _id: id,
          role: { $in: userRole },
        })
        .lean();

      if (!permission) {
        console.log({permission});
        return res.status(401).json({
          success: false,
          message: "unAuthorized action by user",
          errors: "",
        });
      }
      req.user = { id, role };
      // no need for req.user since we are passing auth middleware
      next();
    } catch (error) {
      console.log(error);
      return res.status(401).json({
        success: false,
        message: "Problem authorizing user, please try login in",
        errors: "",
      });
    }
  };

const authMiddleware = {
  authorizeMiddleware,
};

export default authMiddleware;
