// Utility for formatting errors received from APIs
module.exports = (error) => {
  if (error.response && error.response.data) {
    return {
      status: error.response.status,
      message: error.response.data.error || error.response.data.message,
      details: error.response.data.details || null
    };
  }
  return {
    status: 500,
    message: error.message || 'Internal server error',
    details: null
  };
};