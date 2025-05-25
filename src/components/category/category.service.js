import categoryRepository from './category.repository.js';
import IDService from '../../utils/IDservice.js';

const categoryService = {
  getUserCategories: async (encodedUserId) => {
    const userId = IDService.decodeId(encodedUserId);
    const categories = await categoryRepository.getUserCategories(userId);
    const encodedCategories = categories.map((category) => ({
      ...category,
      id: IDService.encodeId(category.id),
    }));
    return encodedCategories;
  },

  createCategory: async (encodedUserId, categoryData) => {
    const userId = IDService.decodeId(encodedUserId);
    if (categoryData.name && userId) {
      const category = await categoryRepository.getCategoryByName(
        userId,
        categoryData.name
      );
      if (category) {
        const error = new Error('Category already exists');
        error.statusCode = 409;
        throw error;
      }
    }
    if (!userId) {
      const error = new Error('You must be logged in to create a category');
      error.statusCode = 401;
      throw error;
    }
    const createdCategory = await categoryRepository.createCategory(
      userId,
      categoryData
    );
    return {
      ...createdCategory,
      id: IDService.encodeId(createdCategory.id),
      userId: IDService.encodeId(createdCategory.userId),
    };
  },

  getCategoryById: async (encodedUserId, encodedCategoryId) => {
    const userId = IDService.decodeId(encodedUserId);
    const categoryId = IDService.decodeId(encodedCategoryId);
    const category = await categoryRepository.getCategoryById(
      userId,
      categoryId
    );
    if (!category) {
      const error = new Error('Category not found');
      error.statusCode = 404;
      throw error;
    }
    return {
      ...category,
      id: IDService.encodeId(category.id),
    };
  },

  updateCategory: async (
    encodedUserId,
    encodedCategoryId,
    categoryUpdatedData
  ) => {
    const userId = IDService.decodeId(encodedUserId);
    const categoryId = IDService.decodeId(encodedCategoryId);
    const category = await categoryRepository.getCategoryByIdWithUser(
      userId,
      categoryId
    );
    if (!category) {
      const error = new Error('Category not found');
      error.statusCode = 404;
      throw error;
    }
    if (category.isDefault) {
      const error = new Error('Cannot update default category');
      error.statusCode = 400;
      throw error;
    }
    if (userId !== category.userId) {
      const error = new Error(
        `You don't have permission to update this category`
      );
      error.statusCode = 403;
      throw error;
    }
    if (categoryUpdatedData.name) {
      const existingCategory = await categoryRepository.getCategoryByName(
        userId,
        categoryUpdatedData.name
      );
      if (existingCategory) {
        const error = new Error('Category name already exists');
        error.statusCode = 409;
        throw error;
      }
    }

    const updatedCategory = await categoryRepository.updateCategory(
      userId,
      categoryId,
      categoryUpdatedData
    );
    return {
      ...updatedCategory,
      id: IDService.encodeId(updatedCategory.id),
      userId: IDService.encodeId(updatedCategory.userId),
    };
  },

  deleteCategory: async (encodedUserId, encodedCategoryId) => {
    const userId = IDService.decodeId(encodedUserId);
    const categoryId = IDService.decodeId(encodedCategoryId);
    const category = await categoryRepository.getCategoryById(
      userId,
      categoryId
    );
    if (!category) {
      const error = new Error('Category not found');
      error.statusCode = 404;
      throw error;
    }
    if (category.isDefault) {
      const error = new Error('Cannot delete default category');
      error.statusCode = 400;
      throw error;
    }
    if (category._count.subscriptions > 0) {
      const error = new Error(
        'Cannot delete category with existing subscriptions'
      );
      error.statusCode = 400;
      throw error;
    }
    return await categoryRepository.deleteCategory(userId, categoryId);
  },
};

export default categoryService;
