import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import LoadingSpinners from './loading';

import axios from 'axios';

const Edit = () => {
    const [editData, setEditData] = useState({name:'', email:''});
     const [isLoading, setIsloading] = useState(true);
    console.log(editData);
    const navgate = useNavigate();
    const {index} = useParams();
    console.log('yooo khan', index);

    useEffect(()=>{
             setTimeout(()=>{
              setIsloading(false)
             },1000)
          },[]);

    const fetchdata = async()=>{
        try{
            const response = axios.get(`http://localhost:3000/users/${index}`);
            setEditData((await response).data);

        }catch{
            console.log('unable to edit');
        }
    };

    const handleUpdate = async() =>{
        try{
            const response = axios.put(`http://localhost:3000/users/${index}`, editData);
            setEditData((await response).data);
            editData.name('')
            editData.email('')
            console.log('sucess');
            
            
        }catch{
            console.log('unable to update')
        }
    }

   useEffect(()=>{
     fetchdata();
   },[index])
  return (
    <div className='flex flex-col md:flex-row '>
        {
            isLoading ? <div className='text-white'><LoadingSpinners /></div> :

        <form action="#" onSubmit={()=> handleUpdate()} className='flex flex-col md:flex-row gap-4 items-center'>
        <input  className='bg-white border-2  w-80 h-8 border-b-zinc-700' type="text" name="name" value={editData.name}  onChange={(e)=>setEditData({...editData, id:uuidv4(), name:e.target.value, vote:0, active:false})} id="" />
        <input  className='bg-white border-2  w-80 h-8 border-b-zinc-700' type="email" name="name" value={editData.email} onChange={(e)=>setEditData({...editData,id:uuidv4(), email:e.target.value, vote:0, active:false})} id="" />
        <button type='submit' className='bg-green-900 border-amber-400 w-32 h-12 hover:text-white' onClick={()=>navgate('/admin/viewCampaigns')}>Update</button>


        
     </form>
        }
    </div>
  )
}

export default Edit
