module.exports = (err, req, res, next) => {
  const status = err.status || 500;
  // Mensaje de error predeterminado
  let message = err.message || 'Ocurrió un error inesperado.';

  // Mensaje personalizado del microservicio
  if (err.details && typeof err.details.message === 'string' && err.details.message.trim()) {
    message = err.details.message;
  }

  // Mensajes basados en el código de estado si no hay mensaje válido
  if (!message || message === 'Error en el microservicio') {
    if (status === 400) message = 'Solicitud inválida.';
    if (status === 401) message = 'No autorizado.';
    if (status === 403) message = 'Acceso denegado.';
    if (status === 404) message = 'Recurso no encontrado.';
    if (status === 409) message = 'Conflicto: recurso duplicado o en uso.';
    if (status === 500) message = 'Error interno del servidor.';
  }

  res.status(status).json({
    error: true,
    message,
    code: status
  });
};
