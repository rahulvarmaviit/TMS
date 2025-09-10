import React from 'react';
import { Container, Typography, Box } from '@mui/material';

const HRDashboard = () => (
  <Container maxWidth="md">
    <Box mt={8} textAlign="center">
      <Typography variant="h3" color="primary" gutterBottom>
        HR Dashboard
      </Typography>
      <Typography variant="body1" color="text.secondary">
        Welcome, HR! Manage employee records, recruitment, and attendance here.
      </Typography>
    </Box>
  </Container>
);

export default HRDashboard;
