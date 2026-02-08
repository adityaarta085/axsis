import prisma from '../utils/prisma';
import { AppError } from '../middlewares/errorHandler';

export const getAllPackages = async (category?: string) => prisma.package.findMany({
  where: category ? { category } : {},
  orderBy: { price: 'asc' },
});

export const getPackageById = async (id: string) => {
  const pkg = await prisma.package.findUnique({ where: { id } });
  if (!pkg) throw new AppError('Package not found', 404);
  return pkg;
};
