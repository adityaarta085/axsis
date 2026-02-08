import prisma from '../utils/prisma';
import { AppError } from '../middlewares/errorHandler';

export const getUserProfile = async (userId: string) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: { orders: { include: { package: true }, orderBy: { created_at: 'desc' } } },
  });
  if (!user) throw new AppError('User not found', 404);
  return user;
};

export const updateProfile = async (userId: string, data: any) => prisma.user.update({ where: { id: userId }, data });

export const getUserTransactions = async (userId: string) => prisma.order.findMany({
  where: { userId },
  include: { package: true },
  orderBy: { created_at: 'desc' },
});
