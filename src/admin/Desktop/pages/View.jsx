import axios from 'axios';
import React, { useEffect, useState } from 'react';
import LoadingSpinners from './loading';
import { Link } from 'react-router-dom';


const View = () => {
        const [isLoading, setIsloading] = useState(true);
        const [user, setUser] = useState([]);
          console.log(user)

          const handleDelete = async(id)=>{
            const confirmation = window.confirm('Are You Sure You Really Want To Delete');
            if(confirmation){
              const response = axios.delete(`http://localhost:3000/users/${id}`)
              setUser((prevUser)=> prevUser.filter((user)=> user.id !== id));
              return response;

            }

          }
            useEffect(()=>{
             
               setTimeout(()=>{
                setIsloading(false)
               },2000)
           

              const fetchdata = async () =>{
                try{
                  const response = axios.get('http://localhost:3000/users');
                  setUser((await response).data)


                }catch{
                  console.log('unable to fetch data')
                }
              }
              fetchdata();
            },[]);
  return (
    <div className='flex flex-col items-center'>
      {
        isLoading ?
        <div>
          
          <LoadingSpinners/>
        </div>:

        <div>

      <h2 className='text-white font-bold'>
        WELCOME TO THE VIEW PAGE
      </h2>
     
<div>

      <div className='flex gap-4 md:flex-row flex-col'>
        {
          user.map((user, index)=>
            <div key={user.id}>
              <h2>
                {user.name}
              </h2>
              <h2>
                {user.email}
              </h2>
           <Link to={`/admin/editPage/${user.id}`}>
              <button className='bg-green-700 border-2 border-amber-400 w-32 h-12 hover:text-white'>Update</button>
           </Link>
              <button onClick={()=>handleDelete(user.id)} className='bg-red-700 border-2 border-amber-400 w-32 h-12 hover:text-white'>
                Delete
              </button>
            </div>
          ) 
        }
      </div>
</div>
        </div>
      }
    </div>
  )
}

export default View
