import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, Link, useSearchParams } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import { getRoleBasedRoute } from '../utils/roleRedirect';
import { TextField, Button, Container, Typography, Box, FormControl, InputLabel, Select, MenuItem, Paper, Alert } from '@mui/material';

const Register = () => {
  const [searchParams] = useSearchParams();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    role: searchParams.get('role') || 'Employee'
  });
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Normalize role value to match backend enum
      let normalizedRole = formData.role;
      if (normalizedRole.toLowerCase() === 'hr') {
        normalizedRole = 'HR';
      } else {
        normalizedRole = normalizedRole.charAt(0).toUpperCase() + normalizedRole.slice(1).toLowerCase();
      }
      const user = await register(formData.username, formData.email, formData.password, normalizedRole);
      const redirectRoute = getRoleBasedRoute(user.role);
      navigate(redirectRoute);
    } catch (err) {
      // Show full backend error if available
      if (err.response && err.response.data && err.response.data.error) {
        alert('Registration failed: ' + err.response.data.error);
      } else {
        alert(err.message || 'Registration failed');
      }
    }
  };

  const getRoleStyles = () => {
    const styles = {
      Admin: { color: 'error', title: 'Admin Registration', icon: '🔴' },
      HR: { color: 'primary', title: 'HR Registration', icon: '🔵' },
      Manager: { color: 'success', title: 'Manager Registration', icon: '🟢' },
      Employee: { color: 'secondary', title: 'Employee Registration', icon: '🟣' },
      Intern: { color: 'warning', title: 'Intern Registration', icon: '🟠' }
    };
    return styles[formData.role] || { color: 'primary', title: 'Register', icon: '📝' };
  };

  const roleStyles = getRoleStyles();
  const roleParam = searchParams.get('role');

  return (
    <Container maxWidth="sm">
      <Box mt={8} mb={4}>
        <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
          <Box textAlign="center" mb={3}>
            <Typography variant="h4" gutterBottom color={roleStyles.color}>
              {roleStyles.icon} {roleStyles.title}
            </Typography>
            {roleParam && (
              <Alert severity="info" sx={{ mb: 2 }}>
                Registering as {formData.role}
              </Alert>
            )}
          </Box>
          
          <form onSubmit={handleSubmit}>
            <TextField
              label="Username"
              name="username"
              fullWidth
              margin="normal"
              value={formData.username}
              onChange={handleChange}
              required
            />
            <TextField
              label="Email"
              name="email"
              type="email"
              fullWidth
              margin="normal"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <TextField
              label="Password"
              name="password"
              type="password"
              fullWidth
              margin="normal"
              value={formData.password}
              onChange={handleChange}
              required
            />
              {/* Role selection removed as per request */}
            <Button 
              type="submit" 
              variant="contained" 
              color={roleStyles.color} 
              fullWidth 
              size="large"
              sx={{ mt: 2, mb: 2 }}
            >
              Register
            </Button>
            
            <Box textAlign="center">
              <Typography variant="body2" color="text.secondary">
                Already have an account?{' '}
                <Link 
                  to={roleParam ? `/login?role=${formData.role}` : '/login'}
                  style={{ textDecoration: 'none' }}
                >
                  Login here
                </Link>
              </Typography>
              {!roleParam && (
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                  <Link to="/" style={{ textDecoration: 'none' }}>
                    Back to Landing Page
                  </Link>
                </Typography>
              )}
            </Box>
          </form>
        </Paper>
      </Box>
    </Container>
  );
};

export default Register;