const express = require('express');
const router = express.Router();
const proxyController = require('../controllers/proxy.controller');
const { authenticateJWT, authorizeRole } = require('../middlewares/auth');

// Crear un nuevo turno (requiere autenticación)
router.post('/', authenticateJWT, proxyController.createAppointment);

// Obtener mis turnos (autenticado)
router.get('/', authenticateJWT, proxyController.getAppointments);

// Obtener todos los turnos (solo admin)
router.get('/all', authenticateJWT, authorizeRole(['admin']), proxyController.getAllAppointments);

// Obtener turnos de un usuario específico (solo admin)
router.get('/user/:userId', authenticateJWT, authorizeRole(['admin']), proxyController.getUserAppointmentsAdmin);

// Cancelar turno propio
router.delete('/cancel/:id', authenticateJWT, proxyController.cancelAppointment);

// Actualizar y eliminar turno (solo admin)
router.put('/:id', authenticateJWT, authorizeRole(['admin']), proxyController.updateAppointment);
router.delete('/:id', authenticateJWT, authorizeRole(['admin']), proxyController.deleteAppointment);

module.exports = router;