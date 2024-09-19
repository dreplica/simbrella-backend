import {Router} from "express";
import UserRouter from './user'
import AuthRouter from './auth'
import projectRouter from './project'

const router = Router();

router.use('/auth', AuthRouter);
router.use('/user', UserRouter);
router.use('/project', projectRouter);

export default router;

