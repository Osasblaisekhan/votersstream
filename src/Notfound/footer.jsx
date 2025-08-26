import React from 'react'
import { Link } from 'react-router-dom';
import { MdHowToVote } from 'react-icons/md';

const Footer = () => {
  return (
    <div>
        <footer className="bg-gray-900 text-white py-12">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid md:grid-cols-3 gap-8">
                  <div>
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-8 h-8 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center">
                        <MdHowToVote className="text-white" size={20} />
                      </div>
                      <h3 className="text-xl font-bold"> Portal</h3>
                    </div>
                    <p className="text-gray-400">
                      Empowering democratic participation through secure and transparent voting technology.
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
                    <ul className="space-y-2 text-gray-400">
                      <li><Link to="/user/signup" className="hover:text-white transition-colors">Register to Vote</Link></li>
                      <li><Link to="/user/login" className="hover:text-white transition-colors">Voter Login</Link></li>
                      <li><Link to="/admin/login" className="hover:text-white transition-colors">Admin Access</Link></li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="text-lg font-semibold mb-4">Contact</h4>
                    <div className="text-gray-400 space-y-2">
                      <p>Email: info@cameroonvoting.cm</p>
                      <p>Phone: +237 XXX XXX XXX</p>
                      <p>Address: Yaoundé, Cameroon</p>
                    </div>
                  </div>
                </div>
                
                <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
                  <p>&copy; 2025  VotersStream. All rights reserved.</p>
                </div>
              </div>
            </footer>
    </div>
  )
}

export default Footer;
