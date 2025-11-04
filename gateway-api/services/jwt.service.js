const jwt = require('jsonwebtoken');

module.exports = {
  generateToken: (payload, expiresIn = '15m') => {
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn });
  },
  generateRefreshToken: (payload, expiresIn = '30d') => {
    return jwt.sign(payload, process.env.JWT_REFRESH_SECRET, { expiresIn });
  },
  verifyToken: (token) => {
    return jwt.verify(token, process.env.JWT_SECRET);
  }
};