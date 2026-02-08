import prisma from '../utils/prisma';
import jwt from 'jsonwebtoken';
import { AppError } from '../middlewares/errorHandler';

export const requestOtp = async (phone: string) => {
  const code = Math.floor(100000 + Math.random() * 900000).toString();
  const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

  const otpRequest = await prisma.otpRequest.create({
    data: {
      phone,
      code,
      expires_at: expiresAt,
    },
  });

  console.log(`[MOCK SMS] To: ${phone}, Code: ${code}`);

  return { requestId: otpRequest.id, ttl: 300 };
};

export const verifyOtp = async (requestId: string, code: string) => {
  const otpRequest = await prisma.otpRequest.findUnique({
    where: { id: requestId },
  });

  if (!otpRequest) throw new AppError('Invalid request ID', 404);
  if (otpRequest.verified) throw new AppError('OTP already verified', 400);
  if (otpRequest.expires_at < new Date()) throw new AppError('OTP expired', 400);
  if (otpRequest.code !== code) throw new AppError('Invalid code', 400);

  await prisma.otpRequest.update({
    where: { id: requestId },
    data: { verified: true },
  });

  let user = await prisma.user.findUnique({
    where: { phone: otpRequest.phone },
  });

  if (!user) {
    user = await prisma.user.create({
      data: { phone: otpRequest.phone },
    });
  }

  const token = jwt.sign(
    { userId: user.id, phone: user.phone },
    process.env.JWT_SECRET || 'supersecret',
    { expiresIn: '7d' }
  );

  return { token, user };
};
