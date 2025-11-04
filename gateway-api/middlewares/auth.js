const jwtService = require('../services/jwt.service');

// Middleware de autenticación y autorización que verifica JWT y roles
function authenticateJWT(req, res, next) {
  const authHeader = req.headers['authorization'];
  if (!authHeader) return res.status(401).json({ error: 'No token provided' });
  const token = authHeader.split(' ')[1];
  try {
    const user = jwtService.verifyToken(token);
    req.user = user;
    next();
  } catch (err) {
    return res.status(403).json({ error: 'Invalid token' });
  }
}
// Middleware de autorización basado en roles
function authorizeRole(roles = []) {
  return (req, res, next) => {
    if (!roles.length) return next();
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ error: 'Forbidden: insufficient permissions' });
    }
    next();
  };
}

module.exports = { authenticateJWT, authorizeRole };