import express from "express";
import {
  createProjectController,
  deleteProjectController,
  deleteProjectUserController,
  getAllProjectController,
  getProjectController,
  updateProjectController,
} from "../controllers";

const router = express.Router();

router.get("/", /*authRoleMiddleware, */ getProjectController);
router.get("/all", /*authRoleUserMiddleware, */ getAllProjectController);
router.post("/create", /*authRoleUserMiddleware, */ createProjectController);
router.put("/update", /*authRoleMiddleware, */ updateProjectController);
router.delete("/:projectId", /*authRoleMiddleware, */ deleteProjectController);
router.delete("/:userId", /*authRoleMiddleware, */ deleteProjectUserController);

export default router;
