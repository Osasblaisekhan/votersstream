import React, { useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import LoadingSpinners from './loading';

const Dashboard = () => {
      const [isLoading, setIsloading] = useState(true);

      const navigate = useNavigate(); 
    
      useEffect(()=>{
         setTimeout(()=>{
          setIsloading(false)
         },1000)
      },[]);
  return (
    <div className='flex flex-col items-center justify-center '>
      {
        isLoading ?
        <div>
         <LoadingSpinners />
        </div>:
        <div className='md:grid khan:grid-cols-3 osas:grid-cols-2  gap-8 items-center justify-center flex flex-col'>

         <div onClick={()=> navigate('/admin')} className='w-64 h-40 bg-white rounded-3xl  border-none shadow-2xl shadow-amber-700'>

         </div>

         
         <div onClick={()=> navigate('/admin/dashboard')} className='w-64 h-40 bg-white rounded-3xl  border-none shadow-2xl shadow-amber-700'>

         </div>

           <div onClick={()=> navigate('/admin/createCampaign')} className='h-40 w-64 bg-white rounded-3xl border-none shadow-2xl shadow-amber-700'>

         </div>

           <div onClick={()=> navigate('/admin/createContestants')} className='w-64 h-40 bg-white rounded-3xl border-none shadow-2xl shadow-amber-700'>

         </div>

           <div onClick={()=> navigate('/admin/viewCampaigns')} className='w-64 h-40 bg-white rounded-3xl border-none shadow-2xl shadow-amber-700'>

         </div>

              <div onClick={()=> navigate('/admin/statistics')} className='w-64 h-40 bg-white rounded-3xl border-none shadow-2xl shadow-amber-700'>

         </div>
        </div>
      }
    </div>
  )
}

export default Dashboard
