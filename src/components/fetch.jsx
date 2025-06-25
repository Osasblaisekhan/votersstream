import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Fetch = () => {
    const [data, setData] = useState([]);
    console.log('yoo data', data);
    const fetchData = async()=>{
        const response = axios.get('http://localhost:3000/users');
        setData((await response).data)
    };

    useEffect(()=>{
        fetchData();
    },[]);
  return (
    <div>
      <h1>hello khan</h1>
      <div className='grid grid-cols-2 gap-4'>
        {
            data.map((data)=>
                <div key={data.id}>
                    <h2>{data.name}</h2>
                    <h2>{data.email}</h2>
                </div>
            )
        }
      </div>
    </div>
  )
}

export default Fetch;
