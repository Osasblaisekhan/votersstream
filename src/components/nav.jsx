
// import React from 'react';
// import { Link } from 'react-router-dom';

// const Header = () => {
//   return (
//     <nav className='header'>
//       <h1>Cameroon Presidential Voting 2025</h1>
//      <div className='nav-links'> 
//       <Link to="/user/">Home</Link>
//       <Link to="/user/vote">Vote</Link>
//        {/* <Link to="/user/confirmation">Confirmation</Link> */}
//         <Link to="/user/results">Results</Link>
//         </div>
//     </nav>
//   );
// };

// export default Header;

import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../Auth/AuthContext';
import { useNavigate } from 'react-router-dom';
import { MdHowToVote } from 'react-icons/md';
import { AiOutlineBarChart } from 'react-icons/ai';
import { FiLogOut, FiUserPlus, FiUser } from 'react-icons/fi';

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleCreateAccount = () => {
    logout();
    navigate('/user/signup');
  };

  return (
    <header className="bg-green-600 text-white p-4 shadow-lg">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-6">
          <h1 className="text-xl font-bold">Voting Portal</h1>
          
          <nav className="flex space-x-4">
            <Link
              to="/user/vote"
              className={({ isActive }) =>
                `flex items-center space-x-2 px-3 py-2 rounded transition-colors ${
                  isActive
                    ? 'bg-green-700 text-white'
                    : 'text-green-100 hover:bg-green-500 hover:text-white'
                }`
              }
            >
              <MdHowToVote size={18} />
              <span>Vote</span>
            </Link>
            
            <Link
              to="/user/results"
              className={({ isActive }) =>
                `flex items-center space-x-2 px-3 py-2 rounded transition-colors ${
                  isActive
                    ? 'bg-green-700 text-white'
                    : 'text-green-100 hover:bg-green-500 hover:text-white'
                }`
              }
            >
              <AiOutlineBarChart size={18} />
              <span>Results</span>
            </Link>
          </nav>
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 text-sm">
            <FiUser size={16} />
            <span>Welcome, {user?.name || user?.email}</span>
          </div>
          
          <button
            onClick={handleCreateAccount}
            className="flex items-center space-x-1 px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            <FiUserPlus size={14} />
            <span>New Account</span>
          </button>
          
          <button
            onClick={handleLogout}
            className="flex items-center space-x-1 px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
          >
            <FiLogOut size={14} />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;