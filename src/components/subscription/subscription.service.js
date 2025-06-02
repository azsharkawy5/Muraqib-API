import subscriptionRepository from './subscription.repository.js';
import categoryRepository from '../category/category.repository.js';
import IDService from '../../utils/IDservice.js';
const subscriptionService = {
  getUserSubscriptionsGroupByCategory: async (encodedUserId) => {
    const userId = IDService.decodeId(encodedUserId);
    const subscriptions =
      await subscriptionRepository.getUserSubscriptionsGroupByCategory(userId);
    if (!subscriptions || subscriptions.length === 0) {
      const error = new Error('No subscriptions found');
      error.statusCode = 404;
      throw error;
    }
    const encodedSubscriptions = subscriptions.map((category) => ({
      categoryId: IDService.encodeId(category.categoryId),
      subscriptions: category.subscriptions.map((subscription) => ({
        ...subscription,
        id: IDService.encodeId(subscription.id),
      })),
    }));
    return encodedSubscriptions;
  },
  getUserSubscriptions: async (encodedUserId) => {
    const userId = IDService.decodeId(encodedUserId);
    const subscriptions = await subscriptionRepository.getUserSubscriptions(
      userId
    );
    if (!subscriptions || subscriptions.length === 0) {
      const error = new Error('No subscriptions found');
      error.statusCode = 404;
      throw error;
    }
    return subscriptions.map((subscription) => ({
      ...subscription,
      id: IDService.encodeId(subscription.id),
      categoryId: IDService.encodeId(subscription.categoryId),
    }));
  },
  getSubscription: async (encodedUserId, encodedSubscriptionId) => {
    const userId = IDService.decodeId(encodedUserId);
    const subscriptionId = IDService.decodeId(encodedSubscriptionId);
    const subscription = await subscriptionRepository.getSubscriptionById(
      userId,
      subscriptionId
    );
    if (!subscription) {
      const error = new Error('Subscription not found');
      error.statusCode = 404;
      throw error;
    }
    return {
      ...subscription,
      id: IDService.encodeId(subscription.id),
      categoryId: IDService.encodeId(subscription.categoryId),
    };
  },
  deleteSubscription: async (encodedUserId, encodedSubscriptionId) => {
    const userId = IDService.decodeId(encodedUserId);
    const subscriptionId = IDService.decodeId(encodedSubscriptionId);
    const subscription = await subscriptionRepository.getSubscriptionById(
      userId,
      subscriptionId
    );
    if (!subscription) {
      const error = new Error('Subscription not found');
      error.statusCode = 404;
      throw error;
    }
    return await subscriptionRepository.deleteSubscription(
      userId,
      subscriptionId
    );
  },

  createSubscription: async (
    encodedUserId,
    encodedCategoryId,
    subscriptionData
  ) => {
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
    if (!userId) {
      const error = new Error('You must be logged in to create a subscription');
      error.statusCode = 401;
      throw error;
    }
    const createdSubscription = await subscriptionRepository.createSubscription(
      userId,
      categoryId,
      subscriptionData
    );
    return {
      ...createdSubscription,
      id: IDService.encodeId(createdSubscription.id),
      categoryId: IDService.encodeId(createdSubscription.categoryId),
    };
  },
  updateSubscription: async (
    encodedUserId,
    encodedCategoryId,
    encodedSubscriptionId,
    subscriptionData
  ) => {
    const userId = IDService.decodeId(encodedUserId);
    const subscriptionId = IDService.decodeId(encodedSubscriptionId);
    const categoryId = IDService.decodeId(encodedCategoryId);
    const category = await categoryRepository.getCategoryById(
      userId,
      categoryId
    );

    const subscription = await subscriptionRepository.getSubscriptionById(
      userId,
      subscriptionId
    );
    if (!subscription) {
      const error = new Error('Subscription not found');
      error.statusCode = 404;
      throw error;
    }
    if (!category) {
      const error = new Error('Category not found');
      error.statusCode = 404;
      throw error;
    }
    if (!userId) {
      const error = new Error('You must be logged in to update a subscription');
      error.statusCode = 401;
      throw error;
    }
    const updatedSubscription = await subscriptionRepository.updateSubscription(
      userId,
      categoryId,
      subscriptionId,
      subscriptionData
    );
    return {
      ...updatedSubscription,
      id: IDService.encodeId(updatedSubscription.id),
      categoryId: IDService.encodeId(updatedSubscription.categoryId),
    };
  },
};

export default subscriptionService;
