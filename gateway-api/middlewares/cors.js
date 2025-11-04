// Middleware CORS solo permite el frontend especificado
module.exports = (req, res, next) => {
  const allowedOrigin = process.env.FRONTEND_URL || 'http://localhost:5173';
  const origin = req.headers.origin;
  if (origin !== allowedOrigin) {
    return res.status(403).json({ error: 'Forbidden origin' });
  }
  next();
};