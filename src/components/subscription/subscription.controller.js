import { formatSuccess, formatError } from '../../utils/response.formatter.js';
import subscriptionService from './subscription.service.js';
const subscriptionController = {
  getUserSubscriptionsGroupByCategory: async (req, res, next) => {
    try {
      const userId = req.user.id;
      const subscriptions =
        await subscriptionService.getUserSubscriptionsGroupByCategory(userId);
      res.json(
        formatSuccess(
          subscriptions,
          'User subscriptions retrieved successfully'
        )
      );
    } catch (error) {
      next(error);
    }
  },
  getUserSubscriptions: async (req, res, next) => {
    try {
      const userId = req.user.id;
      const subscriptions = await subscriptionService.getUserSubscriptions(
        userId
      );
      res.json(
        formatSuccess(
          subscriptions,
          'User subscriptions retrieved successfully'
        )
      );
    } catch (error) {
      next(error);
    }
  },
  getSubscription: async (req, res, next) => {
    try {
      const userId = req.user.id;
      const subscriptionId = req.params.id;
      const subscription = await subscriptionService.getSubscription(
        userId,
        subscriptionId
      );
      res.json(
        formatSuccess(
          subscription,
          'Subscription details retrieved successfully'
        )
      );
    } catch (error) {
      next(error);
    }
  },
  deleteSubscription: async (req, res, next) => {
    try {
      const userId = req.user.id;
      const subscriptionId = req.params.id;
      await subscriptionService.deleteSubscription(userId, subscriptionId);
      res.json(formatSuccess(null, 'Subscription deleted successfully'));
    } catch (error) {
      next(error);
    }
  },

  createSubscription: async (req, res, next) => {
    try {
      const userId = req.user.id;
      const categoryId = req.body.categoryId;
      const subscriptionData = req.body;
      const newSubscription = await subscriptionService.createSubscription(
        userId,
        categoryId,
        subscriptionData
      );
      res
        .status(201)
        .json(
          formatSuccess(newSubscription, 'Subscription created successfully')
        );
    } catch (error) {
      next(error);
    }
  },

  updateSubscription: async (req, res, next) => {
    try {
      const userId = req.user.id;
      const subscriptionId = req.params.id;
      const categoryId = req.body.categoryId;
      const subscriptionData = req.body;
      const updatedSubscription = await subscriptionService.updateSubscription(
        userId,
        categoryId,
        subscriptionId,
        subscriptionData
      );
      res.json(
        formatSuccess(updatedSubscription, 'Subscription updated successfully')
      );
    } catch (error) {
      next(error);
    }
  },
};

export default subscriptionController;
