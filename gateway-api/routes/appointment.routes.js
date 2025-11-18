const express = require('express');
const router = express.Router();
const proxyController = require('../controllers/proxy.controller');
const { authenticateJWT, authorizeRole } = require('../middlewares/auth');

// Create a new appointment (requires authentication)
router.post('/', authenticateJWT, proxyController.createAppointment);

// Get my appointments (authenticated)
router.get('/', authenticateJWT, proxyController.getAppointments);

// Get all appointments (admin only)
router.get('/all', authenticateJWT, authorizeRole(['admin']), proxyController.getAllAppointments);

// Get appointments of a specific user (admin only)
router.get('/user/:userId', authenticateJWT, authorizeRole(['admin']), proxyController.getUserAppointmentsAdmin);

// Cancel my appointment
router.delete('/cancel/:id', authenticateJWT, proxyController.cancelAppointment);

// Update and delete appointment (admin only)
router.put('/:id', authenticateJWT, authorizeRole(['admin']), proxyController.updateAppointment);
router.delete('/:id', authenticateJWT, authorizeRole(['admin']), proxyController.deleteAppointment);

module.exports = router;