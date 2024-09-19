import express from 'express';
import { projectController } from '../controllers';
import { authMiddleware, globalMiddleware } from '../middleware';
import { projectValidation } from '../utils/validation';
import { ROLES } from '../utils/constants';

const router = express.Router();

router.get(
  '/',
  authMiddleware.authorizeMiddleware([ROLES.ADMIN, ROLES.MANAGER]),
  projectController.getAllProject
);
router.get(
  '/:id',
  authMiddleware.authorizeMiddleware([ROLES.ADMIN, ROLES.MANAGER, ROLES.MEMBER]),
  projectController.getProject
);
router.post(
  '/create',
  authMiddleware.authorizeMiddleware([ROLES.ADMIN, ROLES.MANAGER]),
  globalMiddleware.inputMiddleware(projectValidation.createProject),
  projectController.createProject
);
router.put(
  '/update',
  authMiddleware.authorizeMiddleware([ROLES.ADMIN, ROLES.MANAGER]),
  globalMiddleware.inputMiddleware(projectValidation.updateProject),
  projectController.updateProject
);
router.post(
  '/remove/member',
  authMiddleware.authorizeMiddleware([ROLES.ADMIN, ROLES.MANAGER]),
  globalMiddleware.inputMiddleware(projectValidation.removeProjectUser),
  projectController.removeProjectUser
);
router.post(
  '/add/member',
  authMiddleware.authorizeMiddleware([ROLES.ADMIN, ROLES.MANAGER]),
  globalMiddleware.inputMiddleware(projectValidation.addUserToProject),
  projectController.addUserToProject
);
router.delete(
  '/:id',
  authMiddleware.authorizeMiddleware([ROLES.ADMIN, ROLES.MANAGER]),
  projectController.deleteProject
);

export default router;
