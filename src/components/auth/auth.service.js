import authRepository from './auth.repository.js';
import bcrypt from 'bcrypt';
import {
  generateAppToken,
  isValidEmail,
  isValidPassword,
} from '../../utils/jwt.helpers.js';
import IDService from '../../utils/IDservice.js';

const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS);

const authService = {
  getUserByEmail: async (email) => {
    if (!email) {
      const error = new Error('Email is required');
      error.statusCode = 400;
      throw error;
    }
    if (!isValidEmail(email)) {
      const error = new Error('Invalid email format');
      error.statusCode = 400;
      throw error;
    }
    const user = await authRepository.getUserByEmail(email);
    if (!user) {
      const error = new Error('User not found');
      error.statusCode = 404;
      throw error;
    }
    return {
      id: IDService.encodeId(user.id),
      email: user.email,
      name: user.name,
      createdAt: user.createdAt,
    };
  },
  register: async (email, password) => {
    if (!email || !password) {
      const error = new Error('Email and password are required');
      error.statusCode = 400;
      throw error;
    }

    if (!isValidEmail(email)) {
      const error = new Error('Invalid email format');
      error.statusCode = 400;
      throw error;
    }

    if (!isValidPassword(password)) {
      const error = new Error(
        'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character'
      );
      error.statusCode = 400;
      throw error;
    }
    const existingUser = await authRepository.getUserByEmail(email);
    if (existingUser) {
      const error = new Error('User already exists with this email');
      error.statusCode = 409;
      throw error;
    }

    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    const data = {
      email,
      hashedPassword,
    };

    const newUser = await authRepository.createUser(data);

    return {
      id: IDService.encodeId(newUser.id),
      email: newUser.email,
    };
  },

  login: async (email, password) => {
    if (!email || !password) {
      const error = new Error('Email and password are required');
      error.statusCode = 400;
      throw error;
    }

    const user = await authRepository.getUserByEmail(email);
    if (!user) {
      const error = new Error('Invalid email or password');
      error.statusCode = 401;
      throw error;
    }

    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
    if (!isPasswordValid) {
      const error = new Error('Invalid email or password');
      error.statusCode = 401;
      throw error;
    }

    const appToken = generateAppToken(user);

    return {
      token: appToken,
      user: {
        id: IDService.encodeId(user.id),
        email: user.email,
        name: user.name,
      },
    };
  },
};

export default authService;
