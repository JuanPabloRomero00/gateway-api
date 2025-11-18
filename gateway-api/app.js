const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const app = express();


// CORS configuration for centralized gateway architecture
const allowedOrigins = [
  'https://carwashfrontend.netlify.app',
  process.env.FRONTEND_URL
].filter(Boolean);


// Use credentials only for trusted origins
app.use(cors({
  origin: function (origin, callback) {
    if (!origin) {
      return callback(null, true);
    }
    if (allowedOrigins.indexOf(origin) !== -1) {
      return callback(null, true);
    } else {
      console.log('CORS blocked origin:', origin);
      callback(new Error('Not allowed by CORS policy'));
    }
  },

  // Enable credentials only for trusted origins
  credentials: function(req, callback) {
    const trustedForCredentials = [
      'https://carwashfrontend.netlify.app'
    ];
    const origin = req.headers.origin;
    if (!origin) {
      return callback(null, false);
    }
    const allowCredentials = trustedForCredentials.includes(origin);
    callback(null, allowCredentials);
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'X-API-Key'],
  exposedHeaders: ['X-Total-Count'],
  maxAge: 86400 // 24 hours
}));

// Security middleware
app.use(helmet());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 200,
  message: 'Too many requests from this IP, please try again later.'
});

app.use(limiter);


// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));


// Health check endpoint for Render
app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Gateway API is running successfully!',
    timestamp: new Date().toISOString(),
    status: 'healthy'
  });
});

// All routes
const router = require('./routes');
app.use('/api', router);

// 404 handler error 
app.use('*', (req, res, next) => {
  const error = new Error('Route not found');
  error.status = 404;
  next(error);
});

// Error middleware 
const errorHandler = require('./middlewares/error.middleware');
app.use(errorHandler);

module.exports = app;