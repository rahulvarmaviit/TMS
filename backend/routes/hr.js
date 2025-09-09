const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Attendance = require('../models/Attendance');
const Performance = require('../models/Performance');
const { auth, hr } = require('../middleware/auth');

// Get all employees
router.get('/employees', auth, hr, async (req, res) => {
  try {
    const employees = await User.find({ role: 'employee' }).select('-password');
    res.json(employees);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

// Mark attendance
router.post('/attendance', auth, hr, async (req, res) => {
  const { userId, date, status, notes } = req.body;
  try {
    const attendance = new Attendance({ user: userId, date, status, notes });
    await attendance.save();
    res.json({ msg: 'Attendance marked' });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

// Get attendance for employee
router.get('/attendance/:userId', auth, hr, async (req, res) => {
  try {
    const attendance = await Attendance.find({ user: req.params.userId });
    res.json(attendance);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

// Add performance appraisal
router.post('/performance', auth, hr, async (req, res) => {
  const { userId, period, rating, comments } = req.body;
  try {
    const performance = new Performance({ user: userId, period, rating, comments });
    await performance.save();
    res.json({ msg: 'Performance added' });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

// Get performance for employee
router.get('/performance/:userId', auth, hr, async (req, res) => {
  try {
    const performance = await Performance.find({ user: req.params.userId });
    res.json(performance);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;