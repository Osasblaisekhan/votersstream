import React from 'react';
import { Link } from 'react-router-dom';
import { FiUsers, FiBarChart, FiShield, FiGlobe } from 'react-icons/fi';
import { MdHowToVote } from 'react-icons/md';
import HTMLContent from './animate';

import Time from '../admin/Desktop/Navbars/Time';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">

            <div className="flex items-center space-x-3 text-white">
              <div className="w-10 h-10 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center">
                <MdHowToVote size={30} color='white' />
              </div>

             <div>
               <h3 className="text-2xl font-bold text-white">VotersStream</h3>
             </div>
            </div>

            <div>
              <Time />
            </div>

            <div className="flex space-x-4">
              <Link 
                to="/admin/login" 
                className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium"
              >
                Admin Login
              </Link>
              <Link 
                to="/user/login" 
                className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium"
              >
                Voter Login
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-8">
            <div className="w-24 h-16 mx-auto mb-6 bg-gradient-to-r from-green-500 to-red-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-2xl">🇨🇲</span>
            </div>
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              Live Voting Platform
              <span className="block text-indigo-600">for Events</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Participate in secure, transparent, and accessible VotersStream. 
              Your voice matters in shaping the future of our nation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/user/signup" 
                className="px-8 py-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-semibold text-lg"
              >
                Register to Vote
              </Link>
              <Link 
                to="/user/login" 
                className="px-8 py-4 border-2 border-indigo-600 text-indigo-600 rounded-lg hover:bg-indigo-50 transition-colors font-semibold text-lg"
              >
                Already Registered? Login
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Our Platform?</h2>
            <p className="text-lg text-gray-600">Built for transparency, security, and accessibility</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

            <div className="text-center p-6 rounded-xl bg-blue-50 hover:bg-blue-100 transition-colors">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiShield className="text-white" size={32} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Secure Voting</h3>
              <p className="text-gray-600">Advanced security measures ensure your vote is protected and anonymous</p>
            </div>
            
            <div className="text-center p-6 rounded-xl bg-green-50 hover:bg-green-100 transition-colors">
              <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiBarChart className="text-white" size={32} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Real-time Results</h3>
              <p className="text-gray-600">View live voting results and analytics by region and nationwide</p>
            </div>
            
            <div className="text-center p-6 rounded-xl bg-purple-50 hover:bg-purple-100 transition-colors">
              <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiGlobe className="text-white" size={32} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Regional Coverage</h3>
              <p className="text-gray-600">Comprehensive coverage across all 10 regions of </p>
            </div>
            
            <div className="text-center p-6 rounded-xl bg-orange-50 hover:bg-orange-100 transition-colors">
              <div className="w-16 h-16 bg-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiUsers className="text-white" size={32} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">User Friendly</h3>
              <p className="text-gray-600">Simple, intuitive interface designed for all users</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-lg text-gray-600">Simple steps to participate in democracy</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-xl">
                1
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Register</h3>
              <p className="text-gray-600">Create your account with email verification to ensure security</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-xl">
                2
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Choose Campaign</h3>
              <p className="text-gray-600">Select from active voting campaigns and choose your region</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-xl">
                3
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Vote</h3>
              <p className="text-gray-600">Cast your vote for your preferred candidate securely</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-indigo-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 text-center text-white">
            <div>
              <div className="text-4xl font-bold mb-2">10</div>
              <div className="text-indigo-200">Regions Covered</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2 flex items-center"><HTMLContent />%</div>
              <div className="text-indigo-200">Secure Voting</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">24/7</div>
              <div className="text-indigo-200">Platform Availability</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">Real-time</div>
              <div className="text-indigo-200">Results Updates</div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 items-center justify-between">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <MdHowToVote className="text-white" size={20} />
                </div>
                <h3 className="text-xl font-bold"> VotersStream</h3>
              </div>
              <h3 className="text-white">
                Empowering democratic participation through secure and transparent voting technology.
              </h3>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-white">
                <li><Link to="/user/signup" className="hover:text-white transition-colors">Register to Vote</Link></li>
                <li><Link to="/user/login" className="hover:text-white transition-colors">Voter Login</Link></li>
                <li><Link to="/admin/login" className="hover:text-white transition-colors">Admin Access</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact</h4>
              <div className="text-white space-y-2">
                <h3>Email: info@cameroonvoting.cm</h3>
                <h3>Phone: +237 XXX XXX XXX</h3>
                <h3>Address: Yaoundé, </h3>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-white">
            <h3 className='text-white'>&copy; 2025 VotersStream. All rights reserved.</h3>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;