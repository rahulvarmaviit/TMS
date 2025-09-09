import React, { useState, useEffect, useContext } from 'react';
import { Typography, Button, Table, TableBody, TableCell, TableHead, TableRow, TextField, Select, MenuItem, Box } from '@mui/material';
import axios from 'axios';
import AuthContext from '../context/AuthContext';

const Admin = () => {
  const { user } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ username: '', email: '', password: '', role: 'employee' });
  const [editingUser, setEditingUser] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('http://localhost:5000/api/admin/users', {
        headers: { 'x-auth-token': token }
      });
      setUsers(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleCreate = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:5000/api/admin/users', newUser, {
        headers: { 'x-auth-token': token }
      });
      setNewUser({ username: '', email: '', password: '', role: 'employee' });
      fetchUsers();
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(`http://localhost:5000/api/admin/users/${editingUser._id}`, editingUser, {
        headers: { 'x-auth-token': token }
      });
      setEditingUser(null);
      fetchUsers();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5000/api/admin/users/${id}`, {
        headers: { 'x-auth-token': token }
      });
      fetchUsers();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Box p={3}>
      <Typography variant="h4">Admin Module</Typography>
      <Typography>Manage users, roles, projects, and security.</Typography>

      <Box mt={4}>
        <Typography variant="h6">User Management</Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Username</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map(u => (
              <TableRow key={u._id}>
                <TableCell>{u.username}</TableCell>
                <TableCell>{u.email}</TableCell>
                <TableCell>{u.role}</TableCell>
                <TableCell>
                  <Button onClick={() => setEditingUser(u)}>Edit</Button>
                  <Button onClick={() => handleDelete(u._id)}>Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <Box mt={2}>
          <Typography variant="h6">{editingUser ? 'Edit User' : 'Create User'}</Typography>
          <TextField
            label="Username"
            value={editingUser ? editingUser.username : newUser.username}
            onChange={e => editingUser ? setEditingUser({...editingUser, username: e.target.value}) : setNewUser({...newUser, username: e.target.value})}
          />
          <TextField
            label="Email"
            value={editingUser ? editingUser.email : newUser.email}
            onChange={e => editingUser ? setEditingUser({...editingUser, email: e.target.value}) : setNewUser({...newUser, email: e.target.value})}
          />
          {!editingUser && (
            <TextField
              label="Password"
              type="password"
              value={newUser.password}
              onChange={e => setNewUser({...newUser, password: e.target.value})}
            />
          )}
          <Select
            value={editingUser ? editingUser.role : newUser.role}
            onChange={e => editingUser ? setEditingUser({...editingUser, role: e.target.value}) : setNewUser({...newUser, role: e.target.value})}
          >
            <MenuItem value="Admin">Admin</MenuItem>
            <MenuItem value="HR">HR</MenuItem>
            <MenuItem value="Employee">Employee</MenuItem>
            <MenuItem value="Manager">Manager</MenuItem>
            <MenuItem value="Intern">Intern</MenuItem>
          </Select>
          <Button onClick={editingUser ? handleUpdate : handleCreate}>{editingUser ? 'Update' : 'Create'}</Button>
        </Box>
      </Box>

      <Box mt={4}>
        <Typography variant="h6">Project Oversight</Typography>
        <Typography>Placeholder for project management features.</Typography>
      </Box>

      <Box mt={4}>
        <Typography variant="h6">Security Settings</Typography>
        <Typography>Placeholder for security configurations.</Typography>
      </Box>
    </Box>
  );
};

export default Admin;