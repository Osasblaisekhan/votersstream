import React from 'react';
import { Link } from 'react-router-dom';
import Hamburger from 'hamburger-react';
import { IoHomeSharp } from "react-icons/io5";
import { MdCampaign } from "react-icons/md";
import { FcStatistics } from "react-icons/fc";
import { FiUsers, FiBarChart } from "react-icons/fi";
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
                        <ul className='flex flex-col gap-8 items-center justify-center'>
                            <Link to={'/admin/'} onClick={()=>setIsToggle(false)} className='w-40 h-9 text-center border-b-2 flex items-center gap-1 justify-center hover:text-amber-700 cursor-pointer hover:bg-amber-100 transition-colors'>
                                <IoHomeSharp size={20} color='white' />
                                <li>Home</li>
                            </Link>

                            <Link to={'/admin/campaigns'} onClick={()=>setIsToggle(false)} className='w-40 h-9 text-center border-b-2 flex items-center gap-1 justify-center hover:text-amber-700 cursor-pointer hover:bg-amber-100 transition-colors'>
                                <MdCampaign size={20} color='white' />
                                <li>Campaigns</li>
                            </Link>

                            <Link to={'/admin/contestants'} onClick={()=>setIsToggle(false)} className='w-40 h-9 text-center border-b-2 flex items-center gap-1 justify-center hover:text-amber-700 cursor-pointer hover:bg-amber-100 transition-colors'>
                                <FiUsers size={20} color='white' />
                                <li>Contestants</li>
                            </Link>

                            <Link to={'/admin/analytics'} onClick={()=>setIsToggle(false)} className='w-40 h-9 text-center border-b-2 flex items-center gap-1 justify-center hover:text-amber-700 cursor-pointer hover:bg-amber-100 transition-colors'>
                                <FiBarChart size={20} color='white' />
                                <li>Analytics</li>
                            </Link>

                            <Link to={'/admin/statistics'} onClick={()=>setIsToggle(false)} className='w-40 h-9 text-center border-b-2 flex items-center gap-1 justify-center hover:text-amber-700 cursor-pointer hover:bg-amber-100 transition-colors'>
                                <FcStatistics size={20} color='white' />
                                <li>Statistics</li>
                            </Link>
                        </ul>
                    </nav>
                </div>
            )}
        </div>
    );
};

export default MobileHamburger;