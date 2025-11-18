const axios = require('axios');
const formatError = require('../utils/formatError');

// Make a proxy request to another microservice
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
      timeout: 30000, // 30 seconds timeout
      validateStatus: () => true
    };
    
    const response = await axios(config);
    console.log(`📡 Response status: ${response.status} ${response.statusText}`);
    
    const data = response.data || {};
    
    if (response.status >= 400) {
      console.log('❌ Error response:', data);
      // if there is a message from the microservice, use it, otherwise use a generic message
      const representMsg = data.message || data.error;
      const error = new Error(representMsg && representMsg !== 'Error en el microservicio' ? representMsg : 'Error en el microservicio');
      error.status = response.status;
      error.details = data;
      // If the message is valid and not generic, assign it to the error details
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