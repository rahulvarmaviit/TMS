import React from 'react';
import { Container, Typography, Box } from '@mui/material';

const ManagerDashboard = () => (
  <Container maxWidth="md">
    <Box mt={8} textAlign="center">
      <Typography variant="h3" color="success" gutterBottom>
        Manager Dashboard
      </Typography>
      <Typography variant="body1" color="text.secondary">
        Welcome, Manager! Oversee projects, assign tasks, and monitor performance here.
      </Typography>
    </Box>
  </Container>
);

export default ManagerDashboard;
