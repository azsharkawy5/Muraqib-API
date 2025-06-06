import prisma from '../../config/database.config.js';

const subscriptionRepository = {
  getUserSubscriptionsGroupByCategory: (userId) => {
    return prisma.$queryRaw`
      SELECT 
      category_id AS "categoryId",
      json_agg(json_build_object(
      'id', id,
      'name', name,
      'description', description,
      'price', price,
      'currency', currency,
      'billingCycle', billing_cycle,
      'customDays', custom_days,
      'startDate', start_date,
      'lastRenewalDate', last_renewal_date,
      'nextRenewalDate', next_renewal_date,
      'status', status,
      'createdAt', created_at,
      'updatedAt', updated_at
    )) AS subscriptions
  FROM subscriptions
  WHERE user_id = ${userId}
  GROUP BY category_id
  ORDER BY category_id;`;
  },
  getUserSubscriptions: (userId) => {
    return prisma.subscription.findMany({
      where: { userId: userId },
      select: {
        id: true,
        categoryId: true,
        name: true,
        description: true,
        price: true,
        currency: true,
        billingCycle: true,
        customDays: true,
        startDate: true,
        lastRenewalDate: true,
        nextRenewalDate: true,
        status: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  },

  getSubscriptionById: (userId, subscriptionId) => {
    return prisma.subscription.findUnique({
      where: { id: subscriptionId, userId: userId },
      select: {
        id: true,
        categoryId: true,
        name: true,
        description: true,
        price: true,
        currency: true,
        billingCycle: true,
        customDays: true,
        startDate: true,
        lastRenewalDate: true,
        nextRenewalDate: true,
        status: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  },

  deleteSubscription: (userId, subscriptionId) => {
    return prisma.subscription.delete({
      where: { id: subscriptionId, userId: userId },
    });
  },
  updateSubscription: (userId, subscriptionId, subscriptionData) => {
    return prisma.subscription.update({
      where: { id: subscriptionId, userId: userId },
      data: subscriptionData,
      select: {
        id: true,
        categoryId: true,
        name: true,
        description: true,
        price: true,
        currency: true,
        billingCycle: true,
        customDays: true,
        startDate: true,
        lastRenewalDate: true,
        nextRenewalDate: true,
        status: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  },

  createSubscription: (userId, categoryId, subscriptionData) => {
    return prisma.subscription.create({
      data: {
        ...subscriptionData,
        userId: userId,
        categoryId: categoryId,
      },
      select: {
        id: true,
        categoryId: true,
        name: true,
        description: true,
        price: true,
        currency: true,
        billingCycle: true,
        customDays: true,
        startDate: true,
        lastRenewalDate: true,
        nextRenewalDate: true,
        status: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  },
  updateSubscription: (
    userId,
    categoryId,
    subscriptionId,
    subscriptionData
  ) => {
    return prisma.subscription.update({
      where: { id: subscriptionId, userId: userId },
      data: {
        ...subscriptionData,
        categoryId: categoryId,
      },
      select: {
        id: true,
        categoryId: true,
        name: true,
        description: true,
        price: true,
        currency: true,
        billingCycle: true,
        customDays: true,
        startDate: true,
        lastRenewalDate: true,
        nextRenewalDate: true,
        status: true,
      },
    });
  },
};

export default subscriptionRepository;
