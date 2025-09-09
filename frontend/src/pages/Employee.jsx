import React from 'react';
import { useState, useEffect, useContext } from 'react';
import AuthContext from '../context/AuthContext';
import axios from 'axios';
import { Typography, Container, Paper, Tabs, Tab, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Button, Select, MenuItem } from '@mui/material';

const Employee = () => {
  const { user } = useContext(AuthContext);
  const [tasks, setTasks] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const [performance, setPerformance] = useState([]);
  const [newTask, setNewTask] = useState({ title: '', description: '', dueDate: '' });
  const [tabValue, setTabValue] = useState(0);

  useEffect(() => {
    fetchTasks();
    fetchAttendance();
    fetchPerformance();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await axios.get('/api/employee/tasks', { headers: { Authorization: `Bearer ${user.token}` } });
      setTasks(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error(err);
      setTasks([]);
    }
  };

  const createTask = async () => {
    try {
      await axios.post('/api/employee/tasks', newTask, { headers: { Authorization: `Bearer ${user.token}` } });
      fetchTasks();
      setNewTask({ title: '', description: '', dueDate: '' });
    } catch (err) {
      console.error(err);
    }
  };

  const updateTask = async (id, status) => {
    try {
      await axios.put(`/api/employee/tasks/${id}`, { status }, { headers: { Authorization: `Bearer ${user.token}` } });
      fetchTasks();
    } catch (err) {
      console.error(err);
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`/api/employee/tasks/${id}`, { headers: { Authorization: `Bearer ${user.token}` } });
      fetchTasks();
    } catch (err) {
      console.error(err);
    }
  };

  const fetchAttendance = async () => {
    try {
      const res = await axios.get('/api/employee/attendance', { headers: { Authorization: `Bearer ${user.token}` } });
      setAttendance(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error(err);
      setAttendance([]);
    }
  };

  const fetchPerformance = async () => {
    try {
      const res = await axios.get('/api/employee/performance', { headers: { Authorization: `Bearer ${user.token}` } });
      setPerformance(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error(err);
      setPerformance([]);
    }
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>Employee Module</Typography>
        <Tabs value={tabValue} onChange={handleTabChange} aria-label="employee tabs">
          <Tab label="Task Management" />
          <Tab label="Attendance" />
          <Tab label="Performance" />
        </Tabs>
        <Box sx={{ mt: 2 }}>
          {tabValue === 0 && (
            <>
              <Typography variant="h6">Tasks</Typography>
              <TableContainer component={Paper} sx={{ mt: 2 }}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Title</TableCell>
                      <TableCell>Description</TableCell>
                      <TableCell>Due Date</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {tasks.map((task) => (
                      <TableRow key={task._id}>
                        <TableCell>{task.title}</TableCell>
                        <TableCell>{task.description}</TableCell>
                        <TableCell>{new Date(task.dueDate).toLocaleDateString()}</TableCell>
                        <TableCell>{task.status}</TableCell>
                        <TableCell>
                          <Select
                            value={task.status}
                            onChange={(e) => updateTask(task._id, e.target.value)}
                          >
                            <MenuItem value="pending">Pending</MenuItem>
                            <MenuItem value="in_progress">In Progress</MenuItem>
                            <MenuItem value="completed">Completed</MenuItem>
                          </Select>
                          <Button onClick={() => deleteTask(task._id)}>Delete</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <Typography variant="h6" sx={{ mt: 4 }}>Create New Task</Typography>
              <TextField
                label="Title"
                value={newTask.title}
                onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                fullWidth
                sx={{ mt: 2 }}
              />
              <TextField
                label="Description"
                value={newTask.description}
                onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                fullWidth
                sx={{ mt: 2 }}
              />
              <TextField
                label="Due Date"
                type="date"
                value={newTask.dueDate}
                onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
                fullWidth
                sx={{ mt: 2 }}
                InputLabelProps={{ shrink: true }}
              />
              <Button variant="contained" onClick={createTask} sx={{ mt: 2 }}>Create Task</Button>
            </>
          )}
          {tabValue === 1 && (
            <>
              <Typography variant="h6">Attendance Records</Typography>
              <TableContainer component={Paper} sx={{ mt: 2 }}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Date</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Notes</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {attendance.map((record) => (
                      <TableRow key={record._id}>
                        <TableCell>{new Date(record.date).toLocaleDateString()}</TableCell>
                        <TableCell>{record.status}</TableCell>
                        <TableCell>{record.notes}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </>
          )}
          {tabValue === 2 && (
            <>
              <Typography variant="h6">Performance Appraisals</Typography>
              <TableContainer component={Paper} sx={{ mt: 2 }}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Period</TableCell>
                      <TableCell>Rating</TableCell>
                      <TableCell>Comments</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {performance.map((appraisal) => (
                      <TableRow key={appraisal._id}>
                        <TableCell>{appraisal.period}</TableCell>
                        <TableCell>{appraisal.rating}</TableCell>
                        <TableCell>{appraisal.comments}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </>
          )}
        </Box>
      </Paper>
    </Container>
  );
};

export default Employee;