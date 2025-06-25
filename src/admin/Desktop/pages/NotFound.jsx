import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => {
          const [isLoading, setIsloading] = useState(true)
        
          useEffect(()=>{
            const fakeLoading = ()=>{
             setTimeout(()=>{
              setIsloading(false)
             },3000)
            }
            fakeLoading()
          },[]);
  return (
    <div className='flex flex-col justify-center items-center'>
   
      {
        isLoading ?
         <div>
          <h2 className='text-4xl text-center mt-10 text-blue-400 font-bold drop-shadow-md'>Searching...</h2>
        </div>:
         <div className='flex w-[355px] flex-col items-center justify-center mt-8  md:w-2xl md:h-60 border-4 border-amber-300 bg-white'>
      <div className={isLoading ? 'opacity-0' : 'text-center flex flex-col gap-4'}>
        <h2 className='font-bold text-4xl'>
            WHOOPS, THAT PAGE IS GONE
        </h2>
        <h3 className='text-center font-bold text-4xl md:text-8xl text-red-600'>404</h3>
        <h4><Link to={'/admin/'} className='underline text-center text-blue-700'>Go Back To Home Page</Link></h4>

      </div>
    </div>
      }
    </div>
  )
}

export default NotFound
