const express = require('express');
const router = express.Router();
const Task = require('../models/Task');
const Attendance = require('../models/Attendance');
const Performance = require('../models/Performance');
const { auth, employee } = require('../middleware/auth');

// Get my tasks
router.get('/tasks', auth, employee, async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user.id });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

// Create task
router.post('/tasks', auth, employee, async (req, res) => {
  const { title, description, dueDate } = req.body;
  try {
    const task = new Task({ user: req.user.id, title, description, dueDate });
    await task.save();
    res.json({ msg: 'Task created' });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

// Update task
router.put('/tasks/:id', auth, employee, async (req, res) => {
  try {
    const task = await Task.findOneAndUpdate({ _id: req.params.id, user: req.user.id }, req.body, { new: true });
    if (!task) return res.status(404).json({ msg: 'Task not found' });
    res.json(task);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

// Delete task
router.delete('/tasks/:id', auth, employee, async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({ _id: req.params.id, user: req.user.id });
    if (!task) return res.status(404).json({ msg: 'Task not found' });
    res.json({ msg: 'Task deleted' });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

// Get my attendance
router.get('/attendance', auth, employee, async (req, res) => {
  try {
    const attendance = await Attendance.find({ user: req.user.id });
    res.json(attendance);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

// Get my performance
router.get('/performance', auth, employee, async (req, res) => {
  try {
    const performance = await Performance.find({ user: req.user.id });
    res.json(performance);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;