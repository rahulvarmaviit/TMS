import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  Clock, 
  Award, 
  Target, 
  Calendar,
  CheckCircle,
  AlertTriangle,
  TrendingDown
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

const PerformanceMetrics = ({ stats }) => {
  const [timeRange, setTimeRange] = useState('week');
  const [selectedMetric, setSelectedMetric] = useState('all');

  // Sample data for charts
  const weeklyProgressData = [
    { day: 'Mon', tasks: 2, completed: 1, hours: 4 },
    { day: 'Tue', tasks: 3, completed: 2, hours: 6 },
    { day: 'Wed', tasks: 1, completed: 1, hours: 3 },
    { day: 'Thu', tasks: 4, completed: 3, hours: 7 },
    { day: 'Fri', tasks: 2, completed: 1, hours: 4 },
    { day: 'Sat', tasks: 1, completed: 1, hours: 2 },
    { day: 'Sun', tasks: 0, completed: 0, hours: 0 }
  ];

  const monthlyProgressData = [
    { week: 'Week 1', tasks: 8, completed: 6, hours: 20 },
    { week: 'Week 2', tasks: 12, completed: 10, hours: 28 },
    { week: 'Week 3', tasks: 10, completed: 8, hours: 25 },
    { week: 'Week 4', tasks: 15, completed: 12, hours: 35 }
  ];

  const taskDistributionData = [
    { name: 'Development', value: 40, color: '#3B82F6' },
    { name: 'Learning', value: 25, color: '#10B981' },
    { name: 'Review', value: 20, color: '#F59E0B' },
    { name: 'Documentation', value: 15, color: '#8B5CF6' }
  ];

  const performanceTrends = [
    { metric: 'Task Completion Rate', current: 85, previous: 78, trend: 'up' },
    { metric: 'Average Time per Task', current: 2.5, previous: 3.2, trend: 'down', unit: 'hours' },
    { metric: 'Code Quality Score', current: 4.7, previous: 4.5, trend: 'up', unit: '/5' },
    { metric: 'Learning Hours', current: 15, previous: 12, trend: 'up', unit: 'hours' }
  ];

  const getChartData = () => {
    return timeRange === 'week' ? weeklyProgressData : monthlyProgressData;
  };

  const getTimeRangeLabel = () => {
    return timeRange === 'week' ? 'Daily' : 'Weekly';
  };

  const kpiCards = [
    {
      title: 'Task Completion Rate',
      value: '85%',
      change: '+8.5%',
      trend: 'up',
      icon: CheckCircle,
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      title: 'Average Task Time',
      value: '2.5h',
      change: '-12.5%',
      trend: 'down',
      icon: Clock,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      title: 'Quality Score',
      value: '4.7/5',
      change: '+0.2',
      trend: 'up',
      icon: Award,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    },
    {
      title: 'Learning Hours',
      value: '15h',
      change: '+25%',
      trend: 'up',
      icon: Target,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100'
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Performance Metrics</h2>
          <p className="text-gray-600">Track your progress and identify areas for improvement</p>
        </div>
        
        <div className="flex gap-2">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="quarter">This Quarter</option>
          </select>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpiCards.map((kpi, index) => (
          <motion.div
            key={kpi.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white p-6 rounded-lg shadow-sm border"
          >
            <div className="flex items-center">
              <div className={`p-3 rounded-lg ${kpi.bgColor}`}>
                <kpi.icon className={`h-6 w-6 ${kpi.color}`} />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">{kpi.title}</p>
                <p className="text-2xl font-bold text-gray-900">{kpi.value}</p>
                <p className={`text-sm ${kpi.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                  {kpi.trend === 'up' ? '↑' : '↓'} {kpi.change}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Task Progress Chart */}
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Task Progress ({getTimeRangeLabel()})
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={getChartData()}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey={timeRange === 'week' ? 'day' : 'week'} />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="tasks" stroke="#3B82F6" name="Assigned" strokeWidth={2} />
              <Line type="monotone" dataKey="completed" stroke="#10B981" name="Completed" strokeWidth={2} />
              <Line type="monotone" dataKey="hours" stroke="#F59E0B" name="Hours" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Task Distribution */}
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Task Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={taskDistributionData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {taskDistributionData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Performance Trends */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Trends</h3>
        <div className="space-y-4">
          {performanceTrends.map((trend, index) => (
            <div key={trend.metric} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${
                  trend.trend === 'up' ? 'bg-green-100' : 'bg-red-100'
                }`}>
                  {trend.trend === 'up' ? (
                    <TrendingUp className={`h-5 w-5 ${
                      trend.trend === 'up' ? 'text-green-600' : 'text-red-600'
                    }`} />
                  ) : (
                    <TrendingDown className="h-5 w-5 text-red-600" />
                  )}
                </div>
                <div>
                  <p className="font-medium text-gray-900">{trend.metric}</p>
                  <p className="text-sm text-gray-600">
                    Previous: {trend.previous}{trend.unit || ''}
                  </p>
                </div>
              </div>
              
              <div className="text-right">
                <p className="text-2xl font-bold text-gray-900">
                  {trend.current}{trend.unit || ''}
                </p>
                <p className={`text-sm font-medium ${
                  trend.trend === 'up' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {trend.trend === 'up' ? '+' : ''}
                  {trend.trend === 'up' ? 
                    ((trend.current - trend.previous) / trend.previous * 100).toFixed(1) + '%' :
                    ((trend.previous - trend.current) / trend.previous * 100).toFixed(1) + '%'
                  }
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Detailed Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h4 className="font-semibold text-gray-900 mb-3">Task Completion Rate</h4>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">This Week</span>
              <span className="text-sm font-medium">85%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Last Week</span>
              <span className="text-sm font-medium">78%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Target</span>
              <span className="text-sm font-medium text-green-600">90%</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h4 className="font-semibold text-gray-900 mb-3">Efficiency Metrics</h4>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Avg. Task Time</span>
              <span className="text-sm font-medium">2.5h</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">On-time Delivery</span>
              <span className="text-sm font-medium">92%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Quality Score</span>
              <span className="text-sm font-medium">4.7/5</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h4 className="font-semibold text-gray-900 mb-3">Learning Progress</h4>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Courses Completed</span>
              <span className="text-sm font-medium">3/5</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Learning Hours</span>
              <span className="text-sm font-medium">15h</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Skill Assessment</span>
              <span className="text-sm font-medium">85%</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default PerformanceMetrics;