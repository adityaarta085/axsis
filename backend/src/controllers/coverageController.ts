import { Request, Response, NextFunction } from 'express';
import * as coverageService from '../services/coverageService';
import { successResponse } from '../middlewares/errorHandler';

export const getCoverage = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { postcode } = req.query;
    if (!postcode) return res.status(400).json({ success: false, error: 'Postcode is required' });
    const result = await coverageService.checkCoverage(postcode as string);
    successResponse(res, result);
  } catch (error) { next(error); }
};
