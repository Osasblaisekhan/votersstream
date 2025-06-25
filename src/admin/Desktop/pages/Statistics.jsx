import React, { useEffect, useState } from 'react'

import LoadingSpinners from './loading';

import Count from '../../charts/Count';

const Statistics = () => {
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
      <h2 className='text-white font-bold'>
        WELCOME TO THE STATISTIC PAGE
        <Count/>
                {/* You can open the modal using document.getElementById('ID').showModal() method */}
<button className="btn hidden md:block" onClick={()=>document.getElementById('my_modal_4').showModal()}>open modal</button>
<dialog id="my_modal_4" className="modal">
  <div className="modal-box w-11/12 max-w-5xl">
    <h3 className="font-bold text-lg text-amber-300">Hello!</h3>
    <p className="py-4 text-8xl text-amber-300">Click the button below to close</p>
    <div className="modal-action">
      <form method="dialog">
        {/* if there is a button, it will close the modal */}
        <button className="btn">Close</button>
      </form>
    </div>
  </div>
</dialog>
      </h2>
      }
    </div>
  )
}

export default Statistics
