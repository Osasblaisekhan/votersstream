
import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <nav className='header'>
      <h1>Cameroon Presidential Voting 2025</h1>
     <div className='nav-links'> 
      <Link to="/user/">Home</Link>
      <Link to="/user/vote">Vote</Link>
       {/* <Link to="/user/confirmation">Confirmation</Link> */}
        <Link to="/user/results">Results</Link>
        </div>
    </nav>
  );
};

export default Header;