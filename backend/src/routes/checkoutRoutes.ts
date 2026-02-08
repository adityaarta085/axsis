import { Router, Response, NextFunction } from 'express';
import * as checkoutController from '../controllers/checkoutController';
import jwt from 'jsonwebtoken';

const router = Router();
const optionalAuth = (req: any, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.split(' ')[1];
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'supersecret') as any;
      req.user = decoded;
    } catch (error) {}
  }
  next();
};

router.post('/', optionalAuth, checkoutController.createOrder as any);
router.post('/webhook', checkoutController.handleWebhook);
router.get('/:id', checkoutController.getOrderDetail);
export default router;
