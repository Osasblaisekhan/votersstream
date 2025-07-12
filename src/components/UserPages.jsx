// import React from 'react'
// import './User.css';
// import flag from './assets/flag.png'
// import {Routes, Route  } from 'react-router-dom';
// import Time from '../admin/Desktop/Navbars/Time';
// import Header from './nav';
// // import Fetch from './fetch';
// import Vote from './vote'
// import Confirmation from './confirmation'
// import Results from './results'

// const UserPages = () => {
//   return (
//     <div>
//       <div id="container-two">
//        <div id="nav-bar-user">
//         <Time/>
//        </div>
//        <div id="main-user">
//          <div className="app">
//     <h1>2025 Cameroonian Presidential Elections</h1>
//     <img src={flag} alt="loading..."/>
//      <Header />
//        <h2>Welcome to the Voting Portal</h2> 
//       <Routes>
//         <Route path="/vote" element={<Vote />} />
//           <Route path="/confirmation" element={<Confirmation />} />
//             <Route path="/results" element={<Results />} />
//       </Routes>
//     </div>
//        {/* <Fetch />  */}
//        </div>
//        <div id="footer-user">
//         <Time />
//        </div>
//       </div>
//     </div>
//   )
// }

// // export default UserPages

import React from 'react';
import './User.css';
import flag from './assets/flag.png';
import { Routes, Route } from 'react-router-dom';
import Time from '../admin/Desktop/Navbars/Time';
import Header from './nav';
import Vote from './vote';
import Results from './results'; 

const UserPages = () => {
  return (
    <div>
      <div id="container-two">
        <div id="nav-bar-user">
          <Time />
        </div>
        <div id="main-user">
          <div className="app">
         
            <Header />
            <h2>Welcome to the Voting Portal</h2>
            <Routes>
              <Route path="/vote" element={<Vote />} />
              <Route path="/results" element={<Results />} /> 
              {/* Default route for UserPages, if needed */}
              <Route path="/" element={<h2>Please select an option.</h2>} />
            </Routes>

               <h1>2025 Cameroonian Presidential Elections</h1>
            <img src={flag} alt="loading..." />
          </div>
        </div>
        <div id="footer-user">
          <Time />
        </div>
      </div>
    </div>
  );
}

export default UserPages;