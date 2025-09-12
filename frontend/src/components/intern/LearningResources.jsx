import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Book, PlayCircle, FileText, Trophy, Clock, Star, Search, Filter, ChevronRight, Download, ExternalLink, CheckCircle } from 'lucide-react';

const LearningResources = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedResource, setSelectedResource] = useState(null);

  const [resources] = useState([
    {
      id: 1,
      title: 'React Fundamentals for Beginners',
      type: 'video',
      category: 'frontend',
      duration: '2h 30m',
      difficulty: 'beginner',
      progress: 85,
      rating: 4.8,
      enrolled: true,
      instructor: 'Sarah Chen',
      description: 'Master the basics of React including components, props, state, and hooks.',
      modules: [
        { title: 'Introduction to React', duration: '15m', completed: true },
        { title: 'Components and Props', duration: '25m', completed: true },
        { title: 'State Management', duration: '30m', completed: true },
        { title: 'React Hooks', duration: '40m', completed: false },
        { title: 'Building Your First App', duration: '40m', completed: false }
      ],
      skills: ['React', 'JavaScript', 'Component Design'],
      certificate: true
    },
    {
      id: 2,
      title: 'Node.js Backend Development',
      type: 'course',
      category: 'backend',
      duration: '4h 15m',
      difficulty: 'intermediate',
      progress: 45,
      rating: 4.6,
      enrolled: true,
      instructor: 'Mike Rodriguez',
      description: 'Build scalable backend applications with Node.js and Express.',
      modules: [
        { title: 'Node.js Basics', duration: '30m', completed: true },
        { title: 'Express Framework', duration: '45m', completed: true },
        { title: 'Database Integration', duration: '60m', completed: false },
        { title: 'Authentication', duration: '45m', completed: false },
        { title: 'API Design', duration: '75m', completed: false }
      ],
      skills: ['Node.js', 'Express', 'MongoDB', 'REST APIs'],
      certificate: true
    },
    {
      id: 3,
      title: 'Git & GitHub Best Practices',
      type: 'guide',
      category: 'tools',
      duration: '45m',
      difficulty: 'beginner',
      progress: 100,
      rating: 4.9,
      enrolled: true,
      instructor: 'Team Lead',
      description: 'Learn essential Git commands and collaboration workflows.',
      modules: [
        { title: 'Git Basics', duration: '10m', completed: true },
        { title: 'Branching & Merging', duration: '15m', completed: true },
        { title: 'Pull Requests', duration: '10m', completed: true },
        { title: 'Conflict Resolution', duration: '10m', completed: true }
      ],
      skills: ['Git', 'GitHub', 'Version Control'],
      certificate: false
    },
    {
      id: 4,
      title: 'Agile Development Methodology',
      type: 'workshop',
      category: 'methodology',
      duration: '3h',
      difficulty: 'beginner',
      progress: 30,
      rating: 4.7,
      enrolled: true,
      instructor: 'Emma Wilson',
      description: 'Understand Agile principles and Scrum framework.',
      modules: [
        { title: 'Agile Principles', duration: '30m', completed: true },
        { title: 'Scrum Framework', duration: '45m', completed: false },
        { title: 'Sprint Planning', duration: '45m', completed: false },
        { title: 'Daily Standups', duration: '30m', completed: false },
        { title: 'Retrospectives', duration: '30m', completed: false }
      ],
      skills: ['Agile', 'Scrum', 'Project Management'],
      certificate: true
    },
    {
      id: 5,
      title: 'Database Design & SQL',
      type: 'course',
      category: 'backend',
      duration: '5h',
      difficulty: 'intermediate',
      progress: 0,
      rating: 4.5,
      enrolled: false,
      instructor: 'Senior Dev',
      description: 'Master database design principles and SQL queries.',
      skills: ['SQL', 'Database Design', 'PostgreSQL'],
      certificate: true
    },
    {
      id: 6,
      title: 'UI/UX Design Principles',
      type: 'video',
      category: 'design',
      duration: '2h',
      difficulty: 'beginner',
      progress: 0,
      rating: 4.4,
      enrolled: false,
      instructor: 'Design Team',
      description: 'Learn the fundamentals of user interface and experience design.',
      skills: ['UI Design', 'UX Design', 'Figma'],
      certificate: false
    }
  ]);

  const [recommendations] = useState([
    {
      title: 'Advanced React Patterns',
      reason: 'Based on your React progress',
      type: 'course',
      duration: '3h',
      match: 95
    },
    {
      title: 'Testing with Jest & React Testing Library',
      reason: 'Recommended for your current skill level',
      type: 'workshop',
      duration: '2h 30m',
      match: 88
    }
  ]);

  const categories = [
    { id: 'all', label: 'All Resources', count: resources.length },
    { id: 'frontend', label: 'Frontend', count: resources.filter(r => r.category === 'frontend').length },
    { id: 'backend', label: 'Backend', count: resources.filter(r => r.category === 'backend').length },
    { id: 'tools', label: 'Tools', count: resources.filter(r => r.category === 'tools').length },
    { id: 'methodology', label: 'Methodology', count: resources.filter(r => r.category === 'methodology').length },
    { id: 'design', label: 'Design', count: resources.filter(r => r.category === 'design').length }
  ];

  const typeIcons = {
    video: <PlayCircle className="w-5 h-5" />,
    course: <Book className="w-5 h-5" />,
    guide: <FileText className="w-5 h-5" />,
    workshop: <Trophy className="w-5 h-5" />
  };

  const difficultyColors = {
    beginner: 'text-green-600 bg-green-100',
    intermediate: 'text-yellow-600 bg-yellow-100',
    advanced: 'text-red-600 bg-red-100'
  };

  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         resource.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || resource.category === selectedCategory;
    const matchesTab = activeTab === 'all' || 
                      (activeTab === 'enrolled' && resource.enrolled) ||
                      (activeTab === 'completed' && resource.progress === 100);
    
    return matchesSearch && matchesCategory && matchesTab;
  });

  const handleEnroll = (resourceId) => {
    // In a real app, this would enroll the user
    console.log('Enrolling in resource:', resourceId);
  };

  const handleContinue = (resource) => {
    setSelectedResource(resource);
  };

  const handleDownloadCertificate = (resourceId) => {
    // In a real app, this would download the certificate
    console.log('Downloading certificate for:', resourceId);
  };

  if (selectedResource) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl shadow-lg p-6"
      >
        <button
          onClick={() => setSelectedResource(null)}
          className="mb-4 text-blue-600 hover:text-blue-800 flex items-center"
        >
          <ChevronRight className="w-4 h-4 rotate-180 mr-1" />
          Back to Resources
        </button>

        <div className="flex items-start justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">{selectedResource.title}</h2>
            <p className="text-gray-600 mb-4">{selectedResource.description}</p>
            
            <div className="flex items-center space-x-4 text-sm">
              <span className="flex items-center text-gray-600">
                <Clock className="w-4 h-4 mr-1" />
                {selectedResource.duration}
              </span>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${difficultyColors[selectedResource.difficulty]}`}>
                {selectedResource.difficulty}
              </span>
              <span className="flex items-center text-yellow-600">
                <Star className="w-4 h-4 mr-1" />
                {selectedResource.rating}
              </span>
              <span className="text-gray-600">by {selectedResource.instructor}</span>
            </div>
          </div>

          {selectedResource.progress === 100 && selectedResource.certificate && (
            <button
              onClick={() => handleDownloadCertificate(selectedResource.id)}
              className="flex items-center px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
            >
              <Download className="w-4 h-4 mr-2" />
              Certificate
            </button>
          )}
        </div>

        {/* Progress Bar */}
        {selectedResource.enrolled && (
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">Progress</span>
              <span className="text-sm text-gray-600">{selectedResource.progress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-500 h-2 rounded-full"
                style={{ width: `${selectedResource.progress}%` }}
              />
            </div>
          </div>
        )}

        {/* Modules */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Course Modules</h3>
          <div className="space-y-3">
            {selectedResource.modules.map((module, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center">
                  {module.completed ? (
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  ) : (
                    <div className="w-5 h-5 border-2 border-gray-300 rounded-full mr-3" />
                  )}
                  <div>
                    <p className="font-medium text-gray-800">{module.title}</p>
                    <p className="text-sm text-gray-600">{module.duration}</p>
                  </div>
                </div>
                {!module.completed && (
                  <button className="text-blue-600 hover:text-blue-800 text-sm">
                    Start
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Skills */}
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">Skills You'll Learn</h3>
          <div className="flex flex-wrap gap-2">
            {selectedResource.skills.map((skill, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-xl shadow-lg p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Learning Resources</h2>
          <p className="text-gray-600 mt-1">Access training materials and development programs</p>
        </div>
        <Book className="w-8 h-8 text-blue-600" />
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-blue-600">Total Resources</p>
              <p className="text-2xl font-bold text-blue-800">{resources.length}</p>
            </div>
            <Book className="w-8 h-8 text-blue-600" />
          </div>
        </div>
        <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-green-600">Enrolled</p>
              <p className="text-2xl font-bold text-green-800">
                {resources.filter(r => r.enrolled).length}
              </p>
            </div>
            <PlayCircle className="w-8 h-8 text-green-600" />
          </div>
        </div>
        <div className="bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-purple-600">Completed</p>
              <p className="text-2xl font-bold text-purple-800">
                {resources.filter(r => r.progress === 100).length}
              </p>
            </div>
            <Trophy className="w-8 h-8 text-purple-600" />
          </div>
        </div>
        <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-yellow-600">Avg Rating</p>
              <p className="text-2xl font-bold text-yellow-800">
                {(resources.reduce((sum, r) => sum + r.rating, 0) / resources.length).toFixed(1)}
              </p>
            </div>
            <Star className="w-8 h-8 text-yellow-600" />
          </div>
        </div>
      </div>

      {/* Recommendations */}
      {recommendations.length > 0 && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3">Recommended for You</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {recommendations.map((rec, index) => (
              <div key={index} className="border border-blue-200 bg-blue-50 rounded-lg p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-semibold text-blue-800">{rec.title}</h4>
                    <p className="text-sm text-blue-600 mb-2">{rec.reason}</p>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <span className="flex items-center">
                        <Clock className="w-3 h-3 mr-1" />
                        {rec.duration}
                      </span>
                      <span className="text-green-600 font-medium">{rec.match}% match</span>
                    </div>
                  </div>
                  <button className="text-blue-600 hover:text-blue-800">
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search resources..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {categories.map(cat => (
            <option key={cat.id} value={cat.id}>
              {cat.label} ({cat.count})
            </option>
          ))}
        </select>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="-mb-px flex space-x-8">
          {[
            { id: 'all', label: 'All Resources' },
            { id: 'enrolled', label: 'My Learning' },
            { id: 'completed', label: 'Completed' }
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
            </button>
          ))}
        </nav>
      </div>

      {/* Resources Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredResources.map((resource) => (
          <motion.div
            key={resource.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-start justify-between mb-3">
              <div className={`p-2 rounded-lg ${difficultyColors[resource.difficulty]}`}>
                {typeIcons[resource.type]}
              </div>
              {resource.progress === 100 && (
                <Trophy className="w-5 h-5 text-yellow-500" />
              )}
            </div>

            <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2">{resource.title}</h3>
            <p className="text-sm text-gray-600 mb-3 line-clamp-2">{resource.description}</p>

            <div className="space-y-2 mb-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Duration</span>
                <span className="font-medium">{resource.duration}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Instructor</span>
                <span className="font-medium">{resource.instructor}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Rating</span>
                <span className="flex items-center font-medium">
                  <Star className="w-3 h-3 text-yellow-400 mr-1" />
                  {resource.rating}
                </span>
              </div>
            </div>

            {resource.enrolled && resource.progress > 0 && resource.progress < 100 && (
              <div className="mb-3">
                <div className="flex items-center justify-between text-sm mb-1">
                  <span className="text-gray-600">Progress</span>
                  <span className="font-medium">{resource.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-500 h-2 rounded-full"
                    style={{ width: `${resource.progress}%` }}
                  />
                </div>
              </div>
            )}

            <div className="flex flex-wrap gap-1 mb-3">
              {resource.skills.slice(0, 3).map((skill, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded"
                >
                  {skill}
                </span>
              ))}
            </div>

            <div className="flex items-center justify-between">
              {resource.enrolled ? (
                <button
                  onClick={() => handleContinue(resource)}
                  className="flex-1 text-center py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  {resource.progress === 100 ? 'Review' : 'Continue'}
                </button>
              ) : (
                <button
                  onClick={() => handleEnroll(resource.id)}
                  className="flex-1 text-center py-2 border border-blue-500 text-blue-500 rounded-lg hover:bg-blue-50 transition-colors"
                >
                  Enroll Now
                </button>
              )}
              
              {resource.certificate && (
                <div className="ml-2 text-green-600" title="Certificate available">
                  <Trophy className="w-4 h-4" />
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {filteredResources.length === 0 && (
        <div className="text-center py-12">
          <Book className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No resources found</h3>
          <p className="text-gray-600">
            Try adjusting your search criteria or browse all available resources.
          </p>
        </div>
      )}
    </motion.div>
  );
};

export default LearningResources;