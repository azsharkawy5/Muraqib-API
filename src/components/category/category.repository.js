import prisma from '../../config/database.config.js';

const categoryRepository = {
  getUserCategories: (userId) => {
    return prisma.category.findMany({
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
  },

  getCategoryById: (userId, categoryId) => {
    return prisma.category.findFirst({
      where: { id: categoryId, OR: [{ userId: userId }, { userId: null }] },
      select: {
        id: true,
        name: true,
        icon: true,
        color: true,
        isDefault: true,
      },
    });
  },

  getCategoryByIdWithUser: (userId, categoryId) => {
    return prisma.category.findFirst({
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
  },

  getCategoryByName: (userId, categoryName) => {
    return prisma.category.findFirst({
      where: {
        userId: userId,
        name: categoryName,
      },
    });
  },
  createCategory: (userId, categoryData) => {
    return prisma.category.create({
      data: {
        name: categoryData.name,
        icon: categoryData.icon,
        color: categoryData.color,
        userId: userId,
      },
    });
  },

  updateCategory: (userId, categoryId, categoryData) => {
    return prisma.category.update({
      where: { id: categoryId },
      data: {
        name: categoryData.name,
        icon: categoryData.icon,
        color: categoryData.color,
        userId: userId,
      },
    });
  },

  deleteCategory: (userId, categoryId) => {
    return prisma.category.delete({
      where: { userId: userId, id: categoryId },
    });
  },
};

export default categoryRepository;
