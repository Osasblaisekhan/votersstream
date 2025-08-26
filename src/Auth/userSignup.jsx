import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { FaRegEyeSlash } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa";
import { sendVerificationEmail, verifyToken, resendVerificationEmail, registerUser } from '../utils/emailService';

const Signup = () => {
  const [step, setStep] = useState(1); // 1: email, 2: verification, 3: complete registration
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [verificationToken, setVerificationToken] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const HandlePassword = ()=>{
    setShowPassword((prevState)=>!prevState)
  }

  const HandleConfirmPassword = ()=>{
    setShowConfirmPassword((prevState)=> !prevState)
  }
  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setLoading(true);

    // Validate required fields for initial registration
    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      setMessage('Please fill in all fields');
      setLoading(false);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setMessage('Passwords do not match');
      setLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setMessage('Password must be at least 6 characters long');
      setLoading(false);
      return;
    }

    try {
      // Use the registerUser function instead of sendVerificationEmail
      const result = await registerUser({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        confirmPassword: formData.confirmPassword
      });

      if (result.success) {
        setMessage('Registration successful! Please check your email for verification instructions.');
        setStep(2);
      } else {
        setMessage(result.message);
      }
    } catch (error) {
      setMessage('Registration failed. Please try again.');
      console.error('Registration error:', error);
    }
    setLoading(false);
  };

  const handleResendEmail = async () => {
    setLoading(true);
    try {
      const result = await resendVerificationEmail(formData.email);
      if (result.success) {
        setMessage('Verification email resent! Please check your inbox.');
      } else {
        setMessage(result.message);
      }
    } catch (error) {
      setMessage('Failed to resend email. Please try again.');
    }
    setLoading(false);
  };

  const handleVerification = async (e) => {
    e.preventDefault();
    setMessage('');
    setLoading(true);

    try {
      const result = await verifyToken(formData.email, verificationToken);
      if (result.success) {
        setMessage('Email verified successfully! You are now logged in.');
        // User is automatically logged in after verification
        login(result.user);
        setTimeout(() => {
          navigate('/dashboard');
        }, 2000);
      } else {
        setMessage(result.message);
      }
    } catch (error) {
      setMessage('Verification failed. Please try again.');
      console.error('Verification error:', error);
    }
    setLoading(false);
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
          </div>
        </div>

        {step === 1 && (
          <form className="mt-8 space-y-6" onSubmit={handleEmailSubmit}>
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
                    placeholder="Enter password"
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                  />
                  {showPassword ? 
                    <FaRegEye color='black' size={20} onClick={HandlePassword}/> : 
                    <FaRegEyeSlash color='black' size={20} onClick={HandlePassword}/>
                  }
                </div>
              </div>
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                  Confirm Password
                </label>
                <div className="appearance-none flex items-center relative w-full border border-gray-300 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm">
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    required
                    className="appearance-none relative block w-[95%] px-4 py-3 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:z-10 sm:text-sm"
                    placeholder="Confirm password"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                  />
                  {showConfirmPassword ? 
                    <FaRegEye color='black' size={20} onClick={HandleConfirmPassword}/> : 
                    <FaRegEyeSlash color='black' size={20} onClick={HandleConfirmPassword}/>
                  }
                </div>
              </div>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 transition-colors"
            >
              {loading ? 'Creating Account...' : 'Create Account & Send Verification'}
            </button>
          </form>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-blue-800 mb-2">📧 Email Verification</h3>
              <p className="text-blue-700 text-sm mb-3">
                We've sent a verification email to <strong>{formData.email}</strong>
              </p>
              <div className="bg-green-100 border border-green-300 rounded-lg p-3 text-center">
                <p className="text-green-800 font-bold text-lg">Check Your Email</p>
                <p className="text-green-700 text-sm">Enter the 6-digit verification code from your email</p>
              </div>
            </div>

            <form onSubmit={handleVerification}>
              <div>
                <label htmlFor="token" className="block text-sm font-medium text-gray-700 mb-2">
                  Enter Verification Code
                </label>
                <input
                  id="token"
                  name="token"
                  type="text"
                  required
                  maxLength="6"
                  className="appearance-none relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm font-mono tracking-wider text-center text-lg"
                  placeholder="Enter 6-digit code"
                  value={verificationToken}
                  onChange={(e) => setVerificationToken(e.target.value)}
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mt-4 transition-colors disabled:opacity-50"
              >
                {loading ? 'Verifying...' : 'Verify Email'}
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