// MobileNavbar.js
import React from 'react';

import { useToggle } from '../MobilePages/ToggleContext';

import { Link } from 'react-router-dom';

const MobileNavbar = () => {
    const { isToggle } = useToggle();

    return (
        <nav className=''>
            <div>
                <h2 className={isToggle ? 'hidden' : 'text-white font-bold'}> <Link to={'/'}>DASHBOARD</Link> </h2>
                {/* <p>The toggle is {isToggle === null ? 'undefined' : isToggle ? 'ON' : 'OFF'}</p> */}
            </div>
        </nav>
    );
};

export default MobileNavbar;