import React from 'react'

import { Link } from 'react-router-dom'

const Sidebar = () => {
  return (
    <div>
    <nav className='text-white mt-6 mb-6'>
      <ul className='flex flex-col gap-6  items-center'>
        
       <li className='w-40 h-9 text-center border-b-2 hover:text-amber-700 cursor-pointer hover:bg-amber-100'> <Link to={'/'}>Home</Link></li>
       <li className='w-40 h-9 text-center border-b-2 hover:text-amber-700 cursor-pointer hover:bg-amber-100'> <Link to={'/dashboard'}>Dashboard</Link></li>
       <li className='w-40 h-9 text-center border-b-2 hover:text-amber-700 cursor-pointer hover:bg-amber-100'> <Link to={'/createCampaign'}>Create Campaigns</Link></li>
       <li className='w-40 h-9 text-center border-b-2 hover:text-amber-700 cursor-pointer hover:bg-amber-100'> <Link to={'/createContestants'}>Create Contestants</Link></li>
       <li className='w-40 h-9 text-center border-b-2 hover:text-amber-700 cursor-pointer hover:bg-amber-100'> <Link to={'/viewCampaigns'}>View Campaigns</Link></li>
       <li className='w-40 h-9 text-center border-b-2 hover:text-amber-700 cursor-pointer hover:bg-amber-100'> <Link to={'/statistics'}>Statistics</Link></li>

        <li className='w-40 h-9 text-center border-b-2'>Home</li>
        <li className='w-40 h-9 text-center border-b-2'>Dashbord</li>
        <li className='w-40 h-9 text-center border-b-2'>Create Campaigns</li>
        <li className='w-40 h-9 text-center border-b-2'>Creat Contestants</li>
        <li className='w-40 h-9 text-center border-b-2'>View Campaigns</li>
        <li className='w-40 h-9 text-center border-b-2'>Statistics</li>

        <li className='w-40 h-9 text-center border-b-2'>Home</li>
        <li className='w-40 h-9 text-center border-b-2'>Dashbord</li>
        <li className='w-40 h-9 text-center border-b-2'>Create Campaigns</li>
        <li className='w-40 h-9 text-center border-b-2'>Creat Contestants</li>
        <li className='w-40 h-9 text-center border-b-2'>View Campaigns</li>
        <li className='w-40 h-9 text-center border-b-2'>Statistics</li>
      </ul>
    </nav>
    </div>
  )
}

export default Sidebar
