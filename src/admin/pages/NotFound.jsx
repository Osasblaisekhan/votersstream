import React from 'react'
import { Link } from 'react-router-dom'

Link

const NotFound = () => {
  return (
    <div className='hidden md:block flex-col items-center justify-center mt-8 ml-14 w-2xl h-60 border-4 border-amber-300 bg-white'>
      <div className='text-center flex flex-col gap-4'>
        <h2 className='font-bold text-4xl'>
            WHOOPS, THAT PAGE IS GONE
        </h2>
        <h3 className='text-center font-bold text-8xl text-red-600'>404</h3>
        <h4><Link to={'/'} className='underline text-center text-blue-700'>Go Back To Home Page</Link></h4>

      </div>
    </div>
  )
}

export default NotFound
