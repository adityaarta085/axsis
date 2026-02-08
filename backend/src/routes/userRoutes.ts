import { Router } from 'express';
import * as userController from '../controllers/userController';
import { authenticate } from '../middlewares/authMiddleware';
const router = Router();
router.get('/me', authenticate, userController.getMe as any);
router.patch('/me', authenticate, userController.updateMe as any);
router.get('/transactions', authenticate, userController.getTransactions as any);
export default router;
