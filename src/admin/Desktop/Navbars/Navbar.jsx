// import React from 'react'
import { Link } from 'react-router-dom'


//  const Navbar = () => {
//   return (
//     <nav className=''>
//         <div>
//           <h2 className='text-white font-bold'><Link to={'/'}>DASHBOARD</Link></h2>
//         </div>
//     </nav>
//   )
// }



// export default Navbar;


import React from 'react';
import { useAuth } from '../../../Auth/AuthContext';

import { FiUser } from 'react-icons/fi';

const Navbar = () => {
  const { user} = useAuth();

  return (
    <div className="flex items-center gap-8 justify-center">
      <div className='text-white text-center hidden'>
        <h1 className="text-xl font-bold text-center">Admin Dashboard</h1>
      </div>
    
        <div className="flex items-center space-x-2 text-sm text-white">
          <FiUser size={16} color='white'/>
          <Link to={'/admin/'}><span>Welcome, {user?.email}</span></Link>
        </div>
        
    </div>
  );
};

export default Navbar;

