import { z } from 'zod';
import { id } from 'zod/v4/locales';

const authValidator = {
  createUserSchema: z.object({
    name: z.string().min(1, 'Category name is required').optional(),
    email: z.string().email('Invalid email format'),
    password: z.string().min(8, 'Password must be at least 8 characters long'),
  }),
  loginUserSchema: z.object({
    email: z.string().email('Invalid email format'),
    password: z.string().min(8, 'Password must be at least 8 characters long'),
  }),
};

export default authValidator;
