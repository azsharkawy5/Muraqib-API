import { z } from 'zod';

const categoryValidator = {
  createCategorySchema: z.object({
    name: z
      .string()
      .min(1, 'Category name is required')
      .max(100, 'Category name must be less than 100 characters'),
    icon: z.string().optional(),
    color: z.string().default('#000000').optional(),
  }),

  updateCategorySchema: z.object({
    name: z
      .string()
      .min(1, 'Category name is required')
      .max(100, 'Category name must be less than 100 characters')
      .optional(),
    icon: z.string().optional(),
    color: z.string().optional(),
  }),
};

export default categoryValidator;
