import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import './Admin.css'; 
import Time from './Navbars/Time';
import Navbar from './Navbars/Navbar';
import Sidebar from './Navbars/Sidebar';
import User from './Navbars/user';
import Home from './pages/Home';
import CampaignManagement from './pages/CampaignManagement';
import ContestantManagement from './pages/ContestantManagement';
import Analytics from './pages/Analytics';
import Statistics from './pages/Statistics';
import NotFound from './pages/NotFound';
import UserMobile from '../Mobile/MobileNav/UserMobile';
import MobileNavbar from '../Mobile/MobileNav/NavMobile';
import MobileHamburger from '../Mobile/MobilePages/MobileHamburger';
import { initializeMockData } from '../../utils/mockData';

const AdminPages = () => {
    useEffect(() => {
        initializeMockData();
    }, []);

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
                            <Route path="/campaigns" element={<CampaignManagement />} />
                            <Route path="/contestants" element={<ContestantManagement />} />
                            <Route path="/analytics" element={<Analytics />} />
                            <Route path="/statistics" element={<Statistics />} />
                            <Route path="*" element={<NotFound />} />
                        </Routes>
                    </div>
                    
                    <div className='block md:hidden'>
                        <Routes>
                            <Route path='/' element={<Home />} />
                            <Route path='/campaigns' element={<CampaignManagement />} />
                            <Route path='/contestants' element={<ContestantManagement />} />
                            <Route path='/analytics' element={<Analytics />} />
                            <Route path='/statistics' element={<Statistics />} />
                            <Route path='*' element={<NotFound />} />
                        </Routes>
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