// Middleware CORS solo permite el frontend especificado
module.exports = (req, res, next) => {
  const allowedOrigins = [
    process.env.FRONTEND_URL || 'http://localhost:5173',
    'https://carwashfrontend.netlify.app'
  ];
  
  const origin = req.headers.origin;
  
  // Permitir requests sin origen (ej: requests directos, Postman)
  if (!origin) {
    return next();
  }
  
  // Verificar si el origen está permitido
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With, X-API-Key');
    
    // Manejar preflight requests
    if (req.method === 'OPTIONS') {
      return res.status(200).end();
    }
    
    return next();
  }
  
  return res.status(403).json({ error: 'Forbidden origin', origin });
};