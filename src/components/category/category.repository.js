export class CategoryRepository {
  #prismaClient;
  constructor({ prismaClient }) {
    if (!prismaClient) {
      throw new Error('CategoryRepository requires a Prisma client.');
    }
    this.#prismaClient = prismaClient;
  }
  getUserCategories(userId) {
    return this.#prismaClient.category.findMany({
      where: {
        OR: [{ userId: userId }, { userId: null }],
      },
      select: {
        id: true,
        name: true,
        icon: true,
        color: true,
        isDefault: true,
      },
    });
  }

  getCategoryById(userId, categoryId) {
    return this.#prismaClient.category.findFirst({
      where: { id: categoryId, OR: [{ userId: userId }, { userId: null }] },
      select: {
        id: true,
        name: true,
        icon: true,
        color: true,
        isDefault: true,
        _count: {
          select: {
            subscriptions: true,
          },
        },
      },
    });
  }

  getCategoryByIdWithUser(userId, categoryId) {
    return this.#prismaClient.category.findFirst({
      where: { id: categoryId, OR: [{ userId: userId }, { userId: null }] },
      select: {
        id: true,
        name: true,
        icon: true,
        color: true,
        isDefault: true,
        userId: true,
      },
    });
  }

  getCategoryByName(userId, categoryName) {
    return this.#prismaClient.category.findFirst({
      where: {
        userId: userId,
        name: categoryName,
      },
    });
  }
  createCategory(userId, categoryData) {
    return this.#prismaClient.category.create({
      data: {
        name: categoryData.name,
        icon: categoryData.icon,
        color: categoryData.color,
        userId: userId,
      },
    });
  }

  updateCategory(userId, categoryId, categoryData) {
    return this.#prismaClient.category.update({
      where: { id: categoryId },
      data: {
        name: categoryData.name,
        icon: categoryData.icon,
        color: categoryData.color,
        userId: userId,
      },
    });
  }

  deleteCategory(userId, categoryId) {
    return this.#prismaClient.category.delete({
      where: { userId: userId, id: categoryId },
    });
  }
}
