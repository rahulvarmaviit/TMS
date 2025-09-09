import React, { useState, useEffect, useContext } from 'react';
import { Typography, Button, Table, TableBody, TableCell, TableHead, TableRow, TextField, Select, MenuItem, Box, FormControl, InputLabel } from '@mui/material';
import axios from 'axios';
import AuthContext from '../context/AuthContext';

const HR = () => {
  const { user } = useContext(AuthContext);
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState('');
  const [attendance, setAttendance] = useState({ date: '', status: 'present', notes: '' });
  const [performance, setPerformance] = useState({ period: '', rating: 3, comments: '' });
  const [employeeAttendance, setEmployeeAttendance] = useState([]);
  const [employeePerformance, setEmployeePerformance] = useState([]);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('http://localhost:5000/api/hr/employees', {
        headers: { 'x-auth-token': token }
      });
      setEmployees(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchAttendance = async (userId) => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get(`http://localhost:5000/api/hr/attendance/${userId}`, {
        headers: { 'x-auth-token': token }
      });
      setEmployeeAttendance(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchPerformance = async (userId) => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get(`http://localhost:5000/api/hr/performance/${userId}`, {
        headers: { 'x-auth-token': token }
      });
      setEmployeePerformance(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleMarkAttendance = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:5000/api/hr/attendance', { userId: selectedEmployee, ...attendance }, {
        headers: { 'x-auth-token': token }
      });
      setAttendance({ date: '', status: 'present', notes: '' });
      fetchAttendance(selectedEmployee);
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddPerformance = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:5000/api/hr/performance', { userId: selectedEmployee, ...performance }, {
        headers: { 'x-auth-token': token }
      });
      setPerformance({ period: '', rating: 3, comments: '' });
      fetchPerformance(selectedEmployee);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSelectEmployee = (e) => {
    const userId = e.target.value;
    setSelectedEmployee(userId);
    fetchAttendance(userId);
    fetchPerformance(userId);
  };

  return (
    <Box p={3}>
      <Typography variant="h4">HR Module</Typography>
      <Typography>Manage employees, attendance, and performance.</Typography>

      <Box mt={4}>
        <FormControl fullWidth>
          <InputLabel>Select Employee</InputLabel>
          <Select value={selectedEmployee} onChange={handleSelectEmployee}>
            {employees.map(emp => (
              <MenuItem key={emp._id} value={emp._id}>{emp.username}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      {selectedEmployee && (
        <>
          <Box mt={4}>
            <Typography variant="h6">Mark Attendance</Typography>
            <TextField
              label="Date"
              type="date"
              value={attendance.date}
              onChange={e => setAttendance({...attendance, date: e.target.value})}
              InputLabelProps={{ shrink: true }}
            />
            <Select
              value={attendance.status}
              onChange={e => setAttendance({...attendance, status: e.target.value})}
            >
              <MenuItem value="present">Present</MenuItem>
              <MenuItem value="absent">Absent</MenuItem>
              <MenuItem value="leave">Leave</MenuItem>
            </Select>
            <TextField
              label="Notes"
              value={attendance.notes}
              onChange={e => setAttendance({...attendance, notes: e.target.value})}
            />
            <Button onClick={handleMarkAttendance}>Mark</Button>

            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Date</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Notes</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {employeeAttendance.map(att => (
                  <TableRow key={att._id}>
                    <TableCell>{new Date(att.date).toLocaleDateString()}</TableCell>
                    <TableCell>{att.status}</TableCell>
                    <TableCell>{att.notes}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>

          <Box mt={4}>
            <Typography variant="h6">Performance Appraisal</Typography>
            <TextField
              label="Period"
              value={performance.period}
              onChange={e => setPerformance({...performance, period: e.target.value})}
            />
            <Select
              value={performance.rating}
              onChange={e => setPerformance({...performance, rating: e.target.value})}
            >
              <MenuItem value={1}>1</MenuItem>
              <MenuItem value={2}>2</MenuItem>
              <MenuItem value={3}>3</MenuItem>
              <MenuItem value={4}>4</MenuItem>
              <MenuItem value={5}>5</MenuItem>
            </Select>
            <TextField
              label="Comments"
              value={performance.comments}
              onChange={e => setPerformance({...performance, comments: e.target.value})}
            />
            <Button onClick={handleAddPerformance}>Add</Button>

            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Period</TableCell>
                  <TableCell>Rating</TableCell>
                  <TableCell>Comments</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {employeePerformance.map(perf => (
                  <TableRow key={perf._id}>
                    <TableCell>{perf.period}</TableCell>
                    <TableCell>{perf.rating}</TableCell>
                    <TableCell>{perf.comments}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>
        </>
      )}
    </Box>
  );
};

export default HR;