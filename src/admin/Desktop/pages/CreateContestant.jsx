import React, { useEffect, useState } from 'react'
import Calender from './calender';
import LoadingSpinners from './loading';
const CreateContestant = () => {
    const [isLoading, setIsloading] = useState(true)
  
    useEffect(()=>{
       setTimeout(()=>{
        setIsloading(false)
       },3000)
  
    },[]);

  return (
    <div className='block'>
      {
        isLoading ? 
        <div className=''>
         <LoadingSpinners />
        </div>:
        <div>
      <h2 className='text-white font-bold'>
        WELCOME TO CREATE CONTESTANTS
      </h2>
      <Calender />
        </div>
      }
    </div>
  )
}

export default CreateContestant
