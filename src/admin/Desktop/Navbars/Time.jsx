import React, { useEffect, useState } from 'react'

import { useToggle } from '../../Mobile/MobilePages/ToggleContext';

const Time = () => {

  const {isToggle} = useToggle();

    const [time, setTime] = useState('');



    const displayTime = (Time) => {
        const prop = {
            year:'numeric',
            month:'long',
            day:'numeric',
            hour:'2-digit',
            minute:'2-digit',
            second:'2-digit'
        }
        return Time.toLocaleString('en-US', prop)
    }

    useEffect(()=>{
        setInterval(()=>{
            let d = new Date();
            setTime(()=> displayTime(d))
        })
    },[])
  return (
    <div className={isToggle ? 'hidden' : 'block'}>
      <h3 className='text-white font-bold text-[12px] md:text-[20px]'>{time}</h3>
    </div>
  )
}

export default Time
