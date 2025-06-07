import prisma from '../../config/database.config.js';

const paymentRepository = {
  getPaymentById: (userId, paymentId) => {
    return prisma.payment.findUnique({
      where: {
        id: paymentId,
        subscription: {
          userId: userId,
        },
      },
      select: {
        id: true,
        subscriptionId: true,
        amountPaid: true,
        paymentDate: true,
        status: true,
        notes: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  },
  getSubscriptionPayments: (userId, subscriptionId) => {
    return prisma.payment.findMany({
      where: {
        subscriptionId: subscriptionId,
        subscription: {
          userId: userId,
        },
      },
      select: {
        id: true,
        subscriptionId: true,
        amountPaid: true,
        paymentDate: true,
        status: true,
        notes: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  },
  getUserPaymentsGroupBySubscription: (subscriptionId) => {
    return null;
  },

  createSubscriptionPayment: (subscriptionId, paymentData) => {
    return prisma.payment.create({
      data: {
        subscriptionId: subscriptionId,
        amountPaid: paymentData.amountPaid,
        paymentDate: paymentData.paymentDate,
        status: paymentData.status,
        notes: paymentData.notes,
      },
      select: {
        id: true,
        subscriptionId: true,
        amountPaid: true,
        paymentDate: true,
        status: true,
        notes: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  },
  updateSubscriptionPayment: (paymentId, paymentData) => {
    return prisma.payment.update({
      where: {
        id: paymentId,
      },
      data: {
        amountPaid: paymentData.amountPaid,
        paymentDate: paymentData.paymentDate,
        status: paymentData.status,
        notes: paymentData.notes,
      },
      select: {
        id: true,
        subscriptionId: true,
        amountPaid: true,
        paymentDate: true,
        status: true,
        notes: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  },
  deleteSubscriptionPayment: (userId, paymentId) => {
    return prisma.payment.delete({
      where: {
        id: paymentId,
        subscription: {
          userId: userId,
        },
      },
    });
  },
};

export default paymentRepository;
