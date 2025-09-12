import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Award, MessageCircle, Send, Star, User, Calendar, TrendingUp, Plus } from 'lucide-react';

const FeedbackSection = () => {
  const [activeTab, setActiveTab] = useState('received');
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);
  const [newFeedback, setNewFeedback] = useState({
    recipient: '',
    type: 'peer',
    rating: 5,
    comment: '',
    areas: []
  });

  const [receivedFeedback] = useState([
    {
      id: 1,
      from: 'Sarah Chen',
      role: 'Senior Developer / Mentor',
      avatar: '/api/placeholder/48/48',
      rating: 5,
      comment: 'Excellent progress on React fundamentals! Your component structure is clean and follows best practices. Keep focusing on state management patterns.',
      date: '2024-01-20',
      type: 'mentor',
      areas: ['Technical Skills', 'Code Quality', 'Learning Speed'],
      actionable: [
        'Continue practicing custom hooks',
        'Explore advanced state management with Redux',
        'Work on error handling patterns'
      ]
    },
    {
      id: 2,
      from: 'Mike Rodriguez',
      role: 'Team Lead',
      avatar: '/api/placeholder/48/48',
      rating: 4,
      comment: 'Great collaboration on the API integration project. Your communication skills have improved significantly.',
      date: '2024-01-18',
      type: 'supervisor',
      areas: ['Communication', 'Teamwork', 'Problem Solving'],
      actionable: [
        'Take more initiative in team discussions',
        'Share your learning with junior interns'
      ]
    },
    {
      id: 3,
      from: 'Emma Wilson',
      role: 'Peer Intern',
      avatar: '/api/placeholder/48/48',
      rating: 5,
      comment: 'Amazing help with debugging! You explained complex concepts in a simple way.',
      date: '2024-01-15',
      type: 'peer',
      areas: ['Knowledge Sharing', 'Patience', 'Technical Skills']
    }
  ]);

  const [givenFeedback] = useState([
    {
      id: 1,
      to: 'David Kim',
      role: 'Peer Intern',
      rating: 4,
      comment: 'Good work on the database design. Consider adding more validation rules.',
      date: '2024-01-19',
      type: 'peer'
    }
  ]);

  const [performanceReview] = useState({
    overall: 4.6,
    breakdown: {
      'Technical Skills': 4.7,
      'Communication': 4.5,
      'Teamwork': 4.8,
      'Problem Solving': 4.4,
      'Learning Speed': 4.8,
      'Code Quality': 4.6
    },
    trend: [
      { month: 'Oct', score: 4.2 },
      { month: 'Nov', score: 4.4 },
      { month: 'Dec', score: 4.5 },
      { month: 'Jan', score: 4.6 }
    ]
  });

  const feedbackAreas = [
    'Technical Skills',
    'Communication',
    'Teamwork',
    'Problem Solving',
    'Code Quality',
    'Learning Speed',
    'Time Management',
    'Initiative'
  ];

  const handleSubmitFeedback = () => {
    if (newFeedback.recipient && newFeedback.comment) {
      // In a real app, this would submit the feedback
      console.log('Submitting feedback:', newFeedback);
      setShowFeedbackForm(false);
      setNewFeedback({ recipient: '', type: 'peer', rating: 5, comment: '', areas: [] });
    }
  };

  const handleAreaToggle = (area) => {
    setNewFeedback(prev => ({
      ...prev,
      areas: prev.areas.includes(area)
        ? prev.areas.filter(a => a !== area)
        : [...prev.areas, area]
    }));
  };

  const getRatingColor = (rating) => {
    if (rating >= 4.5) return 'text-green-600';
    if (rating >= 4.0) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getRatingStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ));
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
          <h2 className="text-2xl font-bold text-gray-800">Feedback & Appraisals</h2>
          <p className="text-gray-600 mt-1">Track feedback from mentors, supervisors, and peers</p>
        </div>
        <Award className="w-8 h-8 text-yellow-600" />
      </div>

      {/* Performance Overview */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6 mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Performance Overview</h3>
            <div className="flex items-center space-x-2">
              <span className="text-3xl font-bold text-blue-600">{performanceReview.overall}</span>
              <span className="text-gray-600">/ 5.0</span>
              <div className="flex ml-2">{getRatingStars(Math.round(performanceReview.overall))}</div>
            </div>
            <p className="text-sm text-gray-600 mt-1">Based on 15 reviews</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-center">
              <TrendingUp className="w-8 h-8 text-green-500 mx-auto mb-1" />
              <p className="text-xs text-gray-600">Improving</p>
            </div>
          </div>
        </div>

        {/* Performance Breakdown */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
          {Object.entries(performanceReview.breakdown).map(([area, score]) => (
            <div key={area} className="text-center">
              <p className="text-sm font-medium text-gray-700">{area}</p>
              <p className={`text-lg font-bold ${getRatingColor(score)}`}>{score}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="-mb-px flex space-x-8">
          {[
            { id: 'received', label: 'Received', count: receivedFeedback.length },
            { id: 'given', label: 'Given', count: givenFeedback.length },
            { id: 'request', label: 'Request Feedback' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab.label}
              {tab.count && (
                <span className="ml-2 bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs">
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </nav>
      </div>

      {/* Content based on active tab */}
      <div className="space-y-4">
        {activeTab === 'received' && (
          <div className="space-y-4">
            {receivedFeedback.map((feedback) => (
              <motion.div
                key={feedback.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">
                    <User className="w-6 h-6 text-gray-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <h4 className="font-semibold text-gray-900">{feedback.from}</h4>
                        <p className="text-sm text-gray-600">{feedback.role}</p>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center space-x-1">
                          {getRatingStars(feedback.rating)}
                          <span className="text-sm text-gray-600 ml-1">{feedback.rating}/5</span>
                        </div>
                        <p className="text-xs text-gray-500">{feedback.date}</p>
                      </div>
                    </div>
                    
                    <p className="text-gray-700 mb-3">{feedback.comment}</p>
                    
                    <div className="flex flex-wrap gap-2 mb-3">
                      {feedback.areas.map((area, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                        >
                          {area}
                        </span>
                      ))}
                    </div>

                    {feedback.actionable && (
                      <div className="bg-gray-50 rounded-lg p-3">
                        <p className="text-sm font-medium text-gray-700 mb-1">Action Items:</p>
                        <ul className="text-sm text-gray-600 space-y-1">
                          {feedback.actionable.map((action, index) => (
                            <li key={index} className="flex items-start">
                              <span className="text-blue-500 mr-2">•</span>
                              {action}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {activeTab === 'given' && (
          <div className="space-y-4">
            {givenFeedback.map((feedback) => (
              <motion.div
                key={feedback.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="border border-gray-200 rounded-lg p-4"
              >
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <h4 className="font-semibold text-gray-900">To: {feedback.to}</h4>
                    <p className="text-sm text-gray-600">{feedback.role}</p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center space-x-1">
                      {getRatingStars(feedback.rating)}
                      <span className="text-sm text-gray-600 ml-1">{feedback.rating}/5</span>
                    </div>
                    <p className="text-xs text-gray-500">{feedback.date}</p>
                  </div>
                </div>
                <p className="text-gray-700">{feedback.comment}</p>
              </motion.div>
            ))}
          </div>
        )}

        {activeTab === 'request' && (
          <div className="text-center py-8">
            <MessageCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Request Feedback</h3>
            <p className="text-gray-600 mb-4">
              Ask for feedback from your mentor, supervisor, or peers to improve your performance.
            </p>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setShowFeedbackForm(true)}
              className="inline-flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              <Plus className="w-4 h-4 mr-2" />
              Give Feedback
            </motion.button>
          </div>
        )}
      </div>

      {/* Feedback Form Modal */}
      {showFeedbackForm && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={() => setShowFeedbackForm(false)}
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            className="bg-white rounded-lg p-6 w-full max-w-md"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-lg font-semibold mb-4">Provide Feedback</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Recipient</label>
                <select
                  value={newFeedback.recipient}
                  onChange={(e) => setNewFeedback({ ...newFeedback, recipient: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select recipient</option>
                  <option value="Sarah Chen">Sarah Chen (Mentor)</option>
                  <option value="Mike Rodriguez">Mike Rodriguez (Supervisor)</option>
                  <option value="Emma Wilson">Emma Wilson (Peer)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Rating</label>
                <div className="flex space-x-1">
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <button
                      key={rating}
                      onClick={() => setNewFeedback({ ...newFeedback, rating })}
                      className="p-1"
                    >
                      <Star
                        className={`w-6 h-6 ${rating <= newFeedback.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Areas</label>
                <div className="grid grid-cols-2 gap-2">
                  {feedbackAreas.map((area) => (
                    <label key={area} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={newFeedback.areas.includes(area)}
                        onChange={() => handleAreaToggle(area)}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="ml-2 text-sm">{area}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Comment</label>
                <textarea
                  value={newFeedback.comment}
                  onChange={(e) => setNewFeedback({ ...newFeedback, comment: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={4}
                  placeholder="Provide constructive feedback..."
                />
              </div>
            </div>

            <div className="flex justify-end space-x-2 mt-6">
              <button
                onClick={() => setShowFeedbackForm(false)}
                className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmitFeedback}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                Submit Feedback
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default FeedbackSection;