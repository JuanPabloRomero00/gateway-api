const express = require('express');
const router = express.Router();
const userRoutes = require('./user.routes');
const appointmentRoutes = require('./appointment.routes');
const serviceRoutes = require('./service.routes');
const authRoutes = require('./auth.routes');

router.use('/users', userRoutes);
router.use('/appointments', appointmentRoutes);
router.use('/services', serviceRoutes);
router.use('/auth', authRoutes);

module.exports = router;