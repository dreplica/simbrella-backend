import express from "express";
import { taskController } from "../controllers";
import { createUserMiddleware } from "../middleware";

const router = express.Router();

// would add another middleware for manager only
router.get("/", /*authRoleMiddleware, */ taskController.getTask);
router.get("/all", /*authRoleUserMiddleware, */ taskController.getAllTask);
router.post("/create", createUserMiddleware, taskController.createTask);
router.put("/update", /*authMiddleware, */ taskController.updateTask);
router.delete(
  "/remove/:userId",
  /*authRoleMiddleware, */ taskController.deleteTask
);

export default router;
