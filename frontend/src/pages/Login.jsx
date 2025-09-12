import React, { useState, useContext } from 'react';
import { useNavigate, Link, useSearchParams } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import { getRoleBasedRoute } from '../utils/roleRedirect';
import { TextField, Button, Container, Typography, Box, Paper, Alert } from '@mui/material';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [searchParams] = useSearchParams();
  const [role] = useState(searchParams.get('role') || '');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [showRoleError, setShowRoleError] = useState(false);
  const [roleErrorMsg, setRoleErrorMsg] = useState('');
  const [isDisabled, setIsDisabled] = useState(false);

  // Security: sanitize input
  const sanitizeInput = (input) => input.trim();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isDisabled) return; // prevent rapid submissions
    setIsDisabled(true);
    setTimeout(() => setIsDisabled(false), 3000); // 3-second cooldown

    const sanitizedEmail = sanitizeInput(email);
    const sanitizedPassword = sanitizeInput(password);

    try {
      const user = await login(sanitizedEmail, sanitizedPassword);

      // Normalize role
      let normalizedRole = role;
      if (normalizedRole.toLowerCase() === 'hr') {
        normalizedRole = 'HR';
      } else if (normalizedRole) {
        normalizedRole = normalizedRole.charAt(0).toUpperCase() + normalizedRole.slice(1).toLowerCase();
      }

      if (normalizedRole && user.role !== normalizedRole) {
        setShowRoleError(true);
        setRoleErrorMsg(`These are not ${normalizedRole} credentials. Please use the correct login for this role.`);
        return;
      }

      // Security: store token securely (use httpOnly cookie in backend)
      // Example placeholder: localStorage.setItem('token', encrypt(user.token));

      const redirectRoute = getRoleBasedRoute(user.role);
      navigate(redirectRoute);

    } catch (err) {
      setShowRoleError(true);
      // Security: generic error message
      setRoleErrorMsg('Invalid credentials or role mismatch.');
    }
  };

  const getRoleStyles = () => {
    const styles = {
      admin: { color: 'error', title: 'Admin Login', icon: '🔴' },
      hr: { color: 'primary', title: 'HR Login', icon: '🔵' },
      manager: { color: 'success', title: 'Manager Login', icon: '🟢' },
      employee: { color: 'secondary', title: 'Employee Login', icon: '🟣' },
      intern: { color: 'warning', title: 'Intern Login', icon: '🟠' }
    };
    return styles[role] || { color: 'primary', title: 'Login', icon: '🔐' };
  };

  const roleStyles = getRoleStyles();

  return (
    <Container maxWidth="sm">
      <Box mt={8} mb={4}>
        <Paper elevation={3} sx={{ p: 4, borderRadius: 2, position: 'relative' }}>
          <Box textAlign="center" mb={3}>
            <Typography variant="h4" gutterBottom color={roleStyles.color}>
              {roleStyles.icon} {roleStyles.title}
            </Typography>
            {role && (
              <Alert severity="info" sx={{ mb: 2 }}>
                Logging in as {role.toUpperCase()}
              </Alert>
            )}
            <Button
              variant="outlined"
              color="primary"
              sx={{ mt: 2, mb: 2 }}
              component={Link}
              to="/"
            >
              Dashboard
            </Button>
          </Box>

          {showRoleError && (
            <Box sx={{
              position: 'absolute',
              top: 16,
              left: '50%',
              transform: 'translateX(-50%)',
              zIndex: 10,
              bgcolor: 'error.main',
              color: 'error.contrastText',
              borderRadius: 2,
              boxShadow: 3,
              px: 3,
              py: 2,
              minWidth: 300,
              textAlign: 'center',
              fontWeight: 500,
              fontSize: '1.1rem',
              display: 'flex',
              alignItems: 'center',
              gap: 1
            }}>
              <span role="img" aria-label="error">❌</span>
              {roleErrorMsg}
              <Button 
                size="small" 
                sx={{ ml: 2, bgcolor: 'white', color: 'error.main', fontWeight: 700 }} 
                onClick={() => setShowRoleError(false)}
              >
                Close
              </Button>
            </Box>
          )}

          <form onSubmit={handleSubmit}>
            <TextField
              label="Email"
              type="email"
              fullWidth
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <TextField
              label="Password"
              type="password"
              fullWidth
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Button 
              type="submit" 
              variant="contained" 
              color={roleStyles.color} 
              fullWidth 
              size="large"
              sx={{ mt: 2, mb: 2 }}
              disabled={isDisabled}
            >
              Login
            </Button>

            <Box textAlign="center">
              <Typography variant="body2" color="text.secondary">
                Don't have an account?{' '}
                <Link 
                  to={role ? `/register?role=${role}` : '/register'}
                  style={{ textDecoration: 'none' }}
                >
                  Register here
                </Link>
              </Typography>
              {!role && (
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

export default Login;