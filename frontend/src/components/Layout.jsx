import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, Drawer, List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { Menu as MenuIcon, Dashboard as DashboardIcon, People as PeopleIcon, Assignment as AssignmentIcon, Assessment as AssessmentIcon } from '@mui/icons-material';
import { Outlet, Link } from 'react-router-dom';

const Layout = () => {
  console.log('Layout component rendered');
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <div style={{ display: 'flex' }}>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={toggleDrawer}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" style={{ flexGrow: 1, marginLeft: 20 }}>
            Team Management System
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer variant="temporary" open={open} onClose={toggleDrawer}>
        <List>
          <ListItemButton component={Link} to="/" onClick={toggleDrawer}>
            <ListItemIcon><DashboardIcon /></ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItemButton>
          <ListItemButton component={Link} to="/admin" onClick={toggleDrawer}>
            <ListItemIcon><PeopleIcon /></ListItemIcon>
            <ListItemText primary="Admin Module" />
          </ListItemButton>
          <ListItemButton component={Link} to="/hr" onClick={toggleDrawer}>
            <ListItemIcon><AssignmentIcon /></ListItemIcon>
            <ListItemText primary="HR Module" />
          </ListItemButton>
          <ListItemButton component={Link} to="/employee" onClick={toggleDrawer}>
            <ListItemIcon><AssessmentIcon /></ListItemIcon>
            <ListItemText primary="Employee Module" />
          </ListItemButton>
        </List>
      </Drawer>
      <main style={{ flexGrow: 1, padding: '64px 24px 24px' }}>
        {console.log('Layout: Rendering Outlet')}
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;