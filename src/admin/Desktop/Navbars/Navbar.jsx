import React from 'react'
import { Link } from 'react-router-dom'


 const Navbar = () => {
  return (
    <nav className=''>
        <div>
          <h2 className='text-white font-bold'><Link to={'/'}>DASHBOARD</Link></h2>
        </div>
    </nav>
  )
}



export default Navbar;

