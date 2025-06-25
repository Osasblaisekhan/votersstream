import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './Admin.css'; 
import Time from './Navbars/Time';
import Navbar from './Navbars/Navbar';
import Sidebar from './Navbars/Sidebar';
import User from './Navbars/user';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import CreateCampaigns from './pages/Create';
import CreateContestant from './pages/CreateContestant';
import View from './pages/View';
import Statistics from './pages/Statistics';
import Edit from './pages/Edit';
import NotFound from './pages/NotFound';
import UserMobile from '../Mobile/MobileNav/UserMobile';
import MobileNavbar from '../Mobile/MobileNav/NavMobile';
import MobileHamburger from '../Mobile/MobilePages/MobileHamburger';

const AdminPages = () => {
    return (
        <div>
            <div id="container">
                <div id="sidebar" className="md:overflow-y-scroll">
                    <Sidebar />
                </div>

                <div id="navbar">
                    {/* Desktop Navbar */}
                    <div className="md:flex justify-between items-center hidden">
                        <Navbar />
                        <Time />
                        <User />
                    </div>

                    {/* Mobile Navbar */}
                    <div className="flex items-center justify-between md:hidden">
                        <MobileHamburger />
                        <div>
                            <Time />
                            <MobileNavbar />
                        </div>
                        <UserMobile />
                    </div>
                </div>

                <div id="main" className='overflow-y-scroll'>
                    <div className='hidden md:block'>
                    <Routes>
                        <Route path="/" exact element={<Home />} />
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/createCampaign" element={<CreateCampaigns />} />
                        <Route path="/contestants" element={<CreateContestant />} />
                        <Route path="/viewCampaigns" element={<View />} />
                        <Route path="/statistics" element={<Statistics />} />
                        <Route path="/editPage/:index" element={<Edit />} />
                        <Route path="*" element={<NotFound />} /> {/* Optional 404 handler */}
                    </Routes>
                    </div>
<div className=''>
    <div className='block md:hidden'>
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/createCampaign' element={<CreateCampaigns />} />
            <Route path='/contestants' element={<CreateContestant />} />
            <Route path='/viewCampaigns' element={<View />} />
            <Route path='/statistics' element={<Statistics />} />
            <Route path='/editPage/:index' element={<Edit />} />
            <Route path='*' element={<NotFound />} />
        </Routes>
    </div>
</div>
                </div>

                <footer id="footer">
                    <Time />
                </footer>
            </div>
        </div>
    );
};

export default AdminPages;