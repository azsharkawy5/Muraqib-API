import paymentRepository from './payment.repository.js';
import IDService from '../../utils/IDservice.js';
import subscriptionRepository from '../subscription/subscription.repository.js';
const paymentService = {
  getPaymentById: async (encodedUserId, encodedPaymentId) => {
    const userId = IDService.decodeId(encodedUserId);
    const paymentId = IDService.decodeId(encodedPaymentId);
    if (!paymentId) {
      const error = new Error('No payment found');
      error.statusCode = 400;
      throw error;
    }
    const payment = await paymentRepository.getPaymentById(userId, paymentId);
    if (!payment) {
      const error = new Error('Payment not found');
      error.statusCode = 404;
      throw error;
    }
    return {
      ...payment,
      id: IDService.encodeId(payment.id),
      subscriptionId: IDService.encodeId(payment.subscriptionId),
    };
  },
  getSubscriptionPayments: async (encodedUserId, encodedSubscriptionId) => {
    const userId = IDService.decodeId(encodedUserId);
    const subscriptionId = IDService.decodeId(encodedSubscriptionId);
    const payments = await paymentRepository.getSubscriptionPayments(
      userId,
      subscriptionId
    );
    if (!payments || payments.length === 0) {
      const error = new Error('No payments found');
      error.statusCode = 404;
      throw error;
    }
    return payments.map((payment) => ({
      ...payment,
      id: IDService.encodeId(payment.id),
      subscriptionId: IDService.encodeId(payment.subscriptionId),
    }));
  },
  getUserPaymentsGroupBySubscription: async (encodedUserId) => {
    const userId = IDService.decodeId(encodedUserId);
    if (!userId) {
      const error = new Error('Invalid user ID');
      error.statusCode = 400;
      throw error;
    }
    const payments = await paymentRepository.getUserPaymentsGroupBySubscription(
      userId
    );
    if (!payments || payments.length === 0) {
      const error = new Error('No payments found');
      error.statusCode = 404;
      throw error;
    }
    return payments.map((payment) => ({
      ...payment,
      subscriptionId: IDService.encodeId(payment.subscriptionId),
      payments: payment.payments.map((p) => ({
        ...p,
        id: IDService.encodeId(p.id),
        subscriptionId: IDService.encodeId(p.subscriptionId),
      })),
    }));
  },

  createSubscriptionPayment: async (
    encodedUserId,
    encodedSubscriptionId,
    paymentData
  ) => {
    const userId = IDService.decodeId(encodedUserId);
    if (!userId) {
      const error = new Error('authentication failed');
      error.statusCode = 401;
      throw error;
    }
    const subscriptionId = IDService.decodeId(encodedSubscriptionId);
    if (!subscriptionId) {
      const error = new Error('Subscription not found');
      error.statusCode = 400;
      throw error;
    }
    const subscription = await subscriptionRepository.getSubscriptionById(
      userId,
      subscriptionId
    );
    if (!subscription) {
      const error = new Error('Subscription not found');
      error.statusCode = 404;
      throw error;
    }
    const createdPayment = await paymentRepository.createSubscriptionPayment(
      subscriptionId,
      paymentData
    );
    return {
      ...createdPayment,
      id: IDService.encodeId(createdPayment.id),
      subscriptionId: encodedSubscriptionId,
    };
  },
  updateSubscriptionPayment: async (
    encodedUserId,
    encodedPaymentId,
    paymentData
  ) => {
    const userId = IDService.decodeId(encodedUserId);
    if (!userId) {
      const error = new Error('authentication failed');
      error.statusCode = 401;
      throw error;
    }
    const paymentId = IDService.decodeId(encodedPaymentId);
    if (!paymentId) {
      const error = new Error('Payment not found');
      error.statusCode = 404;
      throw error;
    }
    const updatedPayment = await paymentRepository.updateSubscriptionPayment(
      paymentId,
      paymentData
    );
    if (!updatedPayment) {
      const error = new Error('Payment not found');
      error.statusCode = 404;
      throw error;
    }
    return {
      ...updatedPayment,
      id: IDService.encodeId(updatedPayment.id),
      subscriptionId: IDService.encodeId(updatedPayment.subscriptionId),
    };
  },
  deleteSubscriptionPayment: async (encodedUserId, encodedPaymentId) => {
    const userId = IDService.decodeId(encodedUserId);
    if (!userId) {
      const error = new Error('authentication failed');
      error.statusCode = 401;
      throw error;
    }
    const paymentId = IDService.decodeId(encodedPaymentId);
    const payment = await paymentRepository.getPaymentById(userId, paymentId);
    if (!payment) {
      const error = new Error('Payment not found');
      error.statusCode = 404;
      throw error;
    }
    const deletedPayment = await paymentRepository.deleteSubscriptionPayment(
      userId,
      paymentId
    );
    if (!deletedPayment) {
      const error = new Error('Payment not found');
      error.statusCode = 404;
      throw error;
    }
    return;
  },
};

export default paymentService;
