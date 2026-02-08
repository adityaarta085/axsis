import { Request, Response, NextFunction } from 'express';
import * as blogService from '../services/blogService';
import { successResponse } from '../middlewares/errorHandler';

export const getPosts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const posts = await blogService.getAllPosts();
    successResponse(res, posts);
  } catch (error) { next(error); }
};

export const getPostDetail = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { slug } = req.params;
    const post = await blogService.getPostBySlug(slug);
    successResponse(res, post);
  } catch (error) { next(error); }
};
