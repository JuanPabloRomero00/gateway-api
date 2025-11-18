const express = require('express');
const router = express.Router();
const proxyController = require('../controllers/proxy.controller');
const { authenticateJWT, authorizeRole } = require('../middlewares/auth');

// Get services (public)
router.get('/', proxyController.getServices);

// Create, update, and delete services (admin only)
router.post('/', authenticateJWT, authorizeRole(['admin']), proxyController.createService);
router.put('/:id', authenticateJWT, authorizeRole(['admin']), proxyController.updateService);
router.delete('/:id', authenticateJWT, authorizeRole(['admin']), proxyController.deleteService);

module.exports = router;