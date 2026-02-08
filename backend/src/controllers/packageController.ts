import { Request, Response, NextFunction } from 'express';
import * as packageService from '../services/packageService';
import { successResponse } from '../middlewares/errorHandler';

export const getPackages = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { category } = req.query;
    const packages = await packageService.getAllPackages(category as string);
    successResponse(res, packages);
  } catch (error) { next(error); }
};

export const getPackageDetail = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const pkg = await packageService.getPackageById(id);
    successResponse(res, pkg);
  } catch (error) { next(error); }
};
