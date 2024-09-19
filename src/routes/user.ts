import express from 'express';
import { userController } from '../controllers';
import { globalMiddleware } from '../middleware';
import { userValidation } from '../utils/validation';

const router = express.Router();

// would add another middleware for manager only
// router.post("/login", loginUserMiddleware, loginUser);
router.get('/', /*authRoleMiddleware, */ userController.getUser);
router.get('/:id', /*authRoleUserMiddleware, */ userController.getAllUser);
router.post(
  '/create',
  globalMiddleware.inputMiddleware(userValidation.createUser),
  userController.createUser
);
router.put('/update', /*authMiddleware, */ userController.updateUser);
router.delete('/:id', /*authRoleMiddleware, */ userController.deleteUser);

export default router;
