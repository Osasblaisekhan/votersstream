// src/admin/Mobile/MobileHamburger.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import Hamburger from 'hamburger-react';
import { IoHomeSharp } from "react-icons/io5";
import { MdDashboardCustomize } from "react-icons/md";
import { FaVoteYea } from "react-icons/fa";
import { FcStatistics } from "react-icons/fc";
import { MdCampaign } from "react-icons/md";
import { useToggle } from './ToggleContext';

const MobileHamburger = () => {
    const { isToggle, setIsToggle } = useToggle();

    return (
        <div>
            <Hamburger
                size={25}
                color='white'
                toggled={isToggle}
                onToggle={() => setIsToggle((prev) => !prev)}
            />

            {isToggle && (
                <div className='flex flex-col justify-center items-center z-50'>
                    <nav className='text-white mt-6 flex flex-col mb-6 md:hidden'>
                        <ul className='flex flex-col gap-12 items-center justify-center'>

                         <Link to={'/admin/'} onClick={()=>setIsToggle(false)} className='w-40 h-9 text-center border-b-2 flex items-center gap-1 justify-center hover:text-amber-700 cursor-pointer hover:bg-amber-100'>
        <IoHomeSharp size={25} color='white' />
    <li>
        Home
    </li>
</Link>

<Link to={'/admin/dashboard'} onClick={()=>setIsToggle(false)} className='w-40 h-9 text-center border-b-2 flex items-center gap-1 justify-center hover:text-amber-700 cursor-pointer hover:bg-amber-100'>
        <MdDashboardCustomize size={25} color='white' />
    <li>
        Dashboard
    </li>
</Link>

<Link to={'/admin/createCampaign'} onClick={()=>setIsToggle(false)} className='w-40 h-9 text-center border-b-2 flex items-center gap-1 justify-center hover:text-amber-700 cursor-pointer hover:bg-amber-100'>
        <MdCampaign size={25} color='white' />
    <li>
        Create Campaigns
    </li>
</Link>

<Link to={'/admin/viewCampaigns'} onClick={()=>setIsToggle(false)} className='w-40 h-9 text-center border-b-2 flex items-center gap-1 justify-center hover:text-amber-700 cursor-pointer hover:bg-amber-100'>
        <FaVoteYea size={25} color='white' />
    <li>
        View Campaigns
    </li>
</Link>

<Link to={'/admin/contestants'} onClick={()=>setIsToggle(false)} className='w-40 h-9 text-center border-b-2 flex items-center gap-1 justify-center hover:text-amber-700 cursor-pointer hover:bg-amber-100'>
        <MdCampaign size={25} color='white' />
    <li>
        Contestants
    </li>
</Link>

<Link to={'/admin/statistics'} onClick={()=>setIsToggle(false)} className='w-40 h-9 text-center border-b-2 flex items-center gap-1 justify-center hover:text-amber-700 cursor-pointer hover:bg-amber-100'>
        <FcStatistics size={25} color='white' />
    <li>
        Statistics
    </li>
</Link>
                        </ul>
                    </nav>
                </div>
            )}
        </div>
    );
};

export default MobileHamburger;