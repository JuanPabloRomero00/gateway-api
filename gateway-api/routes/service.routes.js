const express = require('express');
const router = express.Router();
const proxyController = require('../controllers/proxy.controller');
const { authenticateJWT, authorizeRole } = require('../middlewares/auth');

// Consultar servicios (público)
router.get('/', proxyController.getServices);

// Crear, editar y eliminar servicios (solo admin)
router.post('/', authenticateJWT, authorizeRole(['admin']), proxyController.createService);
router.put('/:id', authenticateJWT, authorizeRole(['admin']), proxyController.updateService);
router.delete('/:id', authenticateJWT, authorizeRole(['admin']), proxyController.deleteService);

module.exports = router;