import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Target, Trophy, Plus, Calendar, CheckCircle, Clock, TrendingUp, Edit2, Trash2 } from 'lucide-react';

const GoalsMilestones = () => {
  const [goals, setGoals] = useState([
    {
      id: 1,
      title: 'Complete React Fundamentals Course',
      description: 'Master the basics of React including hooks, state management, and component lifecycle',
      category: 'learning',
      progress: 75,
      targetDate: '2024-02-15',
      status: 'in-progress',
      milestones: [
        { id: 1, title: 'Complete React Basics', completed: true, date: '2024-01-10' },
        { id: 2, title: 'Master Hooks', completed: true, date: '2024-01-20' },
        { id: 3, title: 'Build First Project', completed: false, date: '2024-02-01' },
        { id: 4, title: 'Advanced Patterns', completed: false, date: '2024-02-15' }
      ]
    },
    {
      id: 2,
      title: 'Contribute to Open Source Project',
      description: 'Make at least 3 meaningful contributions to an open source project',
      category: 'career',
      progress: 33,
      targetDate: '2024-03-30',
      status: 'in-progress',
      milestones: [
        { id: 1, title: 'Find Suitable Project', completed: true, date: '2024-01-15' },
        { id: 2, title: 'First Contribution', completed: true, date: '2024-01-25' },
        { id: 3, title: 'Second Contribution', completed: false, date: '2024-02-28' },
        { id: 4, title: 'Third Contribution', completed: false, date: '2024-03-30' }
      ]
    },
    {
      id: 3,
      title: 'Improve Code Review Skills',
      description: 'Develop ability to provide constructive feedback during code reviews',
      category: 'skills',
      progress: 100,
      targetDate: '2024-01-30',
      status: 'completed',
      milestones: [
        { id: 1, title: 'Learn Review Guidelines', completed: true, date: '2024-01-05' },
        { id: 2, title: 'Practice on 5 PRs', completed: true, date: '2024-01-15' },
        { id: 3, title: 'Get Mentor Feedback', completed: true, date: '2024-01-25' }
      ]
    }
  ]);

  const [showAddGoal, setShowAddGoal] = useState(false);
  const [newGoal, setNewGoal] = useState({
    title: '',
    description: '',
    category: 'learning',
    targetDate: '',
    milestones: []
  });

  const [selectedGoal, setSelectedGoal] = useState(null);

  const categories = [
    { id: 'learning', label: 'Learning', color: 'bg-blue-100 text-blue-800' },
    { id: 'career', label: 'Career', color: 'bg-green-100 text-green-800' },
    { id: 'skills', label: 'Skills', color: 'bg-purple-100 text-purple-800' },
    { id: 'project', label: 'Project', color: 'bg-orange-100 text-orange-800' }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'in-progress': return 'bg-blue-100 text-blue-800';
      case 'not-started': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryColor = (category) => {
    return categories.find(cat => cat.id === category)?.color || 'bg-gray-100 text-gray-800';
  };

  const handleAddGoal = () => {
    if (newGoal.title && newGoal.targetDate) {
      const goal = {
        id: goals.length + 1,
        ...newGoal,
        progress: 0,
        status: 'not-started',
        milestones: newGoal.milestones.filter(m => m.title.trim() !== '')
      };
      setGoals([...goals, goal]);
      setNewGoal({ title: '', description: '', category: 'learning', targetDate: '', milestones: [] });
      setShowAddGoal(false);
    }
  };

  const handleUpdateProgress = (goalId, newProgress) => {
    setGoals(goals.map(goal => {
      if (goal.id === goalId) {
        const updatedGoal = { ...goal, progress: newProgress };
        if (newProgress === 100) {
          updatedGoal.status = 'completed';
        } else if (newProgress > 0) {
          updatedGoal.status = 'in-progress';
        }
        return updatedGoal;
      }
      return goal;
    }));
  };

  const handleToggleMilestone = (goalId, milestoneId) => {
    setGoals(goals.map(goal => {
      if (goal.id === goalId) {
        const updatedMilestones = goal.milestones.map(milestone => {
          if (milestone.id === milestoneId) {
            return { ...milestone, completed: !milestone.completed };
          }
          return milestone;
        });
        
        const completedMilestones = updatedMilestones.filter(m => m.completed).length;
        const newProgress = Math.round((completedMilestones / updatedMilestones.length) * 100);
        
        return {
          ...goal,
          milestones: updatedMilestones,
          progress: newProgress
        };
      }
      return goal;
    }));
  };

  const getDaysRemaining = (targetDate) => {
    const today = new Date();
    const target = new Date(targetDate);
    const diffTime = target - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const stats = {
    totalGoals: goals.length,
    completedGoals: goals.filter(g => g.status === 'completed').length,
    inProgressGoals: goals.filter(g => g.status === 'in-progress').length,
    averageProgress: Math.round(goals.reduce((sum, goal) => sum + goal.progress, 0) / goals.length)
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
          <h2 className="text-2xl font-bold text-gray-800">Goals & Milestones</h2>
          <p className="text-gray-600 mt-1">Track your personal and professional development goals</p>
        </div>
        <Trophy className="w-8 h-8 text-yellow-600" />
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-blue-50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Goals</p>
              <p className="text-2xl font-bold text-blue-600">{stats.totalGoals}</p>
            </div>
            <Target className="w-8 h-8 text-blue-500" />
          </div>
        </div>
        
        <div className="bg-green-50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Completed</p>
              <p className="text-2xl font-bold text-green-600">{stats.completedGoals}</p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-500" />
          </div>
        </div>
        
        <div className="bg-orange-50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">In Progress</p>
              <p className="text-2xl font-bold text-orange-600">{stats.inProgressGoals}</p>
            </div>
            <Clock className="w-8 h-8 text-orange-500" />
          </div>
        </div>
        
        <div className="bg-purple-50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Avg Progress</p>
              <p className="text-2xl font-bold text-purple-600">{stats.averageProgress}%</p>
            </div>
            <TrendingUp className="w-8 h-8 text-purple-500" />
          </div>
        </div>
      </div>

      {/* Add Goal Button */}
      <div className="flex justify-end mb-6">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setShowAddGoal(true)}
          className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add New Goal
        </motion.button>
      </div>

      {/* Goals List */}
      <div className="space-y-6">
        {goals.map((goal) => (
          <motion.div
            key={goal.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(goal.category)}`}>
                    {categories.find(cat => cat.id === goal.category)?.label}
                  </span>
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(goal.status)}`}>
                    {goal.status.replace('-', ' ')}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">{goal.title}</h3>
                <p className="text-sm text-gray-600 mb-3">{goal.description}</p>
                
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <span className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    Due: {new Date(goal.targetDate).toLocaleDateString()}
                  </span>
                  <span className={`${getDaysRemaining(goal.targetDate) < 7 ? 'text-red-600' : ''}`}>
                    {getDaysRemaining(goal.targetDate)} days left
                  </span>
                </div>
              </div>
              
              <div className="flex space-x-2">
                <button className="p-2 text-gray-400 hover:text-gray-600">
                  <Edit2 className="w-4 h-4" />
                </button>
                <button className="p-2 text-gray-400 hover:text-red-600">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mb-4">
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600">Progress</span>
                <span className="font-medium">{goal.progress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${goal.progress}%` }}
                ></div>
              </div>
            </div>

            {/* Milestones */}
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2">Milestones</h4>
              <div className="space-y-2">
                {goal.milestones.map((milestone) => (
                  <div key={milestone.id} className="flex items-center space-x-3">
                    <button
                      onClick={() => handleToggleMilestone(goal.id, milestone.id)}
                      className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                        milestone.completed
                          ? 'bg-green-500 border-green-500'
                          : 'border-gray-300 hover:border-green-500'
                      }`}
                    >
                      {milestone.completed && <CheckCircle className="w-3 h-3 text-white" />}
                    </button>
                    <span className={`text-sm ${milestone.completed ? 'text-gray-500 line-through' : 'text-gray-700'}`}>
                      {milestone.title}
                    </span>
                    {milestone.date && (
                      <span className="text-xs text-gray-500">
                        Due: {new Date(milestone.date).toLocaleDateString()}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Add Goal Modal */}
      {showAddGoal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={() => setShowAddGoal(false)}
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            className="bg-white rounded-lg p-6 w-full max-w-md"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-lg font-semibold mb-4">Add New Goal</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <input
                  type="text"
                  value={newGoal.title}
                  onChange={(e) => setNewGoal({ ...newGoal, title: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  value={newGoal.description}
                  onChange={(e) => setNewGoal({ ...newGoal, description: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={3}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select
                  value={newGoal.category}
                  onChange={(e) => setNewGoal({ ...newGoal, category: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {categories.map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Target Date</label>
                <input
                  type="date"
                  value={newGoal.targetDate}
                  onChange={(e) => setNewGoal({ ...newGoal, targetDate: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div className="flex justify-end space-x-2 mt-6">
              <button
                onClick={() => setShowAddGoal(false)}
                className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleAddGoal}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                Add Goal
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default GoalsMilestones;