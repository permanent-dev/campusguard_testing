
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'


import React, { useState } from 'react';
import { Camera, Shield, User, AlertCircle, CheckCircle, Clock, Search, Plus, LogOut, Menu, X, Eye, EyeOff } from 'lucide-react';

const CampusGuardApp = () => {
  const [currentView, setCurrentView] = useState('landing');
  const [userRole, setUserRole] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Form states
  const [matricNumber, setMatricNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [username, setUsername] = useState('');
  const [emailSent, setEmailSent] = useState(false);
  const [selectedOffenceType, setSelectedOffenceType] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const offenceTypes = [
    'LATE_ENTRY', 'UNAUTHORIZED_ACCESS', 'DRESS_CODE', 'MISCONDUCT',
    'PROPERTY_DAMAGE', 'VIOLENCE', 'THEFT', 'SUBSTANCE_ABUSE',
    'ACADEMIC_DISHONESTY', 'OTHER'
  ];

  const severityLevels = ['LOW', 'MEDIUM', 'HIGH', 'CRITICAL'];

  // Mock data
  const mockOffences = [
    { id: 1, student_identifier: '190401001', full_name: 'John Doe', type: 'LATE_ENTRY', severity: 'MEDIUM', status: 'PENDING', date: '2026-01-05', registered: true },
    { id: 2, student_identifier: '190401999', full_name: null, type: 'MISCONDUCT', severity: 'HIGH', status: 'PENDING', date: '2026-01-05', registered: false },
    { id: 3, student_identifier: '190401002', full_name: 'Jane Smith', type: 'DRESS_CODE', severity: 'LOW', status: 'RESOLVED', date: '2026-01-04', registered: true },
    { id: 4, student_identifier: '190401001', full_name: 'John Doe', type: 'VANDALISM', severity: 'HIGH', status: 'PENDING', date: '2026-01-05', registered: true },
  ];

  // central render function for current viewport
  const RenderView = () => {
    switch (currentView) {
      case 'landing': return <LandingPage />;
      case 'student-register': return <StudentRegister />;
      case 'set-password': return <SetPassword />;
      case 'login': return <LoginPage />;
      case 'student-dashboard': return <StudentDashboard />;
      case 'admin-dashboard': return <AdminDashboard />;
      case 'create-offense': return <CreateOffense />;
      case 'face-recognition': return <FaceRecognition />;
      default: return <LandingPage />

    }
  }

  // Landing Page
  const LandingPage = () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-blue-700 to-purple-800">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center text-white mb-12">
          <div className="flex items-center justify-center mb-4">
            <Shield className="w-16 h-16 mr-3" />
            <h1 className="text-5xl font-bold">CampusGuard</h1>
          </div>
          <p className="text-xl opacity-90">Smart Offense Tracking with Facial Recognition</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <div className="bg-white rounded-2xl p-8 shadow-2xl transform hover:scale-105 transition cursor-pointer"
            onClick={() => setCurrentView('student-register')}>
            <User className="w-12 h-12 text-blue-600 mb-4 mx-auto" />
            <h3 className="text-2xl font-bold text-gray-800 mb-2 text-center">Student</h3>
            <p className="text-gray-600 text-center">Register or view your offenses</p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-2xl transform hover:scale-105 transition cursor-pointer"
            onClick={() => { setCurrentView('login'); setUserRole('security'); }}>
            <Shield className="w-12 h-12 text-green-600 mb-4 mx-auto" />
            <h3 className="text-2xl font-bold text-gray-800 mb-2 text-center">Security</h3>
            <p className="text-gray-600 text-center">Log offenses and verify students</p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-2xl transform hover:scale-105 transition cursor-pointer"
            onClick={() => { setCurrentView('login'); setUserRole('admin'); }}>
            <AlertCircle className="w-12 h-12 text-purple-600 mb-4 mx-auto" />
            <h3 className="text-2xl font-bold text-gray-800 mb-2 text-center">Admin</h3>
            <p className="text-gray-600 text-center">Manage system and users</p>
          </div>
        </div>
      </div>
    </div>
  );

  // Student Registration Flow
  const StudentRegister = () => (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <Shield className="w-8 h-8 text-blue-600 mr-2" />
            <h2 className="text-2xl font-bold text-gray-800">Student Registration</h2>
          </div>
          <button onClick={() => setCurrentView('landing')} className="text-gray-600 hover:text-gray-800">
            <X className="w-6 h-6" />
          </button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-md">
        {!emailSent ? (
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">Enter Your Matric Number</h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Matric Number</label>
                <input
                  type="text"
                  value={matricNumber}
                  onChange={(e) => setMatricNumber(e.target.value)}
                  placeholder="190401001"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <button
                onClick={() => setEmailSent(true)}
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
              >
                Continue
              </button>
            </div>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">Already registered?</p>
              <button onClick={() => { setCurrentView('login'); setUserRole('student'); }} className="text-blue-600 font-medium hover:underline">
                Login here
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="text-center mb-6">
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Check Your Email</h3>
              <p className="text-gray-600">We've sent a verification link to</p>
              <p className="font-medium text-gray-800">j****e@student.lasu.edu.ng</p>
            </div>

            <div className="bg-blue-50 rounded-lg p-4 mb-6">
              <p className="text-sm text-gray-700">Click the link in your email to verify your account and set your password.</p>
            </div>

            <button
              onClick={() => setCurrentView('set-password')}
              className="w-full bg-gray-600 text-white py-3 rounded-lg font-semibold hover:bg-gray-700 transition"
            >
              Simulate: I Clicked Email Link
            </button>
          </div>
        )}
      </div>
    </div>
  );

  // Set Password Page
  const SetPassword = () => (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center">
            <Shield className="w-8 h-8 text-blue-600 mr-2" />
            <h2 className="text-2xl font-bold text-gray-800">Set Your Password</h2>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-md">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="mb-6 ">
            <CheckCircle color='green' className="w-12 h-12 items-center mb-2" />
            <h3 className="text-xl font-bold text-gray-800">Email Verified!</h3>
            <p className="text-gray-600 text-sm">Matric: {matricNumber || '190401001'}</p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  className="w-full text-black-500 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-12"
                />
                <button
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-1 top-1 text-gray-500"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label>
              <input
                type={showPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm password"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <button
              onClick={() => { setCurrentView('student-dashboard'); setUserRole('student'); }}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              Complete Registration
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  // Login Page
  const LoginPage = () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-blue-700 to-purple-800 flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md mx-4">
        <div className="text-center mb-8">
          <Shield className="w-16 h-16 text-blue-600 mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-gray-800">
            {userRole === 'admin' ? 'Admin' : userRole === 'security' ? 'Security' : 'Student'} Login
          </h2>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <button
            onClick={() => setCurrentView(userRole === 'student' ? 'student-dashboard' : 'admin-dashboard')}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Login
          </button>

          <button
            onClick={() => setCurrentView('landing')}
            className="w-full text-gray-600 hover:text-gray-800 text-sm"
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );

  // Student Dashboard
  const StudentDashboard = () => (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <Shield className="w-8 h-8 text-blue-600 mr-2" />
              <h1 className="text-xl font-bold text-gray-800">CampusGuard</h1>
            </div>
            <button onClick={() => setCurrentView('landing')} className="flex bg-gradient-to-r from-blue-600 to-indigo-400 items-center text-gray-200 hover:text-gray-800">
              <LogOut className="w-5 h-5 mr-1" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Welcome, John Doe</h2>
          <p className="text-gray-600">Matric: 190401001 | Computer Science</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-gray-600 text-sm font-medium">Total Offenses</h3>
              <AlertCircle className="w-5 h-5 text-orange-500" />
            </div>
            <p className="text-3xl font-bold text-gray-800">3</p>
          </div>

          <div className="bg-white rounded-xl shadow p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-gray-600 text-sm font-medium">Pending</h3>
              <Clock className="w-5 h-5 text-yellow-500" />
            </div>
            <p className="text-3xl font-bold text-gray-800">1</p>
          </div>

          <div className="bg-white rounded-xl shadow p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-gray-600 text-sm font-medium">Resolved</h3>
              <CheckCircle className="w-5 h-5 text-green-500" />
            </div>
            <p className="text-3xl font-bold text-gray-800">2</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow">
          <div className="p-6 border-b">
            <h3 className="text-xl font-bold text-gray-800">Your Offenses</h3>
          </div>
          <div className="divide-y">
            {mockOffences.filter(o => o.student_identifier === '190401001').map(offense => (
              <div key={offense.id} className="p-6 hover:bg-gray-50 transition">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="font-semibold text-gray-800">{offense.type.replace(/_/g, ' ')}</h4>
                    <p className="text-sm text-gray-600">{offense.date}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${offense.severity === 'HIGH' ? 'bg-red-100 text-red-700' :
                    offense.severity === 'MEDIUM' ? 'bg-orange-100 text-orange-700' :
                      'bg-yellow-100 text-yellow-700'
                    }`}>
                    {offense.severity}
                  </span>
                </div>
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${offense.status === 'PENDING' ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'
                  }`}>
                  {offense.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  // Admin/Security Dashboard
  const AdminDashboard = () => (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <Shield className="w-8 h-8 text-blue-600 mr-2" />
              <h1 className="text-xl font-bold text-gray-800">CampusGuard {userRole === 'admin' ? 'Admin' : 'Security'}</h1>
            </div>
            <div className="flex items-center space-x-4">
              <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="lg:hidden">
                <Menu className="w-6 h-6" />
              </button>
              <button onClick={() => setCurrentView('landing')} className="flex items-center text-gray-600 hover:text-gray-800">
                <LogOut className="w-5 h-5 mr-1" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="lg:w-64 space-y-2">
            <button
              onClick={() => setCurrentView('admin-dashboard')}
              className="w-full flex items-center px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              <Search className="w-5 h-5 mr-2" />
              View Offenses
            </button>
            <button
              onClick={() => setCurrentView('create-offense')}
              className="w-full flex items-center px-4 py-3 bg-white text-gray-700 rounded-lg hover:bg-gray-50 border transition"
            >
              <Plus className="w-5 h-5 mr-2" />
              Create Offense
            </button>
            <button
              onClick={() => setCurrentView('face-recognition')}
              className="w-full flex items-center px-4 py-3 bg-white text-gray-700 rounded-lg hover:bg-gray-50 border transition"
            >
              <Camera className="w-5 h-5 mr-2" />
              Face Recognition
            </button>
          </div>

          <div className="flex-1">
            <div className="bg-white rounded-xl shadow">
              <div className="p-6 border-b">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <h3 className="text-xl font-bold text-gray-800">All Offenses</h3>
                  <div className="flex gap-2 w-full sm:w-auto">
                    <input
                      type="text"
                      placeholder="Search..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="flex-1 sm:w-64 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Student</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Severity</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {mockOffences.map(offense => (
                      <tr key={offense.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <div>
                            <p className="font-medium text-gray-800">
                              {offense.full_name || offense.student_identifier}
                            </p>
                            <p className="text-sm text-gray-500">{offense.student_identifier}</p>
                            {!offense.registered && (
                              <span className="inline-block mt-1 px-2 py-0.5 bg-orange-100 text-orange-700 text-xs rounded">
                                Not Registered
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-700">{offense.type.replace(/_/g, ' ')}</td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${offense.severity === 'HIGH' ? 'bg-red-100 text-red-700' :
                            offense.severity === 'MEDIUM' ? 'bg-orange-100 text-orange-700' :
                              'bg-yellow-100 text-yellow-700'
                            }`}>
                            {offense.severity}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${offense.status === 'PENDING' ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'
                            }`}>
                            {offense.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">{offense.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Create Offense Page
  const CreateOffense = () => (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Shield className="w-8 h-8 text-blue-600 mr-2" />
              <h1 className="text-xl font-bold text-gray-800">Create New Offense</h1>
            </div>
            <button onClick={() => setCurrentView('admin-dashboard')} className="text-gray-600 hover:text-gray-800">
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Student Matric Number</label>
              <input
                type="text"
                placeholder="190401001"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <p className="text-xs text-gray-500 mt-1">Works for both registered and unregistered students</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Offense Type</label>
              <select
                value={selectedOffenceType}
                onChange={(e) => setSelectedOffenceType(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select offense type</option>
                {offenceTypes.map(type => (
                  <option key={type} value={type}>{type.replace('_', ' ')}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Severity</label>
              <div className="grid grid-cols-4 gap-2">
                {severityLevels.map(level => (
                  <button
                    key={level}
                    className={`px-4 py-2 rounded-lg font-medium ${level === 'CRITICAL' ? 'bg-red-100 text-red-700 hover:bg-red-200' :
                      level === 'HIGH' ? 'bg-orange-100 text-orange-700 hover:bg-orange-200' :
                        level === 'MEDIUM' ? 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200' :
                          'bg-green-100 text-green-700 hover:bg-green-200'
                      }`}
                  >
                    {level}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
              <input
                type="text"
                placeholder="Brief description"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
              <textarea
                rows={4}
                placeholder="Detailed description of the offense"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                <input
                  type="text"
                  placeholder="Main Gate"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Incident Date & Time</label>
                <input
                  type="datetime-local"
                  placeholder='Date/Time'
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => setCurrentView('admin-dashboard')}
                className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
              >
                Create Offense
              </button>
              <button
                onClick={() => setCurrentView('admin-dashboard')}
                className="px-6 py-3 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Face Recognition Page
  const FaceRecognition = () => (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Shield className="w-8 h-8 text-blue-600 mr-2" />
              <h1 className="text-xl font-bold text-gray-800">Face Recognition</h1>
            </div>
            <button onClick={() => setCurrentView('admin-dassboard')} className="text-gray" />
          </div>
        </div>
      </nav>
    </div>
  )

  return <> <div> <RenderView /> </div> </>
};

export default CampusGuardApp