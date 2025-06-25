import React from "react";

import { FaRegCircleUser } from "react-icons/fa6";
const User = ()=> {
 return (
    <nav className='text-white font-bold flex group'>
      <FaRegCircleUser size={25} color='white'/>
      <button className="z-50 hidden group-hover:block group-hover:transition-all">Signout</button>
    </nav>
 )
}

export default User;