import prisma from '../utils/prisma';
import { AppError } from '../middlewares/errorHandler';
import * as paymentService from './paymentService';

export const createOrder = async (data: any) => {
  const pkg = await prisma.package.findUnique({ where: { id: data.packageId } });
  if (!pkg) throw new AppError('Package not found', 404);
  let userId = data.userId;
  if (!userId) {
    let user = await prisma.user.findUnique({ where: { phone: data.customer.phone } });
    if (!user) user = await prisma.user.create({ data: { phone: data.customer.phone, name: data.customer.name } });
    userId = user.id;
  }
  const order = await prisma.order.create({
    data: { userId: userId!, packageId: data.packageId, amount: pkg.price, paymentMethod: data.paymentMethod, status: 'pending' },
  });
  const paymentResult = await paymentService.createPayment(order.id, order.amount);
  await prisma.order.update({ where: { id: order.id }, data: { paymentRef: paymentResult.providerRef } });
  return { orderId: order.id, paymentUrl: paymentResult.paymentUrl };
};

export const updateOrderStatus = async (orderId: string, status: string) => {
  return prisma.order.update({ where: { id: orderId }, data: { status } });
};

export const getOrderById = async (id: string) => {
  const order = await prisma.order.findUnique({ where: { id }, include: { package: true } });
  if (!order) throw new AppError('Order not found', 404);
  return order;
};
