import React from 'react';
import { Container, Typography, Box } from '@mui/material';

const EmployeeDashboard = () => (
  <Container maxWidth="md">
    <Box mt={8} textAlign="center">
      <Typography variant="h3" color="secondary" gutterBottom>
        Employee Dashboard
      </Typography>
      <Typography variant="body1" color="text.secondary">
        Welcome, Employee! View your tasks, attendance, and performance here.
      </Typography>
    </Box>
  </Container>
);

export default EmployeeDashboard;
