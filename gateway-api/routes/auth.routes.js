const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const permissionsController = require('../controllers/permissions.controller');
const { validateLogin, validateRegister } = require('../middlewares/validation.middleware');
const { authenticateJWT, authorizeRole } = require('../middlewares/auth');

// Auth routes
router.post('/login', validateLogin, authController.login);
router.post('/register', validateRegister, authController.register);
router.post('/refresh', authController.refreshToken);
router.post('/logout', authenticateJWT, authController.logout);

// Permissions routes (RBAC)
router.get('/permissions', authenticateJWT, authorizeRole(['admin']), permissionsController.getPermissions);
router.post('/permissions', authenticateJWT, authorizeRole(['admin']), permissionsController.createPermission);
router.put('/permissions/:id', authenticateJWT, authorizeRole(['admin']), permissionsController.updatePermission);
router.delete('/permissions/:id', authenticateJWT, authorizeRole(['admin']), permissionsController.deletePermission);

module.exports = router;