import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Typography, Box, Button, Grid, Paper } from '@mui/material';

const roles = [
  { label: 'Admin', value: 'Admin' },
  { label: 'HR', value: 'HR' },
  { label: 'Manager', value: 'Manager' },
  { label: 'Employee', value: 'Employee' },
  { label: 'Intern', value: 'Intern' },
];

const ChooseRole = () => {
  const navigate = useNavigate();

  const handleChoose = (role) => {
    navigate(`/register?role=${role}`);
  };

  return (
    <Container maxWidth="sm">
      <Box mt={8} mb={4} textAlign="center">
        <Typography variant="h4" gutterBottom>
          Choose Your Role
        </Typography>
        <Typography variant="body1" color="text.secondary" mb={4}>
          Select your role to continue registration
        </Typography>
        <Grid container spacing={2} justifyContent="center">
          {roles.map((role) => (
            <Grid item xs={12} sm={6} key={role.value}>
              <Paper elevation={2} sx={{ p: 2 }}>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  size="large"
                  onClick={() => handleChoose(role.value)}
                >
                  {role.label}
                </Button>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default ChooseRole;
