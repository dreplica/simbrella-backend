import express from "express";
import { projectController } from "../controllers";
import { authMiddleware, globalMiddleware } from "../middleware";
import { projectValidation } from "../utils/validation";
import { ROLES } from "../utils/constants";

const router = express.Router();

router.get(
  "/",
  authMiddleware.authorizeMiddleware([ROLES.ADMIN, ROLES.MANAGER]),
  projectController.getAllProject
);
router.post(
  "/create",
  authMiddleware.authorizeMiddleware([ROLES.ADMIN, ROLES.MANAGER]),
  globalMiddleware.inputMiddleware(projectValidation.createProject),
  projectController.createProject
);
router.put(
  "/update",
  authMiddleware.authorizeMiddleware([ROLES.ADMIN, ROLES.MANAGER]),
  globalMiddleware.inputMiddleware(projectValidation.updateProject),
  projectController.updateProject
);
router.delete(
  "/:id",
  authMiddleware.authorizeMiddleware([ROLES.ADMIN, ROLES.MANAGER]),
  projectController.deleteProject
);
router.delete(
  "/user",
  authMiddleware.authorizeMiddleware([ROLES.ADMIN, ROLES.MANAGER]),
  globalMiddleware.inputMiddleware(projectValidation.deleteProjectUser),
  projectController.deleteProjectUser
);
router.get(
  "/:id",
  authMiddleware.authorizeMiddleware([
    ROLES.ADMIN,
    ROLES.MANAGER,
    ROLES.MEMBER,
  ]),
  projectController.getProject
);

export default router;
