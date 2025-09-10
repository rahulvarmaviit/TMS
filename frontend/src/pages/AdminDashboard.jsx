import React from 'react';
import { Container, Typography, Box } from '@mui/material';

const AdminDashboard = () => (
  <Container maxWidth="md">
    <Box mt={8} textAlign="center">
      <Typography variant="h3" color="error" gutterBottom>
        Admin Dashboard
      </Typography>
      <Typography variant="body1" color="text.secondary">
        Welcome, Admin! Manage users, system settings, and view analytics here.
      </Typography>
    </Box>
  </Container>
);

export default AdminDashboard;
