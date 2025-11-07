const axios = require('axios');
const formatError = require('../utils/formatError');

// Realiza solicitud proxy a otro microservicio
async function proxyRequest({ url, method = 'GET', body, headers = {} }) {
  try {
    console.log(`🔄 Proxy request: ${method} ${url}`);
    console.log('📋 Headers:', headers);
    if (body) console.log('📦 Body:', body);
    
    const config = {
      method: method.toLowerCase(),
      url,
      headers: { 'Content-Type': 'application/json', ...headers },
      ...(body ? { data: body } : {}),
      timeout: 30000, // 30 segundos timeout
      validateStatus: () => true // No lanzar error en status codes
    };
    
    const response = await axios(config);
    console.log(`📡 Response status: ${response.status} ${response.statusText}`);
    
    const data = response.data || {};
    
    if (response.status >= 400) {
      console.log('❌ Error response:', data);
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
    
    console.log('✅ Success response:', data);
    return data;
  } catch (err) {
    console.log('💥 Proxy error:', err.message);
    if (err.status) {
      throw err;
    }
    throw formatError(err);
  }
}

module.exports = { proxyRequest };