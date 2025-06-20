import React from 'react'

import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Time from './admin/Time';
import Navbar from './admin/Navbar';

import Sidebar from './admin/Sidebar';

import User from './admin/user';

import Home from './admin/pages/Home';

import Dashboard from './admin/pages/Dashboard';

import CreateCampaigns from './admin/pages/Create';

import CreateContestant from './admin/pages/CreateContestant';

import View from './admin/pages/View';

import Statistics from './admin/pages/Statistics';

import NotFound from './admin/pages/NotFound';





// import Section from './admin/Section';

const App = () => {
  return (
    <div  id="container" className=''> 

    <div id="navbar" className=''>
      <div className='flex justify-between items-center'>
      <Navbar/>
      <Time />
      <User />
      </div>
    </div>


          <Router>
    <div id="sidebar" className='md:overflow-y-scroll'>
      

    
      <div>
        <Sidebar />
      </div>
    </div>

    <div id="main" className='md:overflow-y-scroll'>
      <div>
        <Routes>
          <Route path='/' exact element={<Home/>}/>
          <Route path='/dashboard' element={<Dashboard/>}/>
          <Route path='/createCampaign' element={<CreateCampaigns/>}/>
          <Route path='/createContestants' element={<CreateContestant/>}/>
          <Route path='/viewCampaigns' element={<View/>}/>
          <Route path='/statistics' element={<Statistics/>}/>
          <Route path='*' element={<NotFound/>}/>
        </Routes>
      </div>
    
    </div>
    </Router>

    

    <footer id="footer">
      yo footer
    </footer>
    </div>
    
  )
}

export default App
