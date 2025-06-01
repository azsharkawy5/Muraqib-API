import { z } from 'zod';

const subscriptionValidator = {
  createSubscriptionSchema: z.object({
    categoryId: z.string().min(1, 'Category ID is required'),
    name: z.string().min(1, 'Subscription name is required'),
    description: z.string().optional(),
    price: z.number().positive('Price must be a positive number'),
    currency: z.string().length(3, 'Currency must be a 3-letter code'),
    billingCycle: z.enum(['MONTHLY', 'YEARLY', 'WEEKLY', 'CUSTOM']),
    customDays: z.number().int().optional().nullable(),
    startDate: z.coerce.date(),
    lastRenewalDate: z.coerce.date(),
    nextRenewalDate: z.coerce.date(),
    status: z.enum(['ACTIVE', 'PAUSED', 'CANCELLED']).default('ACTIVE'),
  }),

  updateSubscriptionSchema: z.object({
    categoryId: z.string().min(1, 'Category ID is required').optional(),
    name: z.string().min(1, 'Subscription name is required').optional(),
    description: z.string().optional(),
    price: z.number().positive('Price must be a positive number').optional(),
    currency: z
      .string()
      .length(3, 'Currency must be a 3-letter code')
      .optional(),
    billingCycle: z.enum(['MONTHLY', 'YEARLY', 'WEEKLY', 'CUSTOM']).optional(),
    customDays: z.number().int().optional(),
    startDate: z.date().optional(),
    lastRenewalDate: z.date().optional(),
    nextRenewalDate: z.date().optional(),
    status: z
      .enum(['ACTIVE', 'PAUSED', 'CANCELLED'])
      .default('ACTIVE')
      .optional(),
  }),
};

export default subscriptionValidator;
