// import React from 'react';
// import { Link, useLocation } from 'react-router-dom';
// import { useAuth } from '../Auth/AuthContext';
// import { useNavigate } from 'react-router-dom';
// import { MdHowToVote } from 'react-icons/md';
// import { AiOutlineBarChart } from 'react-icons/ai';
// import { FiLogOut, FiUserPlus, FiUser } from 'react-icons/fi';

// const Header = () => {
//   const { user, logout } = useAuth();
//   const navigate = useNavigate();
//   const location = useLocation();

//   const handleLogout = () => {
//     logout();
//     navigate('/');
//   };

//   const handleCreateAccount = () => {
//     logout();
//     navigate('/user/signup');
//   };

//   const isActive = (path) => location.pathname === path;

//   return (
//     <header className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex items-center justify-between h-16">
//           <div className="flex items-center space-x-8">
//             <p className="text-xl font-bold hidden">C</p>
            
//             <nav className="hidden md:flex space-x-4">
//               <Link
//                 to="/user/vote"
//                 className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
//                   isActive('/user/vote')
//                     ? 'bg-white bg-opacity-20 text-white'
//                     : 'text-indigo-100 hover:bg-white hover:bg-opacity-10 hover:text-white'
//                 }`}
//               >
//                 <MdHowToVote size={18} />
//                 <span>Vote</span>
//               </Link>
              
//               <Link
//                 to="/user/results"
//                 className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
//                   isActive('/user/results')
//                     ? 'bg-white bg-opacity-20 text-white'
//                     : 'text-indigo-100 hover:bg-white hover:bg-opacity-10 hover:text-white'
//                 }`}
//               >
//                 <AiOutlineBarChart size={18} />
//                 <span>Results</span>
//               </Link>
//             </nav>
//           </div>

//           <div className="flex items-center space-x-4">
//             <div className="hidden md:flex items-center space-x-2 text-sm">
//               <FiUser size={16} />
//               <span>Welcome, {user?.name || user?.email}</span>
//             </div>
            
//             <button
//               onClick={handleCreateAccount}
//               className="flex items-center space-x-1 px-3 py-1 text-sm bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
//             >
//               <FiUserPlus size={14} />
//               <span className="hidden sm:inline">New Account</span>
//             </button>
            
//             <button
//               onClick={handleLogout}
//               className="flex items-center space-x-1 px-3 py-1 text-sm bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
//             >
//               <FiLogOut size={14} />
//               <span className="hidden sm:inline">Logout</span>
//             </button>
//           </div>
//         </div>

//         {/* Mobile Navigation */}
//         <nav className="md:hidden pb-4">
//           <div className="flex space-x-4">
//             <Link
//               to="/user/vote"
//               className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
//                 isActive('/user/vote')
//                   ? 'bg-white bg-opacity-20 text-white'
//                   : 'text-indigo-100 hover:bg-white hover:bg-opacity-10 hover:text-white'
//               }`}
//             >
//               <MdHowToVote size={18} />
//               <span>Vote</span>
//             </Link>
            
//             <Link
//               to="/user/results"
//               className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
//                 isActive('/user/results')
//                   ? 'bg-white bg-opacity-20 text-white'
//                   : 'text-indigo-100 hover:bg-white hover:bg-opacity-10 hover:text-white'
//               }`}
//             >
//               <AiOutlineBarChart size={18} />
//               <span>Results</span>
//             </Link>
//           </div>
//         </nav>
//       </div>
//     </header>
//   );
// };

// export default Header;