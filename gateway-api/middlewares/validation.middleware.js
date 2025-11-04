// Middlewares de validación de usuario usando Zod
const { z } = require('zod');

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8)
});

const registerSchema = z.object({
  nombre: z.string().min(2).max(50),
  apellido: z.string().min(2).max(50),
  email: z.string().email(),
  password: z.string().min(8),
  telefono: z.string().regex(/^[+]?\d{7,15}$/)
});

const zodErrorTranslations = {
  'Invalid email': 'Email inválido',
  'String must contain at least 8 character(s)': 'La contraseña debe tener al menos 8 caracteres',
  'Required': 'Campo obligatorio',
  'String must contain at least 2 character(s)': 'Debe tener al menos 2 caracteres',
  'String must contain at most 50 character(s)': 'Debe tener como máximo 50 caracteres',
  'Invalid': 'Valor inválido',
  'Invalid input': 'Entrada inválida',
  'Invalid string': 'Cadena inválida',
  'Invalid regex': 'Formato inválido',
};

const translateZodMessage = (msg) => {
  for (const [en, es] of Object.entries(zodErrorTranslations)) {
    if (msg.includes(en)) return msg.replace(en, es);
  }
  return msg;
};

const formatZodErrors = (err) => {
  if (err.errors && Array.isArray(err.errors)) {
    const emailError = err.errors.find(e => e.path && e.path.includes('email'));
    if (emailError) return translateZodMessage(emailError.message);
    return err.errors
      .map(e => `${e.path.join('.')}: ${translateZodMessage(e.message)}`)
      .join(' | ');
  }
  return 'Datos inválidos.';
};


const validateLogin = (req, res, next) => {
  try {
    req.body = loginSchema.parse(req.body);
    next();
  } catch (err) {
    err.status = 400;
    err.details = { message: formatZodErrors(err) };
    next(err);
  }
};


const validateRegister = (req, res, next) => {
  try {
    req.body = registerSchema.parse(req.body);
    next();
  } catch (err) {
    err.status = 400;
    err.details = { message: formatZodErrors(err) };
    next(err);
  }
};

module.exports = {
  validateLogin,
  validateRegister
};