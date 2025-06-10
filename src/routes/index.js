import { Router } from 'express';
import categoryRoutes from './category.routes.js';
import authRoutes from './auth.routes.js';
import subscriptionRoutes from './subscription.routes.js';
import paymentRoutes from './payment.routes.js';
const router = Router();

router.use('/auth', authRoutes);
router.use('/categories', categoryRoutes);
router.use('/subscriptions', subscriptionRoutes);
router.use('/payments', paymentRoutes);

export default router;
