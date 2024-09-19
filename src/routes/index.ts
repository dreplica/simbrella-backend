import { Router } from "express";
import UserRouter from "./user";
import AuthRouter from "./auth";
import projectRouter from "./project";
import taskRouter from "./task";
// import commentRouter from "./task";

const router = Router();

router.use("/auth", AuthRouter);
router.use("/user", UserRouter);
router.use("/project", projectRouter);
router.use("/task", taskRouter);
router.use("/comment", taskRouter /* commentRouter*/);

export default router;
