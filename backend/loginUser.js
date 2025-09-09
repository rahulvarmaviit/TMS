const axios = require('axios');

const loginUser = async () => {
  try {
    const res = await axios.post('http://localhost:5000/api/auth/login', {
      email: 'test@example.com',
      password: 'password123',
    });
    console.log('User logged in successfully:', res.data);
  } catch (err) {
    console.error('Error logging in user:', err.response ? err.response.data : err.message);
  }
};

loginUser();