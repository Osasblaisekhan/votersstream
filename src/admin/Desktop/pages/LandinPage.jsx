import React from 'react'
import { Link } from 'react-router-dom'

const LandinPage = () => {
  return (
    <div>
      <h2>hello world</h2>
      <p>Are you an admin? <Link to={'/admin/login'} className='text-blue-800 hover:underline transition-all'>Longin</Link></p>

      <p>Are you a user? <Link to={'/user/login'} className='text-blue-800 hover:underline transition-all'>Longin</Link></p>
    </div>
  )
}

export default LandinPage
