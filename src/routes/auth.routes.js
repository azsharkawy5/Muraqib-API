import { Router } from 'express';
import { validate } from '../middlewares/index.js';
import { authController } from '../components/auth/index.js';
import { authValidator } from '../components/auth/index.js';
import { authenticateToken } from '../middlewares/authenticateToken.js';
const router = Router();

router.get('/me', authenticateToken, authController.getUserByEmail);

router.post(
  '/register',
  validate(authValidator.createUserSchema),
  authController.register
);

router.post(
  '/login',
  validate(authValidator.loginUserSchema),
  authController.login
);

export default router;
