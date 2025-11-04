const express = require('express');
const router = express.Router();
const proxyController = require('../controllers/proxy.controller');
const { validateRegister } = require('../middlewares/validation.middleware');
const { authenticateJWT, authorizeRole } = require('../middlewares/auth');

// Registro y login públicos
router.post('/register', validateRegister, proxyController.createUser);
router.post('/login', proxyController.loginUser);

// Registro de administrador con clave secreta
router.post('/admin/register', proxyController.createAdmin);

// Recuperación de contraseña pública
router.post('/forgot-password', proxyController.forgotPassword);
router.post('/reset-password', proxyController.resetPassword);

// Obtener datos del perfil del usuario autenticado
router.get('/me', authenticateJWT, proxyController.getMe);

// Gestión de usuarios (solo admin)
router.get('/', authenticateJWT, authorizeRole(['admin']), proxyController.getAllUsers);
router.post('/', authenticateJWT, authorizeRole(['admin']), proxyController.createUser);
router.put('/:id', authenticateJWT, authorizeRole(['admin']), proxyController.updateUser);
router.delete('/:id', authenticateJWT, authorizeRole(['admin']), proxyController.deleteUser);

module.exports = router;