import categoryService from './category.service.js';
import { formatSuccess } from '../../utils/response.formatter.js';

const categoryController = {
  getUserCategories: async (req, res, next) => {
    try {
      const userId = req.user.id;
      const categories = await categoryService.getUserCategories(userId);
      res.json(
        formatSuccess(categories, 'Root categories retrieved successfully')
      );
    } catch (error) {
      next(error);
    }
  },
  createCategory: async (req, res, next) => {
    try {
      const userId = req.user.id;
      const categoryData = req.body;
      const category = await categoryService.createCategory(
        userId,
        categoryData
      );
      res
        .status(201)
        .json(formatSuccess(category, 'Category created successfully'));
    } catch (error) {
      next(error);
    }
  },
  getCategoryById: async (req, res, next) => {
    try {
      const userId = req.user.id;
      const categoryId = req.params.id;
      const category = await categoryService.getCategoryById(
        userId,
        categoryId
      );
      res.json(formatSuccess(category, 'Category retrieved successfully'));
    } catch (error) {
      next(error);
    }
  },
  deleteCategory: async (req, res, next) => {
    try {
      const userId = req.user.id;
      const categoryId = req.params.id;
      await categoryService.deleteCategory(userId, categoryId);
      res.json(formatSuccess(null, 'Category deleted successfully'));
    } catch (error) {
      next(error);
    }
  },
  updateCategory: async (req, res, next) => {
    try {
      const userId = req.user.id;
      const categoryId = req.params.id;
      const categoryUpdatedData = req.body;
      const updatedCategory = await categoryService.updateCategory(
        userId,
        categoryId,
        categoryUpdatedData
      );
      res.json(formatSuccess(updatedCategory, 'Category updated successfully'));
    } catch (error) {
      next(error);
    }
  },
};

export default categoryController;
