import jwt from 'jsonwebtoken';

export const authenticateToken = (req, res, next) => {
  const { JWT_SECRET } = process.env;
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res
      .status(401)
      .json({ message: 'Authentication token is required' });
  }

  jwt.verify(token, JWT_SECRET, (err, userPayload) => {
    if (err) {
      console.error('JWT verification error:', err.message);

      if (err.name === 'TokenExpiredError') {
        return res.status(401).json({
          message: 'Token expired',
        });
      }

      return res.status(403).json({
        message: 'Token is not valid',
      });
    }
    req.user = userPayload;
    next();
  });
};
