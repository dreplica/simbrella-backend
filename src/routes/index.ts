import {Router} from "express";
import UserRouter from './routes.user'
import AuthRouter from './router.auth'

const router = Router();

router.use('/auth', AuthRouter);
router.use('/user', UserRouter);

export default router;

