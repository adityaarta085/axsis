import { Request, Response, NextFunction } from 'express';
import * as checkoutService from '../services/checkoutService';
import { createOrderSchema } from '../utils/validation';
import { successResponse } from '../middlewares/errorHandler';
import { AuthRequest } from '../middlewares/authMiddleware';

export const createOrder = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const validated = createOrderSchema.parse(req.body);
    const result = await checkoutService.createOrder({ ...validated, userId: req.user?.userId });
    successResponse(res, result, 'Order created successfully', 201);
  } catch (error) { next(error); }
};

export const handleWebhook = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { orderId, status } = req.body;
    const result = await checkoutService.updateOrderStatus(orderId, status);
    successResponse(res, result, 'Order status updated');
  } catch (error) { next(error); }
};

export const getOrderDetail = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const order = await checkoutService.getOrderById(id);
    successResponse(res, order);
  } catch (error) { next(error); }
};
