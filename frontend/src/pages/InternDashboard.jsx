import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Clock, 
  Calendar, 
  Target, 
  BookOpen, 
  MessageCircle, 
  User, 
  Settings, 
  FileText,
  TrendingUp,
  Award,
  CheckCircle,
  Clock3,
  AlertCircle,
  Users,
  Bell
} from 'lucide-react';
import TaskOverview from '../components/intern/TaskOverview';
import PerformanceMetrics from '../components/intern/PerformanceMetrics';
import FeedbackSection from '../components/intern/FeedbackSection';
import LearningResources from '../components/intern/LearningResources';
import AttendanceTracker from '../components/intern/AttendanceTracker';
import CommunicationHub from '../components/intern/CommunicationHub';
import GoalsMilestones from '../components/intern/GoalsMilestones';
import ProfileSettings from '../components/intern/ProfileSettings';
import ReportGenerator from '../components/intern/ReportGenerator';

const InternDashboard = () => {
  const [activeSection, setActiveSection] = useState('overview');
  const [user, setUser] = useState({
    name: 'Alex Johnson',
    role: 'Software Development Intern',
    department: 'Engineering',
    startDate: '2024-01-15',
    avatar: '/api/placeholder/32/32'
  });

  const [stats, setStats] = useState({
    totalTasks: 12,
    completedTasks: 8,
    pendingTasks: 3,
    inProgressTasks: 1,
    attendanceRate: 95,
    avgTaskCompletionTime: 2.5,
    feedbackScore: 4.7,
    learningHours: 15
  });

  const navigationItems = [
    { id: 'overview', label: 'Task Overview', icon: Target },
    { id: 'performance', label: 'Performance', icon: TrendingUp },
    { id: 'feedback', label: 'Feedback', icon: Award },
    { id: 'learning', label: 'Learning', icon: BookOpen },
    { id: 'attendance', label: 'Attendance', icon: Clock },
    { id: 'communication', label: 'Team Hub', icon: Users },
    { id: 'goals', label: 'Goals', icon: CheckCircle },
    { id: 'reports', label: 'Reports', icon: FileText },
    { id: 'profile', label: 'Profile', icon: User }
  ];

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'overview':
        return <TaskOverview stats={stats} />;
      case 'performance':
        return <PerformanceMetrics stats={stats} />;
      case 'feedback':
        return <FeedbackSection />;
      case 'learning':
        return <LearningResources />;
      case 'attendance':
        return <AttendanceTracker />;
      case 'communication':
        return <CommunicationHub />;
      case 'goals':
        return <GoalsMilestones />;
      case 'reports':
        return <ReportGenerator />;
      case 'profile':
        return <ProfileSettings user={user} />;
      default:
        return <TaskOverview stats={stats} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-50 relative">
      {/* Decorative background shapes */}
      <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-300 opacity-30 blur-2xl z-0" />
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-lg shadow-lg border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center gap-3">
              <div className="flex-shrink-0">
                <h1 className="text-2xl font-extrabold text-indigo-700 tracking-tight drop-shadow">🌟 Intern Dashboard</h1>
              </div>
              <span className="px-2 py-1 rounded bg-indigo-100 text-indigo-700 text-xs font-semibold ml-2">Beta</span>
            </div>
            <div className="flex items-center space-x-4">
              <button className="p-2 text-indigo-400 hover:text-indigo-600 transition">
                <Bell className="h-6 w-6" />
              </button>
              <div className="flex items-center space-x-3">
                <div className="text-right">
                  <p className="text-base font-bold text-indigo-900">{user.name}</p>
                  <p className="text-xs text-indigo-500">{user.role}</p>
                </div>
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center shadow-lg border-2 border-white">
                  <span className="text-white text-lg font-bold">
                    {user.name.charAt(0)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar Navigation */}
        <aside className="w-64 bg-white/80 backdrop-blur-lg shadow-xl min-h-screen border-r border-gray-200 z-10 relative">
          <nav className="mt-8 px-4">
            <div className="space-y-2">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveSection(item.id)}
                    className={`w-full flex items-center px-4 py-3 text-base font-semibold rounded-xl transition-all duration-200 shadow-sm ${
                      activeSection === item.id
                        ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg scale-105'
                        : 'text-indigo-700 bg-white hover:bg-indigo-50 hover:scale-105'
                    }`}
                    style={{ boxShadow: activeSection === item.id ? '0 4px 24px rgba(99,102,241,0.15)' : undefined }}
                  >
                    <Icon className="mr-3 h-6 w-6" />
                    {item.label}
                  </button>
                );
              })}
            </div>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8 relative z-10">
          <div className="max-w-7xl mx-auto">
            {/* Welcome Banner */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-400 rounded-2xl shadow-2xl p-8 mb-8 text-white relative overflow-hidden"
              style={{ boxShadow: '0 8px 32px rgba(99,102,241,0.18)' }}
            >
              <div className="absolute right-0 top-0 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
              <h2 className="text-3xl font-extrabold mb-2 drop-shadow-lg">Welcome back, {user.name}!</h2>
              <p className="text-indigo-100 text-lg font-medium">
                You're making great progress in your <span className="font-bold text-white">{user.role}</span>. Keep up the excellent work!
              </p>
            </motion.div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className="bg-white/90 backdrop-blur-lg p-6 rounded-2xl shadow-xl flex items-center gap-4 border border-indigo-100">
                <div className="p-3 bg-green-100 rounded-xl shadow">
                  <CheckCircle className="h-7 w-7 text-green-600" />
                </div>
                <div>
                  <p className="text-base font-semibold text-gray-600">Completed Tasks</p>
                  <p className="text-3xl font-extrabold text-indigo-900">{stats.completedTasks}</p>
                </div>
              </div>

              <div className="bg-white/90 backdrop-blur-lg p-6 rounded-2xl shadow-xl flex items-center gap-4 border border-yellow-100">
                <div className="p-3 bg-yellow-100 rounded-xl shadow">
                  <Clock3 className="h-7 w-7 text-yellow-600" />
                </div>
                <div>
                  <p className="text-base font-semibold text-gray-600">Pending Tasks</p>
                  <p className="text-3xl font-extrabold text-indigo-900">{stats.pendingTasks}</p>
                </div>
              </div>

              <div className="bg-white/90 backdrop-blur-lg p-6 rounded-2xl shadow-xl flex items-center gap-4 border border-blue-100">
                <div className="p-3 bg-blue-100 rounded-xl shadow">
                  <TrendingUp className="h-7 w-7 text-blue-600" />
                </div>
                <div>
                  <p className="text-base font-semibold text-gray-600">Attendance</p>
                  <p className="text-3xl font-extrabold text-indigo-900">{stats.attendanceRate}%</p>
                </div>
              </div>

              <div className="bg-white/90 backdrop-blur-lg p-6 rounded-2xl shadow-xl flex items-center gap-4 border border-purple-100">
                <div className="p-3 bg-purple-100 rounded-xl shadow">
                  <Award className="h-7 w-7 text-purple-600" />
                </div>
                <div>
                  <p className="text-base font-semibold text-gray-600">Feedback Score</p>
                  <p className="text-3xl font-extrabold text-indigo-900">{stats.feedbackScore}/5</p>
                </div>
              </div>
            </div>

            {/* Active Section */}
            <div className="rounded-2xl bg-white/80 backdrop-blur-lg shadow-xl p-6">
              {renderActiveSection()}
            </div>
          </div>
        </main>
      </div>
      {/* Decorative bottom shape */}
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-br from-pink-300 via-purple-300 to-indigo-300 opacity-20 blur-3xl z-0" />
    </div>
  );
};

export default InternDashboard;
