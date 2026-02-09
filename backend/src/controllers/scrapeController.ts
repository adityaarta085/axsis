import { Request, Response, NextFunction } from 'express';
import { successResponse } from '../middlewares/errorHandler';
import * as scrapeService from '../services/scrapeService';

export const scrapeAxisRealtime = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const targetUrl = typeof req.query.url === 'string' ? req.query.url : undefined;
    const data = await scrapeService.scrapeAxisPage(targetUrl);
    successResponse(res, data, 'Data scraping realtime berhasil diambil dari axis.co.id');
  } catch (error) {
    next(error);
  }
};
