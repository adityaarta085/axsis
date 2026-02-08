import prisma from '../utils/prisma';
export const getAllFaqs = async () => prisma.fAQ.findMany({ orderBy: { category: 'asc' } });
