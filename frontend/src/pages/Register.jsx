import React, { useState, useContext } from 'react';
import { useNavigate, Link, useSearchParams } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import { getRoleBasedRoute } from '../utils/roleRedirect';
import { TextField, Button, Container, Typography, Box, Paper, Alert, Snackbar } from '@mui/material';

const Register = () => {
  const [searchParams] = useSearchParams();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    role: searchParams.get('role') || 'Employee'
  });
  const [error, setError] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  // Sanitize role from URL
  const sanitizeRole = (role) => {
    const allowedRoles = ['Admin', 'HR', 'Manager', 'Employee', 'Intern'];
    const normalized = role.charAt(0).toUpperCase() + role.slice(1).toLowerCase();
    return allowedRoles.includes(normalized) ? normalized : 'Employee';
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateInputs = () => {
    const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!usernameRegex.test(formData.username)) {
      setError('Username must be 3-20 chars, letters/numbers/underscore only');
      return false;
    }
    if (!emailRegex.test(formData.email)) {
      setError('Invalid email format');
      return false;
    }
    if (!passwordRegex.test(formData.password)) {
      setError('Password must be 8+ chars, include letters, numbers & special char');
      return false;
    }
    setError('');
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateInputs()) {
      setSnackbarOpen(true);
      return;
    }

    try {
      // Only use sanitized role for display/UI, backend must enforce real role
      const normalizedRole = sanitizeRole(formData.role);

      const user = await register(formData.username, formData.email, formData.password, normalizedRole);
      const redirectRoute = getRoleBasedRoute(user.role);
      navigate(redirectRoute);
    } catch (err) {
      // Show generic message, log detailed error server-side
      setError('Registration failed. Please try again.');
      setSnackbarOpen(true);
      console.error('Register error:', err);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Paper 
        elevation={3} 
        sx={{ 
          p: 4, 
          borderRadius: 2,
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white'
        }}
      >
        <Typography variant="h4" component="h1" align="center" gutterBottom>
          Create Your Account
        </Typography>
        <Typography variant="body1" align="center" sx={{ mb: 3, opacity: 0.9 }}>
          Join as {sanitizeRole(formData.role)}
        </Typography>
        
        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            fullWidth
            id="username"
            name="username"
            label="Username"
            value={formData.username}
            onChange={handleChange}
            margin="normal"
            required
            sx={{
              mb: 2,
              '& .MuiOutlinedInput-root': {
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                '& fieldset': {
                  borderColor: 'rgba(255, 255, 255, 0.3)',
                },
                '&:hover fieldset': {
                  borderColor: 'white',
                },
                '&.Mui-focused fieldset': {
                  borderColor: 'white',
                },
              },
              '& .MuiInputLabel-root': {
                color: 'rgba(0, 0, 0, 0.7)',
              },
            }}
          />
          
          <TextField
            fullWidth
            id="email"
            name="email"
            label="Email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            margin="normal"
            required
            sx={{
              mb: 2,
              '& .MuiOutlinedInput-root': {
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                '& fieldset': {
                  borderColor: 'rgba(255, 255, 255, 0.3)',
                },
                '&:hover fieldset': {
                  borderColor: 'white',
                },
                '&.Mui-focused fieldset': {
                  borderColor: 'white',
                },
              },
              '& .MuiInputLabel-root': {
                color: 'rgba(0, 0, 0, 0.7)',
              },
            }}
          />
          
          <TextField
            fullWidth
            id="password"
            name="password"
            label="Password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            margin="normal"
            required
            sx={{
              mb: 3,
              '& .MuiOutlinedInput-root': {
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                '& fieldset': {
                  borderColor: 'rgba(255, 255, 255, 0.3)',
                },
                '&:hover fieldset': {
                  borderColor: 'white',
                },
                '&.Mui-focused fieldset': {
                  borderColor: 'white',
                },
              },
              '& .MuiInputLabel-root': {
                color: 'rgba(0, 0, 0, 0.7)',
              },
            }}
          />
          
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              mt: 2,
              mb: 2,
              py: 1.5,
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              color: 'white',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.3)',
              },
            }}
          >
            Create Account
          </Button>
          
          <Box textAlign="center">
            <Typography variant="body2" sx={{ opacity: 0.9 }}>
              Already have an account?{' '}
              <Link 
                to={`/login?role=${formData.role.toLowerCase()}`}
                style={{ 
                  color: 'white', 
                  textDecoration: 'underline',
                  fontWeight: 'bold'
                }}
              >
                Sign In
              </Link>
            </Typography>
          </Box>
        </Box>
      </Paper>
      
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert 
          onClose={() => setSnackbarOpen(false)} 
          severity="error" 
          sx={{ width: '100%' }}
        >
          {error}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Register;