import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Phone, MapPin, Calendar, Shield, Bell, Lock, Camera, Edit3, Save, X } from 'lucide-react';

const ProfileSettings = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    firstName: 'Alex',
    lastName: 'Johnson',
    email: 'alex.johnson@company.com',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    department: 'Engineering',
    position: 'Software Development Intern',
    startDate: '2024-01-15',
    bio: 'Passionate about full-stack development and learning new technologies. Currently focusing on React and Node.js.',
    skills: ['React', 'JavaScript', 'Node.js', 'MongoDB', 'Git', 'Express.js'],
    interests: ['Machine Learning', 'UI/UX Design', 'Cloud Computing'],
    avatar: '/api/placeholder/100/100'
  });

  const [notifications, setNotifications] = useState({
    taskUpdates: true,
    feedback: true,
    meetings: true,
    deadlines: true,
    learning: false,
    email: true,
    push: false
  });

  const [security, setSecurity] = useState({
    twoFactor: false,
    passwordLastChanged: '2024-01-15',
    lastLogin: '2024-01-20 09:30 AM',
    sessions: [
      { device: 'MacBook Pro', browser: 'Chrome', location: 'San Francisco, CA', time: '2024-01-20 09:30 AM', active: true },
      { device: 'iPhone 14', browser: 'Safari', location: 'San Francisco, CA', time: '2024-01-19 08:15 PM', active: false }
    ]
  });

  const [editedData, setEditedData] = useState(profileData);

  const handleSave = () => {
    setProfileData(editedData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedData(profileData);
    setIsEditing(false);
  };

  const handleSkillAdd = (skill) => {
    if (skill && !editedData.skills.includes(skill)) {
      setEditedData({
        ...editedData,
        skills: [...editedData.skills, skill]
      });
    }
  };

  const handleSkillRemove = (skillToRemove) => {
    setEditedData({
      ...editedData,
      skills: editedData.skills.filter(skill => skill !== skillToRemove)
    });
  };

  const handleInterestAdd = (interest) => {
    if (interest && !editedData.interests.includes(interest)) {
      setEditedData({
        ...editedData,
        interests: [...editedData.interests, interest]
      });
    }
  };

  const handleInterestRemove = (interestToRemove) => {
    setEditedData({
      ...editedData,
      interests: editedData.interests.filter(interest => interest !== interestToRemove)
    });
  };

  const handleNotificationChange = (key, value) => {
    setNotifications({
      ...notifications,
      [key]: value
    });
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditedData({
          ...editedData,
          avatar: reader.result
        });
      };
      reader.readAsDataURL(file);
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
          <h2 className="text-2xl font-bold text-gray-800">Profile & Settings</h2>
          <p className="text-gray-600 mt-1">Manage your profile and account preferences</p>
        </div>
        <User className="w-8 h-8 text-blue-600" />
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="-mb-px flex space-x-8">
          {[
            { id: 'profile', label: 'Profile', icon: User },
            { id: 'notifications', label: 'Notifications', icon: Bell },
            { id: 'security', label: 'Security', icon: Shield }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Profile Tab */}
      {activeTab === 'profile' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-800">Personal Information</h3>
            {!isEditing && (
              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                <Edit3 className="w-4 h-4 mr-2" />
                Edit Profile
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Avatar Section */}
            <div className="lg:col-span-1">
              <div className="bg-gray-50 rounded-lg p-6">
                <div className="text-center">
                  <div className="relative inline-block">
                    <img
                      src={isEditing ? editedData.avatar : profileData.avatar}
                      alt="Profile"
                      className="w-32 h-32 rounded-full mx-auto mb-4"
                    />
                    {isEditing && (
                      <label className="absolute bottom-0 right-0 bg-blue-500 text-white p-2 rounded-full cursor-pointer hover:bg-blue-600">
                        <Camera className="w-4 h-4" />
                        <input
                          type="file"
                          className="hidden"
                          accept="image/*"
                          onChange={handleFileUpload}
                        />
                      </label>
                    )}
                  </div>
                  <h4 className="text-lg font-semibold text-gray-800">
                    {isEditing ? editedData.firstName : profileData.firstName} {isEditing ? editedData.lastName : profileData.lastName}
                  </h4>
                  <p className="text-gray-600">{isEditing ? editedData.position : profileData.position}</p>
                  <p className="text-sm text-gray-500">{isEditing ? editedData.department : profileData.department}</p>
                </div>
              </div>

              {/* Skills */}
              <div className="mt-6">
                <h4 className="font-semibold text-gray-800 mb-3">Skills</h4>
                <div className="flex flex-wrap gap-2">
                  {(isEditing ? editedData.skills : profileData.skills).map((skill, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
                    >
                      {skill}
                      {isEditing && (
                        <button
                          onClick={() => handleSkillRemove(skill)}
                          className="ml-2 text-blue-600 hover:text-blue-800"
                        >
                          ×
                        </button>
                      )}
                    </span>
                  ))}
                  {isEditing && (
                    <input
                      type="text"
                      placeholder="Add skill..."
                      className="px-3 py-1 border border-gray-300 rounded-full text-sm"
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          handleSkillAdd(e.target.value);
                          e.target.value = '';
                        }
                      }}
                    />
                  )}
                </div>
              </div>

              {/* Interests */}
              <div className="mt-6">
                <h4 className="font-semibold text-gray-800 mb-3">Interests</h4>
                <div className="flex flex-wrap gap-2">
                  {(isEditing ? editedData.interests : profileData.interests).map((interest, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full"
                    >
                      {interest}
                      {isEditing && (
                        <button
                          onClick={() => handleInterestRemove(interest)}
                          className="ml-2 text-green-600 hover:text-green-800"
                        >
                          ×
                        </button>
                      )}
                    </span>
                  ))}
                  {isEditing && (
                    <input
                      type="text"
                      placeholder="Add interest..."
                      className="px-3 py-1 border border-gray-300 rounded-full text-sm"
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          handleInterestAdd(e.target.value);
                          e.target.value = '';
                        }
                      }}
                    />
                  )}
                </div>
              </div>
            </div>

            {/* Profile Details */}
            <div className="lg:col-span-2">
              <div className="bg-gray-50 rounded-lg p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                    <input
                      type="text"
                      value={isEditing ? editedData.firstName : profileData.firstName}
                      onChange={(e) => setEditedData({ ...editedData, firstName: e.target.value })}
                      disabled={!isEditing}
                      className={`w-full px-3 py-2 border rounded-lg ${isEditing ? 'border-gray-300' : 'border-transparent bg-transparent'}`}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                    <input
                      type="text"
                      value={isEditing ? editedData.lastName : profileData.lastName}
                      onChange={(e) => setEditedData({ ...editedData, lastName: e.target.value })}
                      disabled={!isEditing}
                      className={`w-full px-3 py-2 border rounded-lg ${isEditing ? 'border-gray-300' : 'border-transparent bg-transparent'}`}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <div className="flex items-center">
                      <Mail className="w-4 h-4 text-gray-400 mr-2" />
                      <input
                        type="email"
                        value={isEditing ? editedData.email : profileData.email}
                        onChange={(e) => setEditedData({ ...editedData, email: e.target.value })}
                        disabled={!isEditing}
                        className={`w-full px-3 py-2 border rounded-lg ${isEditing ? 'border-gray-300' : 'border-transparent bg-transparent'}`}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                    <div className="flex items-center">
                      <Phone className="w-4 h-4 text-gray-400 mr-2" />
                      <input
                        type="tel"
                        value={isEditing ? editedData.phone : profileData.phone}
                        onChange={(e) => setEditedData({ ...editedData, phone: e.target.value })}
                        disabled={!isEditing}
                        className={`w-full px-3 py-2 border rounded-lg ${isEditing ? 'border-gray-300' : 'border-transparent bg-transparent'}`}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 text-gray-400 mr-2" />
                      <input
                        type="text"
                        value={isEditing ? editedData.location : profileData.location}
                        onChange={(e) => setEditedData({ ...editedData, location: e.target.value })}
                        disabled={!isEditing}
                        className={`w-full px-3 py-2 border rounded-lg ${isEditing ? 'border-gray-300' : 'border-transparent bg-transparent'}`}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 text-gray-400 mr-2" />
                      <input
                        type="date"
                        value={isEditing ? editedData.startDate : profileData.startDate}
                        onChange={(e) => setEditedData({ ...editedData, startDate: e.target.value })}
                        disabled={!isEditing}
                        className={`w-full px-3 py-2 border rounded-lg ${isEditing ? 'border-gray-300' : 'border-transparent bg-transparent'}`}
                      />
                    </div>
                  </div>
                </div>
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
                  <textarea
                    value={isEditing ? editedData.bio : profileData.bio}
                    onChange={(e) => setEditedData({ ...editedData, bio: e.target.value })}
                    disabled={!isEditing}
                    rows={4}
                    className={`w-full px-3 py-2 border rounded-lg ${isEditing ? 'border-gray-300' : 'border-transparent bg-transparent'}`}
                  />
                </div>

                {isEditing && (
                  <div className="flex justify-end space-x-3 mt-6">
                    <button
                      onClick={handleCancel}
                      className="flex items-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                    >
                      <X className="w-4 h-4 mr-2" />
                      Cancel
                    </button>
                    <button
                      onClick={handleSave}
                      className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                    >
                      <Save className="w-4 h-4 mr-2" />
                      Save Changes
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Notifications Tab */}
      {activeTab === 'notifications' && (
        <div className="space-y-6">
          <h3 className="text-lg font-semibold text-gray-800">Notification Preferences</h3>
          
          <div className="bg-gray-50 rounded-lg p-6">
            <div className="space-y-6">
              <div>
                <h4 className="font-medium text-gray-800 mb-4">Task & Work Updates</h4>
                <div className="space-y-3">
                  {[
                    { key: 'taskUpdates', label: 'Task assignments and updates' },
                    { key: 'deadlines', label: 'Upcoming deadlines and reminders' },
                    { key: 'feedback', label: 'New feedback and reviews' }
                  ].map(({ key, label }) => (
                    <label key={key} className="flex items-center justify-between">
                      <span className="text-gray-700">{label}</span>
                      <input
                        type="checkbox"
                        checked={notifications[key]}
                        onChange={(e) => handleNotificationChange(key, e.target.checked)}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-medium text-gray-800 mb-4">Communication</h4>
                <div className="space-y-3">
                  {[
                    { key: 'meetings', label: 'Meeting invitations and updates' },
                    { key: 'learning', label: 'Learning resource recommendations' }
                  ].map(({ key, label }) => (
                    <label key={key} className="flex items-center justify-between">
                      <span className="text-gray-700">{label}</span>
                      <input
                        type="checkbox"
                        checked={notifications[key]}
                        onChange={(e) => handleNotificationChange(key, e.target.checked)}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-medium text-gray-800 mb-4">Delivery Methods</h4>
                <div className="space-y-3">
                  {[
                    { key: 'email', label: 'Email notifications' },
                    { key: 'push', label: 'Push notifications' }
                  ].map(({ key, label }) => (
                    <label key={key} className="flex items-center justify-between">
                      <span className="text-gray-700">{label}</span>
                      <input
                        type="checkbox"
                        checked={notifications[key]}
                        onChange={(e) => handleNotificationChange(key, e.target.checked)}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Security Tab */}
      {activeTab === 'security' && (
        <div className="space-y-6">
          <h3 className="text-lg font-semibold text-gray-800">Security Settings</h3>
          
          <div className="bg-gray-50 rounded-lg p-6">
            <div className="space-y-6">
              <div>
                <h4 className="font-medium text-gray-800 mb-4">Account Security</h4>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-white rounded-lg">
                    <div>
                      <p className="font-medium text-gray-800">Two-Factor Authentication</p>
                      <p className="text-sm text-gray-600">Add an extra layer of security to your account</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={security.twoFactor}
                        onChange={(e) => setSecurity({ ...security, twoFactor: e.target.checked })}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-white rounded-lg">
                    <div>
                      <p className="font-medium text-gray-800">Change Password</p>
                      <p className="text-sm text-gray-600">Last changed: {security.passwordLastChanged}</p>
                    </div>
                    <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                      Change
                    </button>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-medium text-gray-800 mb-4">Recent Activity</h4>
                <div className="space-y-3">
                  <div className="p-4 bg-white rounded-lg">
                    <p className="font-medium text-gray-800">Last Login</p>
                    <p className="text-sm text-gray-600">{security.lastLogin}</p>
                  </div>

                  <div>
                    <p className="font-medium text-gray-800 mb-2">Active Sessions</p>
                    <div className="space-y-2">
                      {security.sessions.map((session, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-white rounded-lg">
                          <div>
                            <p className="font-medium text-gray-800">
                              {session.device} - {session.browser}
                            </p>
                            <p className="text-sm text-gray-600">
                              {session.location} • {session.time}
                            </p>
                          </div>
                          <div className="flex items-center space-x-2">
                            {session.active && (
                              <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                                Current
                              </span>
                            )}
                            {!session.active && (
                              <button className="text-red-600 hover:text-red-800 text-sm">
                                Log out
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default ProfileSettings;