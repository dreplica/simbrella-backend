import express from "express";
import { createUserController, loginEmailController } from "../controllers";
import { createUserMiddleware } from "../middleware";

const router = express.Router();

router.post("/login", /*loginMiddleware, */ loginEmailController);
router.post("/login/:token", /*loginMiddleware, */ loginEmailController);

export default router;
