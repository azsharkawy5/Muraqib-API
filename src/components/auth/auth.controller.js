import authService from './auth.service.js';
import { formatSuccess } from '../../utils/response.formatter.js';

const authController = {
  getUserByEmail: async (req, res, next) => {
    try {
      const email = req.user.email;
      const user = await authService.getUserByEmail(email);
      res.json(formatSuccess(user, 'User retrieved successfully'));
    } catch (error) {
      next(error);
    }
  },

  register: async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const user = await authService.register(email, password);
      res.json(formatSuccess(user, 'User registered successfully'));
    } catch (error) {
      next(error);
    }
  },

  login: async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const user = await authService.login(email, password);
      res.json(formatSuccess(user, 'Login successful'));
    } catch (error) {
      next(error);
    }
  },
};

export default authController;
