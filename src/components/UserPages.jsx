import React, { useEffect } from 'react';
import './User.css';
import flag from './assets/flag.png';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../Auth/AuthContext';
import { FiLogOut, FiUserPlus } from 'react-icons/fi';
import { MdHowToVote } from 'react-icons/md';
import { AiOutlineBarChart } from 'react-icons/ai';
import Vote from './vote';
import Results from './results'; 
import { initializeMockData } from '../utils/mockData';

const UserPages = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();

  useEffect(() => {
    initializeMockData();
  }, []);

  const handleGetStarted = () => {
    navigate('/user/vote');
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleCreateAccount = () => {
    logout();
    navigate('/user/signup');
  };

  const isHomePage = location.pathname === '/user' || location.pathname === '/user/';

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-8">
              <h1 className="text-xl font-bold">Cameroon Voting Portal</h1>
              
              <nav className="hidden md:flex space-x-4">
                <button
                  onClick={() => navigate('/user/vote')}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    location.pathname === '/user/vote'
                      ? 'bg-white bg-opacity-20 text-white'
                      : 'text-indigo-100 hover:bg-white hover:bg-opacity-10 hover:text-white'
                  }`}
                >
                  <MdHowToVote size={18} />
                  <span>Vote</span>
                </button>
                
                <button
                  onClick={() => navigate('/user/results')}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    location.pathname === '/user/results'
                      ? 'bg-white bg-opacity-20 text-white'
                      : 'text-indigo-100 hover:bg-white hover:bg-opacity-10 hover:text-white'
                  }`}
                >
                  <AiOutlineBarChart size={18} />
                  <span>Results</span>
                </button>
              </nav>
            </div>

            <div className="flex items-center space-x-4">
              <div className="hidden md:flex items-center space-x-2 text-sm">
                <span>Welcome, {user?.name || user?.email}</span>
              </div>
              
              <button
                onClick={handleCreateAccount}
                className="flex items-center space-x-1 px-3 py-1 text-sm bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
              >
                <FiUserPlus size={14} />
                <span className="hidden sm:inline">New Account</span>
              </button>
              
              <button
                onClick={handleLogout}
                className="flex items-center space-x-1 px-3 py-1 text-sm bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
              >
                <FiLogOut size={14} />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          <nav className="md:hidden pb-4">
            <div className="flex space-x-4">
              <button
                onClick={() => navigate('/user/vote')}
                className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  location.pathname === '/user/vote'
                    ? 'bg-white bg-opacity-20 text-white'
                    : 'text-indigo-100 hover:bg-white hover:bg-opacity-10 hover:text-white'
                }`}
              >
                <MdHowToVote size={18} />
                <span>Vote</span>
              </button>
              
              <button
                onClick={() => navigate('/user/results')}
                className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  location.pathname === '/user/results'
                    ? 'bg-white bg-opacity-20 text-white'
                    : 'text-indigo-100 hover:bg-white hover:bg-opacity-10 hover:text-white'
                }`}
              >
                <AiOutlineBarChart size={18} />
                <span>Results</span>
              </button>
            </div>
          </nav>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Routes>
          <Route path="/vote" element={<Vote />} />
          <Route path="/results" element={<Results />} /> 
          <Route path="/" element={
            <div className="text-center">
              <div className="mb-8">
                <img src={flag} alt="Cameroon Flag" className="w-32 h-auto mx-auto mb-6 rounded-lg shadow-md" />
                <h1 className="text-4xl font-bold text-gray-900 mb-4">
                  Welcome to Cameroon Voting Portal
                </h1>
                <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                  Participate in the democratic process. Your voice matters in shaping the future of Cameroon.
                </p>
                <button
                  onClick={handleGetStarted}
                  className="bg-indigo-600 text-white px-8 py-3 rounded-lg text-lg font-medium hover:bg-indigo-700 transition-colors"
                >
                  Start Voting
                </button>
              </div>
              
              <div className="grid md:grid-cols-3 gap-8 mt-12">
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                  <div className="text-indigo-600 text-3xl mb-4">🗳️</div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Secure Voting</h3>
                  <p className="text-gray-600">Your vote is secure and anonymous. Each user can vote only once in the entire system.</p>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                  <div className="text-indigo-600 text-3xl mb-4">📊</div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Real-time Results</h3>
                  <p className="text-gray-600">View live voting results by region and nationwide rankings.</p>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                  <div className="text-indigo-600 text-3xl mb-4">🏛️</div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Democratic Process</h3>
                  <p className="text-gray-600">Participate in multiple campaigns and make your voice heard.</p>
                </div>
              </div>
            </div>
          } />
        </Routes>
      </main>
      
      <footer className="bg-gray-800 text-white py-4 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p>&copy; 2025 Cameroon Voting Portal. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default UserPages;