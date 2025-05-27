import { Router } from 'express';
import { categoryController } from '../components/category/index.js';
import { validate } from '../middlewares/index.js';
import { categoryValidator } from '../components/category/index.js';
import { authenticateToken } from '../middlewares/authenticateToken.js';

const router = Router();

router.get('/', authenticateToken, categoryController.getUserCategories);
router.get('/:id', authenticateToken, categoryController.getCategoryById);
router.post(
  '/',
  authenticateToken,
  validate(categoryValidator.createCategorySchema),
  categoryController.createCategory
);
router.put(
  '/:id',
  authenticateToken,
  validate(categoryValidator.updateCategorySchema),
  categoryController.updateCategory
);
router.delete('/:id', authenticateToken, categoryController.deleteCategory);

export default router;
