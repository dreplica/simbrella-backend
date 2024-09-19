import express from 'express';
import { taskController } from '../controllers';
import { authMiddleware, globalMiddleware } from '../middleware';
import { ROLES } from '../utils/constants';
import { taskValidation } from '../utils/validation';

const router = express.Router();

router.get(
  '/',
  authMiddleware.authorizeMiddleware([ROLES.ADMIN, ROLES.MANAGER]),
  taskController.getAllTask
);
router.get(
  '/:id',
  authMiddleware.authorizeMiddleware([ROLES.ADMIN, ROLES.MANAGER, ROLES.MEMBER]),
  taskController.getTask
);
router.post(
  '/create',
  authMiddleware.authorizeMiddleware([ROLES.ADMIN, ROLES.MANAGER]),
  globalMiddleware.inputMiddleware(taskValidation.createTask),
  taskController.createTask
);
router.put(
  '/update',
  authMiddleware.authorizeMiddleware([ROLES.ADMIN, ROLES.MANAGER]),
  globalMiddleware.inputMiddleware(taskValidation.updateTask),
  taskController.updateTask
);
router.put(
  '/update/status',
  authMiddleware.authorizeMiddleware([ROLES.ADMIN, ROLES.MANAGER, ROLES.MEMBER]),
  globalMiddleware.inputMiddleware(taskValidation.updateTaskStatus),
  taskController.updateTask
);
router.put(
  '/update/comment',
  authMiddleware.authorizeMiddleware([ROLES.ADMIN, ROLES.MANAGER, ROLES.MEMBER]),
  globalMiddleware.inputMiddleware(taskValidation.addTaskComment),
  taskController.updateTask
);
router.delete(
  '/comment/:id',
  authMiddleware.authorizeMiddleware([ROLES.ADMIN, ROLES.MANAGER, ROLES.MEMBER]),
  taskController.updateTask
);
router.delete(
  '/:id',
  authMiddleware.authorizeMiddleware([ROLES.ADMIN, ROLES.MANAGER]),
  taskController.deleteTask
);

export default router;
