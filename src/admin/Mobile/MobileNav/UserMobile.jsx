// import React from "react";

// import { useToggle } from "../MobilePages/ToggleContext";

// import { FaRegCircleUser } from "react-icons/fa6";


// const UserMobile = ()=> {
//     const {isToggle} = useToggle();
//  return (
//     <nav className={isToggle ? 'hidden' : 'text-white font-bold flex group'}>
//       <FaRegCircleUser size={25} color='white'/>
//       <button className="z-50 hidden group-hover:block group-hover:transition-all">Signout</button>
//     </nav>
//  )
// }

// export default UserMobile;


import React from 'react';
import { useToggle } from "../MobilePages/ToggleContext";
import { useAuth } from '../../../Auth/AuthContext';
import { useNavigate } from 'react-router-dom';
import { FiUser, FiLogOut } from 'react-icons/fi';

const UserMobile = () => {
 const {isToggle} = useToggle();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="flex items-center space-x-2">
      <div className="flex items-center space-x-1 text-xs">
        <FiUser size={12} />
        <span className={isToggle ? 'hidden' : 'text-gray-700 truncate max-w-20'}>{user?.email}</span>
      </div>
      
      <button
        onClick={handleLogout}
        className={isToggle ? 'hidden' : 'flex items-center space-x-1 px-2 py-1 text-xs bg-red-500 text-white rounded hover:bg-red-600 transition-colors'}
      >
        <FiLogOut size={10} />
      </button>
    </div>
  );
};

export default UserMobile;