import paymentService from './payment.service.js';
import { formatSuccess, formatError } from '../../utils/response.formatter.js';

const paymentController = {
  getPaymentById: async (req, res, next) => {
    try {
      const userId = req.user.id;
      const paymentId = req.params.id;
      const payment = await paymentService.getPaymentById(userId, paymentId);
      res.json(formatSuccess(payment, 'Payment retrieved successfully'));
    } catch (error) {
      next(error);
    }
  },
  getSubscriptionPayments: async (req, res, next) => {
    try {
      const userId = req.user.id;
      const subscriptionId = req.params.id;
      const payments = await paymentService.getSubscriptionPayments(
        userId,
        subscriptionId
      );
      res.json(formatSuccess(payments, 'User payments retrieved successfully'));
    } catch (error) {
      next(error);
    }
  },

  getUserPaymentsGroupBySubscription: async (req, res, next) => {
    try {
      const userId = req.user.id;
      const payments = await paymentService.getUserPaymentsGroupBySubscription(
        userId
      );
      res.json(
        formatSuccess(
          payments,
          'User payments grouped by subscription retrieved successfully'
        )
      );
    } catch (error) {
      next(error);
    }
  },

  createSubscriptionPayment: async (req, res, next) => {
    try {
      const userId = req.user.id;
      const subscriptionId = req.body.subscriptionId;
      const paymentData = req.body;

      const newPayment = await paymentService.createSubscriptionPayment(
        userId,
        subscriptionId,
        paymentData
      );
      res
        .status(201)
        .json(formatSuccess(newPayment, 'Payment created successfully'));
    } catch (error) {
      next(error);
    }
  },
  deleteSubscriptionPayment: async (req, res, next) => {
    try {
      const userId = req.user.id;
      const paymentId = req.params.id;
      await paymentService.deleteSubscriptionPayment(userId, paymentId);
      res.json(formatSuccess(null, 'Payment deleted successfully'));
    } catch (error) {
      next(error);
    }
  },
  updateSubscriptionPayment: async (req, res, next) => {
    try {
      const userId = req.user.id;
      const paymentId = req.params.id;
      const paymentData = req.body;

      const updatedPayment = await paymentService.updateSubscriptionPayment(
        userId,
        paymentId,
        paymentData
      );
      res.json(formatSuccess(updatedPayment, 'Payment updated successfully'));
    } catch (error) {
      next(error);
    }
  },
};

export default paymentController;
