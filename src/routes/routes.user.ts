import express from "express";
import { createUserController, deleteUserController, getAllUserController, getUserController, updateUserController } from "../controllers";
import { createUserMiddleware } from "../middleware";

const router = express.Router();

// would add another middleware for manager only
// router.post("/login", loginUserMiddleware, loginUser);
router.get("/", /*authRoleMiddleware, */ getUserController);
router.get("/all", /*authRoleUserMiddleware, */ getAllUserController);
router.post("/create", createUserMiddleware, createUserController);
router.put("/update", /*authMiddleware, */  updateUserController);
router.delete("/:userId", /*authRoleMiddleware, */  deleteUserController);

export default router;
