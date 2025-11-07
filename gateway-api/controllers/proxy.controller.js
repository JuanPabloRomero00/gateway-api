const { proxyRequest } = require('../services/proxy.service');

// USUARIOS
exports.createUser = async (req, res, next) => {
  try {
    const data = await proxyRequest({
      url: process.env.USERS_API_URL + '/api/users/register',
      method: 'POST',
      body: req.body
    });
    res.json(data);
  } catch (err) {
    next(err);
  }
};

exports.createAdmin = async (req, res, next) => {
  try {
    const data = await proxyRequest({
      url: process.env.USERS_API_URL + '/api/users/admin/register',
      method: 'POST',
      body: req.body
    });
    res.json(data);
  } catch (err) {
    next(err);
  }
};

exports.loginUser = async (req, res, next) => {
  try {
    const data = await proxyRequest({
      url: process.env.USERS_API_URL + '/api/users/login',
      method: 'POST',
      body: req.body
    });
    res.json(data);
  } catch (err) {
    next(err);
  }
};

exports.forgotPassword = async (req, res, next) => {
  try {
    const data = await proxyRequest({
      url: process.env.USERS_API_URL + '/api/users/forgot-password',
      method: 'POST',
      body: req.body
    });
    res.json(data);
  } catch (err) {
    next(err);
  }
};

exports.resetPassword = async (req, res, next) => {
  try {
    const data = await proxyRequest({
      url: process.env.USERS_API_URL + '/api/users/reset-password',
      method: 'POST',
      body: req.body
    });
    res.json(data);
  } catch (err) {
    next(err);
  }
};

exports.getAllUsers = async (req, res, next) => {
  try {
    const data = await proxyRequest({
      url: process.env.USERS_API_URL + '/api/users',
      method: 'GET',
      headers: { 
        'Authorization': req.headers.authorization
      }
    });
    res.json(data);
  } catch (err) {
    next(err);
  }
};

exports.updateUser = async (req, res, next) => {
  try {
    const data = await proxyRequest({
      url: process.env.USERS_API_URL + `/api/users/${req.params.id}`,
      method: 'PUT',
      body: req.body,
      headers: { 
        'Authorization': req.headers.authorization
      }
    });
    res.json(data);
  } catch (err) {
    next(err);
  }
};

exports.deleteUser = async (req, res, next) => {
  try {
    await proxyRequest({
      url: process.env.USERS_API_URL + `/api/users/${req.params.id}`,
      method: 'DELETE',
      headers: { 
        'Authorization': req.headers.authorization
      }
    });
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};

exports.getMe = async (req, res, next) => {
  try {
    // Para /users/:id, usar el parámetro de la ruta o el ID del usuario autenticado
    const userId = req.params.id || req.user.id;
    const data = await proxyRequest({
      url: process.env.USERS_API_URL + `/api/users/${userId}`,
      method: 'GET',
      headers: { 
        'Authorization': req.headers.authorization
      }
    });
    res.json(data);
  } catch (err) {
    next(err);
  }
};

// Función específica para /me que redirije al ID del usuario
exports.getMeProfile = async (req, res, next) => {
  try {
    const data = await proxyRequest({
      url: process.env.USERS_API_URL + `/api/users/${req.user.id}`,
      method: 'GET',
      headers: { 
        'Authorization': req.headers.authorization
      }
    });
    res.json(data);
  } catch (err) {
    next(err);
  }
};

// APPOINTMENTS
exports.createAppointment = async (req, res, next) => {
  try {
    const data = await proxyRequest({
      url: process.env.APPOINTMENTS_API_URL + '/api/appointments',
      method: 'POST',
      body: req.body,
      headers: { 
        'Authorization': req.headers.authorization
      }
    });
    res.json(data);
  } catch (err) {
    next(err);
  }
};

exports.getAppointments = async (req, res, next) => {
  try {
    const data = await proxyRequest({
      url: process.env.APPOINTMENTS_API_URL + '/api/appointments',
      method: 'GET',
      headers: { 
        'Authorization': req.headers.authorization
      }
    });
    res.json(data);
  } catch (err) {
    next(err);
  }
};

exports.updateAppointment = async (req, res, next) => {
  try {
    const data = await proxyRequest({
      url: process.env.APPOINTMENTS_API_URL + `/api/appointments/${req.params.id}`,
      method: 'PUT',
      body: req.body,
      headers: { 
        'Authorization': req.headers.authorization
      }
    });
    res.json(data);
  } catch (err) {
    next(err);
  }
};

exports.deleteAppointment = async (req, res, next) => {
  try {
    await proxyRequest({
      url: process.env.APPOINTMENTS_API_URL + `/api/appointments/${req.params.id}`,
      method: 'DELETE',
      headers: { 
        'Authorization': req.headers.authorization
      }
    });
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};

// SERVICES
exports.getServices = async (req, res, next) => {
  try {
    const data = await proxyRequest({
      url: process.env.SERVICES_API_URL + '/api/services',
      method: 'GET'
    });
    res.json(data);
  } catch (err) {
    next(err);
  }
};

exports.createService = async (req, res, next) => {
  try {
    const data = await proxyRequest({
      url: process.env.SERVICES_API_URL + '/api/services',
      method: 'POST',
      body: req.body,
      headers: { 
        'Authorization': req.headers.authorization
      }
    });
    res.json(data);
  } catch (err) {
    next(err);
  }
};

exports.updateService = async (req, res, next) => {
  try {
    const data = await proxyRequest({
      url: process.env.SERVICES_API_URL + `/api/services/${req.params.id}`,
      method: 'PUT',
      body: req.body,
      headers: { 
        'Authorization': req.headers.authorization
      }
    });
    res.json(data);
  } catch (err) {
    next(err);
  }
};

exports.deleteService = async (req, res, next) => {
  try {
    await proxyRequest({
      url: process.env.SERVICES_API_URL + `/api/services/${req.params.id}`,
      method: 'DELETE',
      headers: { 
        'Authorization': req.headers.authorization
      }
    });
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};

// APPOINTMENTS - Rutas adicionales que faltaban
exports.getAllAppointments = async (req, res, next) => {
  try {
    const data = await proxyRequest({
      url: process.env.APPOINTMENTS_API_URL + '/api/appointments/all',
      method: 'GET',
      headers: { 
        'Authorization': req.headers.authorization
      }
    });
    res.json(data);
  } catch (err) {
    next(err);
  }
};

exports.getUserAppointmentsAdmin = async (req, res, next) => {
  try {
    const data = await proxyRequest({
      url: process.env.APPOINTMENTS_API_URL + `/api/appointments/user/${req.params.userId}`,
      method: 'GET',
      headers: { 
        'Authorization': req.headers.authorization
      }
    });
    res.json(data);
  } catch (err) {
    next(err);
  }
};

exports.cancelAppointment = async (req, res, next) => {
  try {
    await proxyRequest({
      url: process.env.APPOINTMENTS_API_URL + `/api/appointments/cancel/${req.params.id}`,
      method: 'DELETE',
      headers: { 
        'Authorization': req.headers.authorization
      }
    });
    res.status(200).json({ message: 'Cita cancelada correctamente' });
  } catch (err) {
    next(err);
  }
};