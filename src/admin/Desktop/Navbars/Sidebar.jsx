import React from 'react';
import { Link } from 'react-router-dom';
import { IoHomeSharp } from "react-icons/io5";
import { MdDashboardCustomize } from "react-icons/md";
import { FaVoteYea } from "react-icons/fa";
import { FcStatistics } from "react-icons/fc";
import { MdCampaign } from "react-icons/md";

const Sidebar = () => {
    return (
        <div>
            <nav className='text-white mt-6 mb-6 hidden md:block'>
                <ul className='flex flex-col gap-20 items-center'>
                                          <Link to={'/admin/'} className='w-40 h-9 text-center border-b-2 flex items-center gap-1 justify-center hover:text-amber-700 cursor-pointer hover:bg-amber-100'>
                           <IoHomeSharp size={25} color='white' />
                       <li>
                           Home
                       </li>
                   </Link>
                   
                   <Link to={'/admin/dashboard'} className='w-40 h-9 text-center border-b-2 flex items-center gap-1 justify-center hover:text-amber-700 cursor-pointer hover:bg-amber-100'>
                           <MdDashboardCustomize size={25} color='white' />
                       <li>
                           Dashboard
                       </li>
                   </Link>
                   
                   <Link to={'/admin/createCampaign'} className='w-40 h-9 text-center border-b-2 flex items-center gap-1 justify-center hover:text-amber-700 cursor-pointer hover:bg-amber-100'>
                           <MdCampaign size={25} color='white' />
                       <li>
                           Create Campaigns
                       </li>
                   </Link>
                   
                   <Link to={'/admin/viewCampaigns'} className='w-40 h-9 text-center border-b-2 flex items-center gap-1 justify-center hover:text-amber-700 cursor-pointer hover:bg-amber-100'>
                           <FaVoteYea size={25} color='white' />
                       <li>
                           View Campaigns
                       </li>
                   </Link>
                   
                   <Link to={'/admin/contestants'} className='w-40 h-9 text-center border-b-2 flex items-center gap-1 justify-center hover:text-amber-700 cursor-pointer hover:bg-amber-100'>
                           <MdCampaign size={25} color='white' />
                       <li>
                           Contestants
                       </li>
                   </Link>
                   
                   <Link to={'/admin/statistics'} className='w-40 h-9 text-center border-b-2 flex items-center gap-1 justify-center hover:text-amber-700 cursor-pointer hover:bg-amber-100'>
                           <FcStatistics size={25} color='white' />
                       <li>
                           Statistics
                       </li>
                   </Link>
                </ul>
            </nav>
        </div>
    );
};

export default Sidebar;