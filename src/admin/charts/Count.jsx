import React, { useState } from 'react'
import { BsCart } from 'react-icons/bs';
const Count = () => {
    const [count, setcount] = useState(0);
    console.log(count);
    const handleIcre = () =>{
        if(count<9){
            setcount((prev)=> prev + 1)
        }
        
    }
    const handleDecre = () =>{
     if(count > 1){
         setcount((prev)=> prev - 1)
     }
    }
  return (
    <div>
      <h2>{count} <BsCart /></h2>
      <div className='flex gap-6 '>
      <button id='incr' className='border-2 px-10' onClick={()=>handleIcre()}>incre</button>
      <button id='btn' className='border-2 px-10 btn bg-success' onClick={()=>handleDecre()}>decre</button>
      </div>
    </div>
  )
}

export default Count
