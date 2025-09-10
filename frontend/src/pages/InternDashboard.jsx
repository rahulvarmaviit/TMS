import React from 'react';
import { Container, Typography, Box } from '@mui/material';

const InternDashboard = () => (
  <Container maxWidth="md">
    <Box mt={8} textAlign="center">
      <Typography variant="h3" color="warning" gutterBottom>
        Intern Dashboard
      </Typography>
      <Typography variant="body1" color="text.secondary">
        Welcome, Intern! Track your learning tasks, mentorship, and progress here.
      </Typography>
    </Box>
  </Container>
);

export default InternDashboard;
