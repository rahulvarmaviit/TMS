import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardActions, Button, Typography, Grid, AppBar, Toolbar, Container, Box, Tabs, Tab, Avatar } from '@mui/material';
import { Users, Briefcase, Clock, TrendingUp, Shield, Zap, Award, Target, UserCheck, Building, LogIn, UserPlus } from 'lucide-react';

const LandingPage = () => {
  const [selectedRole, setSelectedRole] = useState(null);
  const navigate = useNavigate();

  const features = [
    {
      icon: <Users className="w-8 h-8" />,
      title: "Team Collaboration",
      description: "Seamless communication and task sharing across all team members"
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: "Attendance Tracking",
      description: "Automated check-in/check-out with detailed attendance reports"
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Performance Analytics",
      description: "Real-time performance metrics and comprehensive reporting"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Role-Based Access",
      description: "Secure, role-specific access control for different user types"
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Real-Time Updates",
      description: "Instant notifications and live updates across all modules"
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: "Performance Reviews",
      description: "Structured appraisal system with goal tracking and feedback"
    }
  ];

  const userRoles = [
    {
      id: 'admin',
      title: 'Administrator',
      description: 'Full system access and management',
      icon: <Shield className="w-6 h-6" />,
      color: 'bg-red-500',
      baseColor: 'red',
      features: ['User Management', 'System Configuration', 'Security Settings', 'Analytics Dashboard'],
      loginPath: '/login?role=admin',
      registerPath: '/register?role=admin'
    },
    {
      id: 'hr',
      title: 'HR Manager',
      description: 'Employee management and HR operations',
      icon: <UserCheck className="w-6 h-6" />,
      color: 'bg-blue-500',
      baseColor: 'blue',
      features: ['Employee Records', 'Recruitment', 'Attendance Tracking', 'Performance Reviews'],
      loginPath: '/login?role=hr',
      registerPath: '/register?role=hr'
    },
    {
      id: 'manager',
      title: 'Team Manager',
      description: 'Team oversight and project management',
      icon: <Building className="w-6 h-6" />,
      color: 'bg-green-500',
      baseColor: 'green',
      features: ['Team Management', 'Project Oversight', 'Task Assignment', 'Performance Monitoring'],
      loginPath: '/login?role=manager',
      registerPath: '/register?role=manager'
    },
    {
      id: 'employee',
      title: 'Employee',
      description: 'Task management and personal workspace',
      icon: <Briefcase className="w-6 h-6" />,
      color: 'bg-purple-500',
      baseColor: 'purple',
      features: ['Task Management', 'Attendance', 'Performance Tracking', 'Team Collaboration'],
      loginPath: '/login?role=employee',
      registerPath: '/register?role=employee'
    },
    {
      id: 'intern',
      title: 'Intern',
      description: 'Learning and development platform',
      icon: <Target className="w-6 h-6" />,
      color: 'bg-orange-500',
      baseColor: 'orange',
      features: ['Learning Tasks', 'Mentorship', 'Progress Tracking', 'Skill Development'],
      loginPath: '/login?role=intern',
      registerPath: '/register?role=intern'
    }
  ];

  const handleRoleSelection = (role) => {
    setSelectedRole(role);
    navigate(`/login?role=${role}`);
  };

  const [openSections, setOpenSections] = useState([]);

  const toggleSection = (index) => {
    setOpenSections(prev => 
      prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
    );
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <AppBar position="static" color="primary" elevation={1}>
        <Toolbar>
          <Avatar sx={{ bgcolor: 'primary.main', mr: 2 }}>
            <Building size={24} />
          </Avatar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>TMS Pro</Typography>
          <Tabs value={false} textColor="inherit" indicatorColor="secondary">
            <Tab label="Features" href="#features" />
            <Tab label="User Roles" href="#roles" />
            <Tab label="Login" href="#auth" />
          </Tabs>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Box textAlign="center" sx={{ py: 8 }}>
          <Typography variant="h2" color="primary" fontWeight={700} gutterBottom>
            AI-Driven Success.
          </Typography>
          <Typography variant="h3" color="text.primary" fontWeight={700} gutterBottom>
            Redefining the Future.
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
            Creating latest solutions that redefine team management.
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
            Stay ahead with AI-powered technology for the future.
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mb: 6 }}>
            <Button component={Link} to="/register" variant="contained" color="primary">Connect With Us</Button>
            <Button component={Link} to="#features" variant="outlined" color="primary">What is TMS?</Button>
          </Box>
        </Box>

        <Box id="features" sx={{ py: 8 }}>
          <Typography variant="h4" fontWeight={700} align="center" gutterBottom>Powerful Features</Typography>
          <Typography variant="body1" color="text.secondary" align="center" sx={{ mb: 4 }}>
            Everything you need to manage your team effectively, all in one platform
          </Typography>
          <Grid container spacing={4} justifyContent="center">
            {features.map((feature, idx) => (
              <Grid item xs={12} sm={6} md={4} key={idx}>
                <Card elevation={3} sx={{ height: '100%' }}>
                  <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                      {feature.icon}
                    </Box>
                    <Typography variant="h6" fontWeight={600} align="center" gutterBottom>{feature.title}</Typography>
                    <Typography variant="body2" color="text.secondary" align="center">{feature.description}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        <Box id="roles" sx={{ py: 8 }}>
          <Typography variant="h4" fontWeight={700} align="center" gutterBottom>Choose Your Role</Typography>
          <Typography variant="body1" color="text.secondary" align="center" sx={{ mb: 4 }}>
            Access tailored features based on your role in the organization
          </Typography>
          <Grid container spacing={4} justifyContent="center">
            {userRoles.map((role, idx) => (
              <Grid item xs={12} sm={6} md={4} key={role.id}>
                <Card elevation={3} sx={{ height: '100%', cursor: 'pointer' }} onClick={() => handleRoleSelection(role.id)}>
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Avatar sx={{ bgcolor: role.baseColor, mr: 2 }}>{role.icon}</Avatar>
                      <Box>
                        <Typography variant="h6" fontWeight={700}>{role.title}</Typography>
                        <Typography variant="body2" color="text.secondary">{role.description}</Typography>
                      </Box>
                    </Box>
                    <Box component="ul" sx={{ pl: 2, mb: 2 }}>
                      {role.features.map((feature, i) => (
                        <li key={i}>
                          <Typography variant="body2" color="text.secondary">{feature}</Typography>
                        </li>
                      ))}
                    </Box>
                  </CardContent>
                  <CardActions>
                    <Button component={Link} to={role.loginPath} startIcon={<LogIn size={18} />} variant="contained" color="primary" fullWidth>Login</Button>
                    <Button component={Link} to={role.registerPath} startIcon={<UserPlus size={18} />} variant="outlined" color="primary" fullWidth>Register</Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        <Box id="auth" sx={{ py: 8, textAlign: 'center' }}>
          <Typography variant="h4" fontWeight={700} gutterBottom>Ready to Get Started?</Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
            Join thousands of teams already using TMS Pro to streamline their operations
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mb: 6 }}>
            <Button component={Link} to="/choose-role" variant="contained" color="primary">Create Your Account</Button>
            <Button component={Link} to="/choose-role" variant="outlined" color="primary">Sign In</Button>
          </Box>
        </Box>
      </Container>

      <Box component="footer" sx={{ bgcolor: 'grey.900', color: 'grey.100', py: 6, mt: 8 }}>
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            <Grid item xs={12} md={3}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Avatar sx={{ bgcolor: 'primary.main', mr: 2 }}>
                  <Building size={24} />
                </Avatar>
                <Typography variant="h6">TMS Pro</Typography>
              </Box>
              <Typography variant="body2" color="grey.400">
                Empowering teams with intelligent management solutions.
              </Typography>
            </Grid>
            <Grid item xs={12} md={3}>
              <Typography variant="subtitle1" fontWeight={700} gutterBottom>Product</Typography>
              <Box component="ul" sx={{ pl: 2 }}>
                <li><Link to="#features" style={{ color: 'inherit', textDecoration: 'none' }}>Features</Link></li>
                <li><Link to="#roles" style={{ color: 'inherit', textDecoration: 'none' }}>User Roles</Link></li>
                <li><Link to="#" style={{ color: 'inherit', textDecoration: 'none' }}>Pricing</Link></li>
              </Box>
            </Grid>
            <Grid item xs={12} md={3}>
              <Typography variant="subtitle1" fontWeight={700} gutterBottom>Support</Typography>
              <Box component="ul" sx={{ pl: 2 }}>
                <li><Link to="#" style={{ color: 'inherit', textDecoration: 'none' }}>Documentation</Link></li>
                <li><Link to="#" style={{ color: 'inherit', textDecoration: 'none' }}>Contact</Link></li>
                <li><Link to="#" style={{ color: 'inherit', textDecoration: 'none' }}>Help Center</Link></li>
              </Box>
            </Grid>
            <Grid item xs={12} md={3}>
              <Typography variant="subtitle1" fontWeight={700} gutterBottom>Company</Typography>
              <Box component="ul" sx={{ pl: 2 }}>
                <li><Link to="#" style={{ color: 'inherit', textDecoration: 'none' }}>About</Link></li>
                <li><Link to="#" style={{ color: 'inherit', textDecoration: 'none' }}>Careers</Link></li>
                <li><Link to="#" style={{ color: 'inherit', textDecoration: 'none' }}>Privacy</Link></li>
              </Box>
            </Grid>
          </Grid>
          <Box sx={{ borderTop: 1, borderColor: 'grey.800', mt: 4, pt: 2, textAlign: 'center' }}>
            <Typography variant="body2" color="grey.400">&copy; 2024 TMS Pro. All rights reserved.</Typography>
          </Box>
        </Container>
      </Box>
    </Box>
  );
}

export default LandingPage;