require('dotenv').config();
const app = require('./app');

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Gateway API running on port ${PORT}`);
  console.log('Configured services:', {
     users: process.env.USERS_API_URL || 'http://localhost:3002',
     appointments: process.env.APPOINTMENTS_API_URL || 'http://localhost:3001',
    services: process.env.SERVICES_API_URL || 'http://localhost:3003'
   });
});