import { Router } from 'express';
import { subscriptionController } from '../components/subscription/index.js';
import { authenticateToken } from '../middlewares/authenticateToken.js';
import { validate } from '../middlewares/index.js';
import { subscriptionValidator } from '../components/subscription/index.js';
const router = Router();

router.get('/', authenticateToken, subscriptionController.getUserSubscriptions);
router.get(
  '/categories',
  authenticateToken,
  subscriptionController.getUserSubscriptionsGroupByCategory
);
router.get('/:id', authenticateToken, subscriptionController.getSubscription);

router.delete(
  '/:id',
  authenticateToken,
  subscriptionController.deleteSubscription
);
router.post(
  '/',
  authenticateToken,
  validate(subscriptionValidator.createSubscriptionSchema),
  subscriptionController.createSubscription
);

router.put(
  '/:id',
  authenticateToken,
  validate(subscriptionValidator.updateSubscriptionSchema),
  subscriptionController.updateSubscription
);

export default router;
