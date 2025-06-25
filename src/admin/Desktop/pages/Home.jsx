import React, { useEffect, useState } from 'react';

import LoadingSpinners from './loading';

import AreaChart from '../../charts/AreaChart';
import BarChart from '../../charts/BarChart';

const Home = () => {
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
         <div className='text-white'>
          <LoadingSpinners />
        </div>:
        <div>
      <h2 className='text-white font-bold'>
        WELCOME TO THE HOME PAGE

      </h2>
      <AreaChart />
      <BarChart />
        </div>
      }
    </div>
  )
}

export default Home
