import React from 'react'
import './User.css';
import Time from '../admin/Desktop/Navbars/Time';
import Fetch from './fetch';

const UserPages = () => {
  return (
    <div>
      <div id="container-two">
       <div id="nav-bar-user">
        <Time/>
       </div>
       <div id="main-user">
      <Fetch/>;
       </div>

       <div id="footer-user">
        <Time />
       </div>
      </div>
    </div>
  )
}

export default UserPages
