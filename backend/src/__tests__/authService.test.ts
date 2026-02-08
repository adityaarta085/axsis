import * as authService from '../services/authService';
import prisma from '../utils/prisma';

jest.mock('../utils/prisma', () => ({
  otpRequest: { create: jest.fn(), findUnique: jest.fn(), update: jest.fn() },
  user: { findUnique: jest.fn(), create: jest.fn() },
  __esModule: true,
  default: {
    otpRequest: { create: jest.fn(), findUnique: jest.fn(), update: jest.fn() },
    user: { findUnique: jest.fn(), create: jest.fn() },
  },
}));

describe('Auth Service', () => {
  it('should create an OTP request', async () => {
    (prisma.otpRequest.create as any).mockResolvedValue({ id: 'req-1', phone: '0812' });
    const result = await authService.requestOtp('0812');
    expect(result).toHaveProperty('requestId', 'req-1');
  });
});
