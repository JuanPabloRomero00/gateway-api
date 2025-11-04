const express = require('express');
const router = express.Router();
const proxyController = require('../controllers/proxy.controller');
const { authenticateJWT, authorizeRole } = require('../middlewares/auth');

// Crear un nuevo turno (público)
router.post('/', proxyController.createAppointment);

// Obtener los turnos (autenticado)
router.get('/', authenticateJWT, proxyController.getAppointments);

// Actualizar y eliminar turno (solo admin)
router.put('/:id', authenticateJWT, authorizeRole(['admin']), proxyController.updateAppointment);
router.delete('/:id', authenticateJWT, authorizeRole(['admin']), proxyController.deleteAppointment);

module.exports = router;