import React, { useState } from 'react';
import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router-dom';

const UserLogin = () => {
  const [email, setEmail] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    
    // Get stored users from localStorage
    const storedUsers = localStorage.getItem('users');
    const users = storedUsers ? JSON.parse(storedUsers) : [];
    
    // Find user with matching email (no password required)
    const user = users.find(u => u.email === email);
    
    if (user) {
      login(user);
      navigate('/user');
    } else {
      setError('Email not found. Please register first or check your email address.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-white text-2xl">🗳️</span>
          </div>
          <h2 className="text-3xl font-extrabold text-gray-900">
            Voter Login
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Enter your verified email address to access your voting dashboard
          </p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="appearance-none relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Enter your verified email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
            >
              Access Voting Dashboard
            </button>
          </div>
          
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="text-red-700 text-sm">{error}</div>
            </div>
          )}
        </form>
        
        <div className="text-center space-y-4">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm text-blue-800">
              <strong>Note:</strong> Only verified email addresses can access the voting system. 
              If you haven't registered yet, please create an account first.
            </p>
          </div>
          
          <p className="text-sm text-gray-600">
            Don't have an account?{' '}
            <button
              onClick={() => navigate('/user/signup')}
              className="font-medium text-indigo-600 hover:text-indigo-500 transition-colors"
            >
              Register here
            </button>
          </p>
          
          <p className="text-sm text-gray-600">
            Are you an admin?{' '}
            <button
              onClick={() => navigate('/admin/login')}
              className="font-medium text-indigo-600 hover:text-indigo-500 transition-colors"
            >
              Admin login
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserLogin;