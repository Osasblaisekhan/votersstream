import React, { useEffect, useState } from 'react';

import axios from 'axios';

import { useNavigate } from 'react-router-dom';

import LoadingSpinners from './loading';

import { v4 as uuidv4 } from 'uuid';

const CreateCampaigns = () => {

  const [isLoading, setIsloading] = useState(true);

  const navigate = useNavigate();

  const [newUser, setNewUser] = useState({name:'', email:''});
  console.log(newUser);

  const handleSubmitData = async ()=>{
   
 try{
    const response = axios.post('http://localhost:3000/users', newUser);
    return response;
 } 

 catch{
  console.log('unable to post')
 }
  }
  
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
        <div className='flex flex-col items-center justify-center'>
          <form action="" onSubmit={()=>handleSubmitData()}>
            <div className='flex gap-4 md:flex-row flex-col'>
            <input className='bg-white border-2  w-80 h-8 border-b-zinc-700' type="text" name="name" id=""  required placeholder='name' onChange={(e)=> setNewUser({...newUser,   id:uuidv4(), vote:0, active:false, name:e.target.value})}  />
             <input className='bg-white border-2 w-80 h-8 border-b-zinc-700' type="email" name="email" id="" required  placeholder='email'onChange={(e)=> setNewUser({...newUser, id:uuidv4(), vote:0, active:false, email:e.target.value})} />

            </div>
            <button onClick={()=> navigate('/admin/viewCampaigns')} className='bg-green-900 border-amber-400 w-32 h-12 hover:text-white' type="submit">Add data</button>
          </form>
        </div>
      }
    </div>
  )
}

export default CreateCampaigns
