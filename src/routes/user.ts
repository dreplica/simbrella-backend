import express from 'express';
import { userController } from '../controllers';
import { globalMiddleware } from '../middleware';
import { userValidation } from '../utils/validation';

const router = express.Router();

// would add another middleware for manager only
// router.post("/login", loginUserMiddleware, loginUser);
router.get('/', /*authRoleUserMiddleware, */ userController.getAllUser);
router.get('/:id', /*authRoleMiddleware, */ userController.getUser);
router.post(
  '/create',
  globalMiddleware.inputMiddleware(userValidation.createUser),
  userController.createUser
);
router.put('/update', /*authMiddleware, */ userController.updateUser);
router.delete('/:id', /*authRoleMiddleware, */ userController.deleteUser);

export default router;
