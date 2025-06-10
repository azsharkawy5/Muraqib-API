import { Router } from 'express';
import { paymentController } from '../components/payment/index.js';
import { authenticateToken } from '../middlewares/authenticateToken.js';
import { validate } from '../middlewares/index.js';
import { paymentValidator } from '../components/payment/index.js';
const router = Router();

router.post(
  '/',
  authenticateToken,
  validate(paymentValidator.createPaymentSchema),
  paymentController.createSubscriptionPayment
);

router.delete(
  '/:id',
  authenticateToken,
  paymentController.deleteSubscriptionPayment
);
router.put(
  '/:id',
  authenticateToken,
  validate(paymentValidator.updatePaymentSchema),
  paymentController.updateSubscriptionPayment
);

router.get(
  '/data',
  authenticateToken,
  paymentController.getUserPaymentsGroupBySubscription
);
router.get('/:id', authenticateToken, paymentController.getPaymentById);
router.get(
  '/subscription/:id',
  authenticateToken,
  paymentController.getSubscriptionPayments
);

export default router;
