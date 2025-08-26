import React from 'react'
import { Link } from 'react-router-dom';
import { MdHowToVote } from 'react-icons/md';
import Time from '../admin/Desktop/Navbars/Time';

const Header = () => {
  return (
    <div>
       <header className="bg-white shadow-sm border-b">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center py-6">
      
                  <div className="flex items-center space-x-3 text-white">
                    <div className="w-10 h-10 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center">
                      <MdHowToVote size={30} color='white' />
                    </div>
      
                   <div>
                     <h3 className="text-2xl font-bold">Cameroon Voting Portal</h3>
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
      
    </div>
  )
}

export default Header;
