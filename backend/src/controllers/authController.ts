import { Request, Response, NextFunction } from 'express';
import * as authService from '../services/authService';
import { requestOtpSchema, verifyOtpSchema } from '../utils/validation';
import { successResponse } from '../middlewares/errorHandler';

export const requestOtp = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const validated = requestOtpSchema.parse(req.body);
    const result = await authService.requestOtp(validated.phone);
    successResponse(res, result, 'OTP sent successfully');
  } catch (error) { next(error); }
};

export const verifyOtp = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const validated = verifyOtpSchema.parse(req.body);
    const result = await authService.verifyOtp(validated.requestId, validated.code);
    successResponse(res, result, 'OTP verified successfully');
  } catch (error) { next(error); }
};
