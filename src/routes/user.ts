import express from "express";
import { userController } from "../controllers";
import { userMiddleware } from "../middleware";

const router = express.Router();

// would add another middleware for manager only
// router.post("/login", loginUserMiddleware, loginUser);
router.get("/", /*authRoleMiddleware, */ userController.getUser);
router.post(
  "/create",
  userMiddleware.createUserMiddleware,
  userController.createUser
);
router.put("/update", /*authMiddleware, */ userController.updateUser);
router.delete(
  "/:id",
  /*authRoleMiddleware, */ userController.deleteUser
);
router.get("/:id", /*authRoleUserMiddleware, */ userController.getAllUser);

export default router;
