import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { sendVerificationEmail, verifyToken, resendVerificationEmail } from '../utils/emailService';

const Signup = () => {
  const [step, setStep] = useState(1); // 1: email, 2: verification, 3: complete registration
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [verificationToken, setVerificationToken] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setLoading(true);

    // Check if email already exists
    const storedUsers = localStorage.getItem('users');
    const users = storedUsers ? JSON.parse(storedUsers) : [];
    
    if (users.some(user => user.email === formData.email)) {
      setMessage('Email already registered. Please use a different email or login.');
      setLoading(false);
      return;
    }

    try {
      const result = await sendVerificationEmail(formData.email);
      if (result.success) {
        setMessage('Mock verification email sent! Please use token: 123456');
        setStep(2);
      }
    } catch (error) {
      setMessage('Failed to send verification email. Please try again.');
    }
    setLoading(false);
  };

  const handleResendEmail = async () => {
    setLoading(true);
    try {
      const result = await resendVerificationEmail(formData.email);
      if (result.success) {
        setMessage('Mock verification email resent! Please use token: 123456');
      }
    } catch (error) {
      setMessage('Failed to resend email. Please try again.');
    }
    setLoading(false);
  };

  const handleVerification = (e) => {
    e.preventDefault();
    setMessage('');

    const result = verifyToken(formData.email, verificationToken);
    if (result.success) {
      setMessage('Email verified successfully! Please complete your registration.');
      setStep(3);
    } else {
      setMessage(result.message);
    }
  };

  const handleCompleteRegistration = (e) => {
    e.preventDefault();
    setMessage('');

    if (formData.password !== formData.confirmPassword) {
      setMessage('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      setMessage('Password must be at least 6 characters long');
      return;
    }

    const storedUsers = localStorage.getItem('users');
    const users = storedUsers ? JSON.parse(storedUsers) : [];

    const newUser = { 
      id: Date.now(),
      name: formData.name, 
      email: formData.email, 
      password: formData.password, 
      role: 'user',
      hasVoted: false,
      votedCampaign: null,
      votedContestant: null,
      votedRegion: null,
      voteTimestamp: null,
      createdAt: new Date().toISOString()
    };
    
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    login(newUser);
    navigate('/user');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-white text-2xl">🗳️</span>
          </div>
          <h2 className="text-3xl font-extrabold text-gray-900">
            Create Voter Account
          </h2>
          <div className="mt-4 flex justify-center space-x-2">
            <div className={`w-8 h-2 rounded-full ${step >= 1 ? 'bg-indigo-600' : 'bg-gray-300'}`}></div>
            <div className={`w-8 h-2 rounded-full ${step >= 2 ? 'bg-indigo-600' : 'bg-gray-300'}`}></div>
            <div className={`w-8 h-2 rounded-full ${step >= 3 ? 'bg-indigo-600' : 'bg-gray-300'}`}></div>
          </div>
        </div>

        {step === 1 && (
          <form className="mt-8 space-y-6" onSubmit={handleEmailSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email address
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
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 transition-colors"
            >
              {loading ? 'Sending Email...' : 'Send Verification Email'}
            </button>
          </form>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-blue-800 mb-2">Mock Email Verification</h3>
              <p className="text-blue-700 text-sm mb-3">
                For demo purposes, please use the mock verification token: <strong>123456</strong>
              </p>
              <div className="bg-green-100 border border-green-300 rounded-lg p-3 text-center">
                <p className="text-green-800 font-bold text-lg">Mock Token: 123456</p>
                <p className="text-green-700 text-sm">Enter this token below to verify your email</p>
              </div>
            </div>

            <form onSubmit={handleVerification}>
              <div>
                <label htmlFor="token" className="block text-sm font-medium text-gray-700 mb-2">
                  Enter Verification Token
                </label>
                <input
                  id="token"
                  name="token"
                  type="text"
                  required
                  maxLength="6"
                  className="appearance-none relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm font-mono tracking-wider text-center text-lg"
                  placeholder="Enter 6-digit token"
                  value={verificationToken}
                  onChange={(e) => setVerificationToken(e.target.value)}
                />
              </div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mt-4 transition-colors"
              >
                Verify Email
              </button>
            </form>

            <div className="text-center">
              <button
                onClick={handleResendEmail}
                disabled={loading}
                className="text-sm text-indigo-600 hover:text-indigo-500 disabled:opacity-50"
              >
                {loading ? 'Resending...' : 'Resend verification email'}
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <form className="mt-8 space-y-6" onSubmit={handleCompleteRegistration}>
            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  className="appearance-none relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="appearance-none relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Enter password"
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                />
              </div>
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                  Confirm Password
                </label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  required
                  className="appearance-none relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Confirm password"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                />
              </div>
            </div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
            >
              Complete Registration
            </button>
          </form>
        )}

        {message && (
          <div className={`text-sm text-center p-4 rounded-lg ${
            message.includes('success') || message.includes('sent') || message.includes('resent')
              ? 'text-green-700 bg-green-100 border border-green-200' 
              : 'text-red-700 bg-red-100 border border-red-200'
          }`}>
            {message}
          </div>
        )}

        <div className="text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{' '}
            <button
              onClick={() => navigate('/user/login')}
              className="font-medium text-indigo-600 hover:text-indigo-500 transition-colors"
            >
              Sign in here
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;