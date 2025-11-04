const jwtService = require('../services/jwt.service');

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Envio de credenciales a users-api
    const loginRes = await fetch(process.env.USERS_API_URL + '/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    if (!loginRes.ok) {
      const errorData = await loginRes.json();
      return next({ status: loginRes.status, message: errorData.error || errorData.message });
    }
    const { user } = await loginRes.json();


    // Generación de tokens JWT
    const accessToken = jwtService.generateToken(user, '15m');
    const refreshToken = jwtService.generateToken(user, '30d');

    // Guardo refresh token del usuario en users-api
    const refreshRes = await fetch(process.env.USERS_API_URL + '/api/auth/refresh', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: user.id, refreshToken })
    });
    if (!refreshRes.ok) {
      const errorData = await refreshRes.json();
      return next({ status: refreshRes.status, message: errorData.error || errorData.message });
    }
    res.json({ accessToken, refreshToken, user });
  } catch (err) {
    next(err);
  }
};

const register = async (req, res, next) => {
  try {
    const { email, password, name } = req.body;
    const registerRes = await fetch(process.env.USERS_API_URL + '/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, name })
    });
    if (!registerRes.ok) {
      const errorData = await registerRes.json();
      return next({ status: registerRes.status, message: errorData.error || errorData.message });
    }
    const { user } = await registerRes.json();
    res.status(201).json({ user });
  } catch (err) {
    next(err);
  }
};

const refreshToken = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;
    const payload = jwtService.verifyToken(refreshToken);
    const accessToken = jwtService.generateToken(payload, '15m');
    res.json({ accessToken });
  } catch (err) {
    next(err);
  }
};

const logout = async (req, res, next) => {
  try {
    const { userId } = req.user;
    const logoutRes = await fetch(process.env.USERS_API_URL + '/api/auth/logout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId })
    });
    if (!logoutRes.ok) {
      const errorData = await logoutRes.json();
      return next({ status: logoutRes.status, message: errorData.error || errorData.message });
    }
    res.json({ message: 'Logout successful' });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  login,
  register,
  refreshToken,
  logout
};