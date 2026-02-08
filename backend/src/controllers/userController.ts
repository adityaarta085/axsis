import { Response, NextFunction } from 'express';
import { AuthRequest } from '../middlewares/authMiddleware';
import * as userService from '../services/userService';
import { updateProfileSchema } from '../utils/validation';
import { successResponse } from '../middlewares/errorHandler';

export const getMe = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const user = await userService.getUserProfile(req.user!.userId);
    successResponse(res, user);
  } catch (error) { next(error); }
};

export const updateMe = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const validated = updateProfileSchema.parse(req.body);
    const user = await userService.updateProfile(req.user!.userId, validated);
    successResponse(res, user, 'Profile updated successfully');
  } catch (error) { next(error); }
};

export const getTransactions = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const transactions = await userService.getUserTransactions(req.user!.userId);
    successResponse(res, transactions);
  } catch (error) { next(error); }
};
