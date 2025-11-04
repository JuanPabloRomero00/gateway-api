const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const router = require('./routes');
const errorHandler = require('./middlewares/error.middleware');

const app = express();

// Body parsers globales
app.use(express.json({ limit: '10mb' })); 
app.use(express.urlencoded({ extended: true }));

app.use(helmet());
app.use(cors());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200,
  message: 'Too many requests from this IP, please try again later.'
});
app.use(limiter);

// Enrutado de peticiones
app.use('/api', router);

// Manejo de errores
app.use(errorHandler);
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

module.exports = app;