import jwt from 'jsonwebtoken';
import IDService from './IDservice.js';

export function generateAppToken(user) {
  const { JWT_SECRET, JWT_EXPIRES_IN } = process.env;
  const tokenPayload = {
    id: IDService.encodeId(user.id),
    email: user.email,
  };
  return jwt.sign(tokenPayload, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN || '1h',
  });
}

export function isValidEmail(email) {
  return email && email.includes('@');
}

export function isValidPassword(password) {
  return password && password.length >= 6;
}
