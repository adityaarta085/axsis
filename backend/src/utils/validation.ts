import { z } from 'zod';

export const requestOtpSchema = z.object({
  phone: z.string().min(10).max(15).regex(/^\+?[0-9]+$/, 'Invalid phone number format'),
});

export const verifyOtpSchema = z.object({
  requestId: z.string().uuid(),
  code: z.string().length(6),
});

export const updateProfileSchema = z.object({
  name: z.string().min(2).optional(),
  email: z.string().email().optional(),
});

export const createOrderSchema = z.object({
  packageId: z.string(),
  paymentMethod: z.string(),
  customer: z.object({
    name: z.string().min(2),
    phone: z.string().min(10),
  }).optional(),
});
