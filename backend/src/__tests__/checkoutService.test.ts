import * as checkoutService from '../services/checkoutService';
import prisma from '../utils/prisma';

jest.mock('../utils/prisma', () => ({
  package: { findUnique: jest.fn() },
  user: { findUnique: jest.fn(), create: jest.fn() },
  order: { create: jest.fn(), update: jest.fn() },
  __esModule: true,
  default: {
    package: { findUnique: jest.fn() },
    user: { findUnique: jest.fn(), create: jest.fn() },
    order: { create: jest.fn(), update: jest.fn() },
  },
}));

describe('Checkout Service', () => {
  it('should create an order successfully', async () => {
    (prisma.package.findUnique as any).mockResolvedValue({ id: 'p1', price: 1000 });
    (prisma.user.findUnique as any).mockResolvedValue({ id: 'u1' });
    (prisma.order.create as any).mockResolvedValue({ id: 'o1', amount: 1000 });
    (prisma.order.update as any).mockResolvedValue({ id: 'o1' });

    const result = await checkoutService.createOrder({
      packageId: 'p1', customer: { name: 'John', phone: '0812' }, paymentMethod: 'GOPAY', userId: 'u1',
    });
    expect(result).toHaveProperty('orderId', 'o1');
  });
});
