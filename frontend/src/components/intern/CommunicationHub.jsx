import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, MessageCircle, Send, Bell, Calendar, Video, Phone, Search, Filter } from 'lucide-react';

const CommunicationHub = () => {
  const [activeTab, setActiveTab] = useState('discussions');
  const [newMessage, setNewMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const [discussions] = useState([
    {
      id: 1,
      title: 'Daily Standup - Sprint 3',
      description: 'Discuss progress on current sprint tasks and blockers',
      participants: 8,
      lastActivity: '2 hours ago',
      type: 'meeting',
      status: 'active'
    },
    {
      id: 2,
      title: 'Code Review Guidelines',
      description: 'Best practices for conducting effective code reviews',
      participants: 12,
      lastActivity: '5 hours ago',
      type: 'discussion',
      status: 'active'
    },
    {
      id: 3,
      title: 'Intern Welcome - New Team Members',
      description: 'Welcome our new interns and introduce them to the team',
      participants: 15,
      lastActivity: '1 day ago',
      type: 'announcement',
      status: 'active'
    }
  ]);

  const [messages] = useState([
    {
      id: 1,
      sender: 'Sarah Chen',
      avatar: '/api/placeholder/32/32',
      message: 'Great work on the API integration! The code looks clean and well-structured.',
      timestamp: '10:30 AM',
      type: 'mentor'
    },
    {
      id: 2,
      sender: 'Mike Rodriguez',
      avatar: '/api/placeholder/32/32',
      message: 'Let\'s sync up at 2 PM to discuss the database optimization approach.',
      timestamp: '9:45 AM',
      type: 'peer'
    },
    {
      id: 3,
      sender: 'You',
      avatar: '/api/placeholder/32/32',
      message: 'Thanks for the feedback! I\'ll implement the suggested changes.',
      timestamp: '9:30 AM',
      type: 'self'
    }
  ]);

  const [meetings] = useState([
    {
      id: 1,
      title: 'Weekly Team Sync',
      time: 'Today, 2:00 PM',
      duration: '30 min',
      type: 'team-meeting',
      participants: ['Sarah Chen', 'Mike Rodriguez', 'Emma Wilson'],
      link: 'meet.google.com/abc-123'
    },
    {
      id: 2,
      title: 'Intern Check-in',
      time: 'Tomorrow, 10:00 AM',
      duration: '15 min',
      type: 'one-on-one',
      participants: ['Sarah Chen'],
      link: 'meet.google.com/def-456'
    },
    {
      id: 3,
      title: 'Project Planning',
      time: 'Friday, 3:00 PM',
      duration: '45 min',
      type: 'planning',
      participants: ['Full Team'],
      link: 'meet.google.com/ghi-789'
    }
  ]);

  const [notifications] = useState([
    {
      id: 1,
      title: 'Meeting Reminder',
      description: 'Weekly team sync in 15 minutes',
      time: '15 min ago',
      type: 'meeting'
    },
    {
      id: 2,
      title: 'New Message',
      description: 'Sarah Chen sent you feedback on your latest PR',
      time: '1 hour ago',
      type: 'message'
    },
    {
      id: 3,
      title: 'Task Assignment',
      description: 'New bug fix task assigned to you',
      time: '2 hours ago',
      type: 'task'
    }
  ]);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // In a real app, this would send the message
      setNewMessage('');
    }
  };

  const getIconForType = (type) => {
    switch (type) {
      case 'meeting': return <Calendar className="w-4 h-4" />;
      case 'discussion': return <MessageCircle className="w-4 h-4" />;
      case 'announcement': return <Bell className="w-4 h-4" />;
      case 'one-on-one': return <Users className="w-4 h-4" />;
      case 'planning': return <Calendar className="w-4 h-4" />;
      default: return <MessageCircle className="w-4 h-4" />;
    }
  };

  const getColorForType = (type) => {
    switch (type) {
      case 'meeting': return 'bg-blue-100 text-blue-600';
      case 'discussion': return 'bg-green-100 text-green-600';
      case 'announcement': return 'bg-purple-100 text-purple-600';
      case 'one-on-one': return 'bg-orange-100 text-orange-600';
      case 'planning': return 'bg-indigo-100 text-indigo-600';
      default: return 'bg-gray-100 text-gray-600';
    }
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
          <h2 className="text-2xl font-bold text-gray-800">Communication Hub</h2>
          <p className="text-gray-600 mt-1">Connect with your team and stay updated</p>
        </div>
        <Users className="w-8 h-8 text-blue-600" />
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="-mb-px flex space-x-8">
          {[
            { id: 'discussions', label: 'Discussions', count: discussions.length },
            { id: 'messages', label: 'Messages', count: messages.length },
            { id: 'meetings', label: 'Meetings', count: meetings.length },
            { id: 'notifications', label: 'Notifications', count: notifications.length }
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
              <span className="ml-2 bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs">
                {tab.count}
              </span>
            </button>
          ))}
        </nav>
      </div>

      {/* Search and Filter */}
      <div className="flex items-center space-x-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search conversations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <button className="flex items-center px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50">
          <Filter className="w-4 h-4 mr-2" />
          Filter
        </button>
      </div>

      {/* Content based on active tab */}
      <div className="space-y-4">
        {activeTab === 'discussions' && (
          <div className="grid gap-4">
            {discussions.map((discussion) => (
              <motion.div
                key={discussion.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getColorForType(discussion.type)}`}>
                        {getIconForType(discussion.type)}
                        <span className="ml-1">{discussion.type}</span>
                      </span>
                      <span className="text-sm text-gray-500">
                        {discussion.participants} participants
                      </span>
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-1">{discussion.title}</h3>
                    <p className="text-sm text-gray-600">{discussion.description}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500">{discussion.lastActivity}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {activeTab === 'messages' && (
          <div className="space-y-4">
            <div className="border border-gray-200 rounded-lg p-4 max-h-96 overflow-y-auto">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, x: message.type === 'self' ? 20 : -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={`flex items-start space-x-3 mb-4 ${message.type === 'self' ? 'justify-end' : ''}`}
                >
                  {message.type !== 'self' && (
                    <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                      <span className="text-xs font-medium">{message.sender.charAt(0)}</span>
                    </div>
                  )}
                  <div className={`max-w-xs lg:max-w-md ${message.type === 'self' ? 'order-first' : ''}`}>
                    <div className={`rounded-lg px-4 py-2 ${message.type === 'self' ? 'bg-blue-500 text-white' : 'bg-gray-100'}`}>
                      <p className="text-sm">{message.message}</p>
                    </div>
                    <p className={`text-xs mt-1 ${message.type === 'self' ? 'text-right' : ''} text-gray-500`}>
                      {message.sender} • {message.timestamp}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <div className="flex space-x-2">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Type your message..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button
                onClick={handleSendMessage}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {activeTab === 'meetings' && (
          <div className="grid gap-4">
            {meetings.map((meeting) => (
              <motion.div
                key={meeting.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">{meeting.title}</h3>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <span className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        {meeting.time}
                      </span>
                      <span>{meeting.duration}</span>
                      <span>{meeting.participants.join(', ')}</span>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button className="flex items-center px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600">
                      <Video className="w-4 h-4 mr-1" />
                      Join
                    </button>
                    <button className="flex items-center px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50">
                      <Phone className="w-4 h-4 mr-1" />
                      Call
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {activeTab === 'notifications' && (
          <div className="space-y-3">
            {notifications.map((notification) => (
              <motion.div
                key={notification.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-start space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50"
              >
                <div className={`p-2 rounded-full ${getColorForType(notification.type)}`}>
                  {getIconForType(notification.type)}
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">{notification.title}</h4>
                  <p className="text-sm text-gray-600">{notification.description}</p>
                  <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default CommunicationHub;