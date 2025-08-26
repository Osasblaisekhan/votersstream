import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../Auth/AuthContext";
import { FiLogOut } from "react-icons/fi";

const User = ()=> {
  const {logout} = useAuth();
const navigate = useNavigate();
    const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };
 return (
    <nav className='text-white font-bold flex group'>
         <button
                onClick={handleLogout}
                className="flex items-center space-x-1 px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
              >
                <FiLogOut size={14} />
                <span>Logout</span>
              </button>
    </nav>
 )
}

export default User;