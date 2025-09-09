const axios = require('axios');

const registerUser = async () => {
  try {
    const res = await axios.post('http://localhost:5000/api/auth/register', {
      username: 'testuser',
      email: 'test@example.com',
      password: 'password123',
      role: 'Employee',
    });
    console.log('User registered successfully:', res.data);
  } catch (err) {
    console.error('Error registering user:', err.response ? err.response.data : err.message);
  }
};

registerUser();