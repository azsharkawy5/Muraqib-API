import { z } from 'zod';

const paymentValidator = {
  createPaymentSchema: z.object({
    subscriptionId: z.string().min(1, 'Subscription ID is required'),
    amountPaid: z.number().positive('Amount paid must be a positive number'),
    paymentDate: z.string().datetime({ message: 'Invalid date format' }),
    status: z.enum(['SUCCESS', 'FAILED', 'PENDING']).default('SUCCESS'),
    notes: z.string().optional(),
  }),

  updatePaymentSchema: z.object({
    amountPaid: z
      .number()
      .positive('Amount paid must be a positive number')
      .optional(),
    paymentDate: z
      .string()
      .datetime({ message: 'Invalid date format' })
      .optional(),
    status: z.enum(['SUCCESS', 'FAILED', 'PENDING']).optional(),
    notes: z.string().optional(),
  }),
};

export default paymentValidator;
