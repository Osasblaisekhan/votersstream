import React from 'react';
import { Link } from 'react-router-dom';
import { IoHomeSharp } from "react-icons/io5";
import { MdDashboardCustomize, MdCampaign } from "react-icons/md";
import { FcStatistics } from "react-icons/fc";
import { FiUsers, FiBarChart } from "react-icons/fi";

const Sidebar = () => {
    return (
        <div>
            <nav className='text-white mt-6 mb-6 hidden md:block'>
                <ul className='flex flex-col gap-8 items-center'>
                    <Link to={'/admin/'} className='w-40 h-9 text-center border-b-2 flex items-center gap-1 justify-center hover:text-amber-700 cursor-pointer hover:bg-amber-100 transition-colors'>
                        <IoHomeSharp size={20} color='white' />
                        <li>Home</li>
                    </Link>
                   
                    <Link to={'/admin/campaigns'} className='w-40 h-9 text-center border-b-2 flex items-center gap-1 justify-center hover:text-amber-700 cursor-pointer hover:bg-amber-100 transition-colors'>
                        <MdCampaign size={20} color='white' />
                        <li>Campaigns</li>
                    </Link>
                   
                    <Link to={'/admin/contestants'} className='w-40 h-9 text-center border-b-2 flex items-center gap-1 justify-center hover:text-amber-700 cursor-pointer hover:bg-amber-100 transition-colors'>
                        <FiUsers size={20} color='white' />
                        <li>Contestants</li>
                    </Link>
                   
                    <Link to={'/admin/analytics'} className='w-40 h-9 text-center border-b-2 flex items-center gap-1 justify-center hover:text-amber-700 cursor-pointer hover:bg-amber-100 transition-colors'>
                        <FiBarChart size={20} color='white' />
                        <li>Analytics</li>
                    </Link>
                   
                    <Link to={'/admin/statistics'} className='w-40 h-9 text-center border-b-2 flex items-center gap-1 justify-center hover:text-amber-700 cursor-pointer hover:bg-amber-100 transition-colors'>
                        <FcStatistics size={20} color='white' />
                        <li>Statistics</li>
                    </Link>
                </ul>
            </nav>
        </div>
    );
};

export default Sidebar;