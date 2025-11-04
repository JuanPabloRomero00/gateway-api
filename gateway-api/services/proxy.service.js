const formatError = require('../utils/formatError');


// Realiza solicitud proxy a otro microservicio
async function proxyRequest({ url, method = 'GET', body, headers = {} }) {
  try {
    const options = {
      method,
      headers: { 'Content-Type': 'application/json', ...headers },
      ...(body ? { body: JSON.stringify(body) } : {})
    };
    const response = await fetch(url, options);
    const data = await response.json().catch(() => ({}));
    if (!response.ok) {
      // si viene mensaje del microservicio, lo usa, si no, usa un mensaje genérico
      const representMsg = data.message || data.error;
      const error = new Error(representMsg && representMsg !== 'Error en el microservicio' ? representMsg : 'Error en el microservicio');
      error.status = response.status;
      error.details = data;
      // Si el mensaje es válido y no es genérico, lo asigna a los detalles del error
      if (representMsg && representMsg !== 'Error en el microservicio') {
        error.details.message = representMsg;
      }
      throw error;
    }
    return data;
  } catch (err) {
    if (err.status) {
      throw err;
    }
    throw formatError(err);
  }
}

module.exports = { proxyRequest };