import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Clock, Calendar, CheckCircle, AlertCircle, History, Plus } from 'lucide-react';

const AttendanceTracker = () => {
  const [isClockedIn, setIsClockedIn] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [clockInTime, setClockInTime] = useState(null);
  const [totalHours, setTotalHours] = useState(0);
  const [attendanceHistory, setAttendanceHistory] = useState([
    { date: '2024-01-15', clockIn: '09:00 AM', clockOut: '05:30 PM', total: '8.5 hrs', status: 'completed' },
    { date: '2024-01-14', clockIn: '09:15 AM', clockOut: '05:45 PM', total: '8.5 hrs', status: 'completed' },
    { date: '2024-01-13', clockIn: '09:00 AM', clockOut: '05:00 PM', total: '8 hrs', status: 'completed' },
  ]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleClockIn = () => {
    const now = new Date();
    setClockInTime(now);
    setIsClockedIn(true);
    
    // Add to attendance history
    const newEntry = {
      date: now.toLocaleDateString(),
      clockIn: now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      clockOut: null,
      total: '0 hrs',
      status: 'in-progress'
    };
    setAttendanceHistory(prev => [newEntry, ...prev]);
  };

  const handleClockOut = () => {
    const now = new Date();
    const hoursWorked = ((now - clockInTime) / (1000 * 60 * 60)).toFixed(1);
    setTotalHours(prev => prev + parseFloat(hoursWorked));
    setIsClockedIn(false);
    setClockInTime(null);

    // Update the latest entry
    setAttendanceHistory(prev => {
      const updated = [...prev];
      updated[0] = {
        ...updated[0],
        clockOut: now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
        total: `${hoursWorked} hrs`,
        status: 'completed'
      };
      return updated;
    });
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit', 
      second: '2-digit' 
    });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-xl shadow-lg p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Attendance Tracker</h2>
          <p className="text-gray-600 mt-1">Track your daily work hours and attendance</p>
        </div>
        <Clock className="w-8 h-8 text-blue-600" />
      </div>

      {/* Current Status */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 mb-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600 mb-1">Current Time</p>
            <p className="text-3xl font-bold text-gray-800">{formatTime(currentTime)}</p>
            <p className="text-sm text-gray-600">{formatDate(currentTime)}</p>
          </div>
          
          <div className="text-center">
            <div className={`w-4 h-4 rounded-full mb-2 mx-auto ${
              isClockedIn ? 'bg-green-500' : 'bg-red-500'
            }`}></div>
            <p className="text-sm font-medium text-gray-700">
              {isClockedIn ? 'Clocked In' : 'Clocked Out'}
            </p>
          </div>
        </div>

        {clockInTime && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <p className="text-sm text-gray-600 mb-1">Clocked in at</p>
            <p className="text-lg font-semibold text-gray-800">
              {formatTime(clockInTime)}
            </p>
            <p className="text-sm text-blue-600">
              Duration: {((currentTime - clockInTime) / (1000 * 60 * 60)).toFixed(1)} hours
            </p>
          </div>
        )}
      </div>

      {/* Clock In/Out Buttons */}
      <div className="flex gap-4 mb-6">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleClockIn}
          disabled={isClockedIn}
          className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-colors ${
            isClockedIn
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-green-500 text-white hover:bg-green-600'
          }`}
        >
          <Plus className="w-5 h-5 inline mr-2" />
          Clock In
        </motion.button>
        
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleClockOut}
          disabled={!isClockedIn}
          className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-colors ${
            !isClockedIn
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-red-500 text-white hover:bg-red-600'
          }`}
        >
          <CheckCircle className="w-5 h-5 inline mr-2" />
          Clock Out
        </motion.button>
      </div>

      {/* Weekly Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-blue-50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">This Week</p>
              <p className="text-2xl font-bold text-blue-600">{totalHours.toFixed(1)} hrs</p>
            </div>
            <Calendar className="w-8 h-8 text-blue-500" />
          </div>
        </div>
        
        <div className="bg-green-50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Days Worked</p>
              <p className="text-2xl font-bold text-green-600">{attendanceHistory.length}</p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-500" />
          </div>
        </div>
        
        <div className="bg-orange-50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Avg. Daily</p>
              <p className="text-2xl font-bold text-orange-600">
                {attendanceHistory.length > 0 ? (totalHours / attendanceHistory.length).toFixed(1) : '0'} hrs
              </p>
            </div>
            <History className="w-8 h-8 text-orange-500" />
          </div>
        </div>
      </div>

      {/* Attendance History */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-800">Recent Activity</h3>
          <History className="w-5 h-5 text-gray-500" />
        </div>
        
        <div className="space-y-3">
          {attendanceHistory.slice(0, 5).map((entry, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
            >
              <div className="flex items-center space-x-3">
                <div className={`w-2 h-2 rounded-full ${
                  entry.status === 'completed' ? 'bg-green-500' : 
                  entry.status === 'in-progress' ? 'bg-yellow-500' : 'bg-red-500'
                }`}></div>
                <div>
                  <p className="font-medium text-gray-800">{entry.date}</p>
                  <p className="text-sm text-gray-600">
                    {entry.clockIn} - {entry.clockOut || 'In Progress'}
                  </p>
                </div>
              </div>
              
              <div className="text-right">
                <p className="font-semibold text-gray-800">{entry.total}</p>
                <p className={`text-xs ${
                  entry.status === 'completed' ? 'text-green-600' : 
                  entry.status === 'in-progress' ? 'text-yellow-600' : 'text-red-600'
                }`}>
                  {entry.status.charAt(0).toUpperCase() + entry.status.slice(1)}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default AttendanceTracker;