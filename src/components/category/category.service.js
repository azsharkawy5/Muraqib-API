export class CategoryService {
  #repository;
  #hashedIdService;

  constructor({ repository, hashedIdService }) {
    if (!repository || !hashedIdService) {
      throw new Error('Repository and ID Encoder Service are required');
    }
    this.#repository = repository;
    this.#hashedIdService = hashedIdService;
  }

  async getUserCategories(encodedUserId) {
    const userId = this.#hashedIdService.decodeId(encodedUserId);
    const categories = await this.#repository.getUserCategories(userId);
    return categories.map((category) => ({
      ...category,
      id: this.#hashedIdService.encodeId(category.id),
    }));
  }

  async createCategory(encodedUserId, categoryData) {
    const userId = this.#hashedIdService.decodeId(encodedUserId);
    if (categoryData.name && userId) {
      const existingCategory = await this.#repository.getCategoryByName(
        userId,
        categoryData.name
      );
      if (existingCategory) {
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
    const createdCategory = await this.#repository.createCategory(
      userId,
      categoryData
    );
    return {
      ...createdCategory,
      id: this.#hashedIdService.encodeId(createdCategory.id),
      userId: this.#hashedIdService.encodeId(createdCategory.userId),
    };
  }

  async getCategoryById(encodedUserId, encodedCategoryId) {
    const userId = this.#hashedIdService.decodeId(encodedUserId);
    const categoryId = this.#hashedIdService.decodeId(encodedCategoryId);
    const existingCategory = await this.#repository.getCategoryById(
      userId,
      categoryId
    );
    if (!existingCategory) {
      const error = new Error('Category not found');
      error.statusCode = 404;
      throw error;
    }
    return {
      ...existingCategory,
      id: this.#hashedIdService.encodeId(existingCategory.id),
    };
  }

  async updateCategory(encodedUserId, encodedCategoryId, categoryUpdatedData) {
    const userId = this.#hashedIdService.decodeId(encodedUserId);
    const categoryId = this.#hashedIdService.decodeId(encodedCategoryId);
    const existingCategory = await this.#repository.getCategoryByIdWithUser(
      userId,
      categoryId
    );
    if (!existingCategory) {
      const error = new Error('Category not found');
      error.statusCode = 404;
      throw error;
    }
    if (existingCategory.isDefault) {
      const error = new Error('Cannot update default category');
      error.statusCode = 400;
      throw error;
    }
    if (userId !== existingCategory.userId) {
      const error = new Error(
        `You don't have permission to update this category`
      );
      error.statusCode = 403;
      throw error;
    }
    if (categoryUpdatedData.name) {
      const existingCategory = await this.#repository.getCategoryByName(
        userId,
        categoryUpdatedData.name
      );
      if (existingCategory) {
        const error = new Error('Category name already exists');
        error.statusCode = 409;
        throw error;
      }
    }

    const updatedCategory = await this.#repository.updateCategory(
      userId,
      categoryId,
      categoryUpdatedData
    );
    return {
      ...updatedCategory,
      id: this.#hashedIdService.encodeId(updatedCategory.id),
      userId: this.#hashedIdService.encodeId(updatedCategory.userId),
    };
  }

  async deleteCategory(encodedUserId, encodedCategoryId) {
    const userId = this.#hashedIdService.decodeId(encodedUserId);
    const categoryId = this.#hashedIdService.decodeId(encodedCategoryId);
    const existingCategory = await this.#repository.getCategoryById(
      userId,
      categoryId
    );
    if (!existingCategory) {
      const error = new Error('Category not found');
      error.statusCode = 404;
      throw error;
    }
    if (existingCategory.isDefault) {
      const error = new Error('Cannot delete default category');
      error.statusCode = 400;
      throw error;
    }
    if (existingCategory._count.subscriptions > 0) {
      const error = new Error(
        'Cannot delete category with existing subscriptions'
      );
      error.statusCode = 400;
      throw error;
    }
    return await this.#repository.deleteCategory(userId, categoryId);
  }
}
