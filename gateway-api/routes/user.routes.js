const express = require('express');
const router = express.Router();
const proxyController = require('../controllers/proxy.controller');
const { validateRegister } = require('../middlewares/validation.middleware');
const { authenticateJWT, authorizeRole } = require('../middlewares/auth');

// Public registration and login
router.post('/register', validateRegister, proxyController.createUser);
router.post('/login', proxyController.loginUser);

// Admin registration with secret key
router.post('/admin/register', proxyController.createAdmin);

// Public password recovery
router.post('/forgot-password', proxyController.forgotPassword);
router.post('/reset-password', proxyController.resetPassword);

// Get authenticated user's profile data (/me)
router.get('/me', authenticateJWT, proxyController.getMeProfile);

// User management (admin only)
router.get('/', authenticateJWT, authorizeRole(['admin']), proxyController.getAllUsers);
router.post('/', authenticateJWT, authorizeRole(['admin']), proxyController.createUser);
router.put('/:id', authenticateJWT, authorizeRole(['admin']), proxyController.updateUser);
router.delete('/:id', authenticateJWT, authorizeRole(['admin']), proxyController.deleteUser);

// Get user data by id (the microservice handles authorization)
router.get('/:id', authenticateJWT, proxyController.getMe);

module.exports = router;