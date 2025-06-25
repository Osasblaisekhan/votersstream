import React from "react";

import { useToggle } from "../MobilePages/ToggleContext";

import { FaRegCircleUser } from "react-icons/fa6";


const UserMobile = ()=> {
    const {isToggle} = useToggle();
 return (
    <nav className={isToggle ? 'hidden' : 'text-white font-bold flex group'}>
      <FaRegCircleUser size={25} color='white'/>
      <button className="z-50 hidden group-hover:block group-hover:transition-all">Signout</button>
    </nav>
 )
}

export default UserMobile;