import prisma from '../utils/prisma';
import { AppError } from '../middlewares/errorHandler';

export const getAllPosts = async () => prisma.blogPost.findMany({ orderBy: { created_at: 'desc' } });
export const getPostBySlug = async (slug: string) => {
  const post = await prisma.blogPost.findUnique({ where: { slug } });
  if (!post) throw new AppError('Blog post not found', 404);
  return post;
};
