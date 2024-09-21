import express from "express";
import { authController } from "../controllers";
import { userMiddleware } from "../middleware";

const router = express.Router();

// the middleware is for validation
router.post("/register", /*loginMiddleware, */ authController.adminRegister);

router.post("/login", /*loginMiddleware, */ authController.loginEmail);
router.get("/login/:token", authController.emailConfirm);
router.get("/logout", authController.emailConfirm);

export default router;
