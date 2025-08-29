import React, { useState } from 'react';
import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router-dom';
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa";
import { loginUser } from '../utils/emailService';

const UserLogin = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [needsVerification, setNeedsVerification] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setNeedsVerification(false);
    setLoading(true);
    
    if (!formData.email || !formData.password) {
      setError('Please provide both email and password');
      setLoading(false);
      return;
    }

    try {
      const result = await loginUser(formData.email, formData.password);
      
      if (result.success) {
        // User logged in successfully
        login(result.user);
        navigate('/user');
      } else {
        setError(result.message);
        if (result.needsVerification) {
          setNeedsVerification(true);
        }
      }
    } catch (error) {
      setError('Login failed. Please try again.');
      console.error('Login error:', error);
    }
    
    setLoading(false);
  };

  const handleResendVerification = () => {
    navigate('/user/signup', { 
      state: { 
        email: formData.email, 
        needsVerification: true 
      } 
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
            <div className="w-24 h-16 mx-auto mb-6 bg-gradient-to-r from-green-500 to-red-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-2xl">VS</span>
            </div>
          <h2 className="text-3xl font-extrabold text-gray-900">
            Sign In to Vote
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Access your verified voter account
          </p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
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
                placeholder="Enter your email address"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="appearance-none flex items-center relative w-full border border-gray-300 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  className="appearance-none relative block w-[95%] px-4 py-3 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:z-10 sm:text-sm"
                  placeholder="Enter your password"
                  autocomplete="current-password"
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                />
                {showPassword ? 
                  <FaRegEye 
                    color='black' 
                    size={20} 
                    onClick={() => setShowPassword(false)}
                    className="cursor-pointer"
                  /> : 
                  <FaRegEyeSlash 
                    color='black' 
                    size={20} 
                    onClick={() => setShowPassword(true)}
                    className="cursor-pointer"
                  />
                }
              </div>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors disabled:opacity-50"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </div>
          
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="text-red-700 text-sm">{error}</div>
              {needsVerification && (
                <button
                  onClick={handleResendVerification}
                  className="mt-2 text-sm text-indigo-600 hover:text-indigo-500 underline"
                >
                  Resend verification email
                </button>
              )}
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