import React, { useEffect, useState } from 'react'

const App = () => {

  const [img, setImg] = useState(()=>{
    const picture = localStorage.getItem('pic');
    return picture ? JSON.parse(picture) : null
  });


  useEffect(()=>{
    localStorage.setItem('pic', JSON.stringify(img))
  },[img])
  const handleImage = (e) =>{
    const image = e.target.files[0];
    if(image){
      const pic = URL.createObjectURL(image);
      setImg(pic)
    }
  }

  
  return (
    <div>
      <h2 className='text-7xl text-center text-amber-600 font-extrabold'>HELLO WORLD</h2>

      <input className={img && 'hidden'} type="file" accept='image/*' onChange={(e)=>handleImage(e)}/>

      {
        img && <img src={img} alt='khan'/>
      }


    </div>
  )
}

export default App





// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <div>
//         <a href="https://vite.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.jsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   )
// }

// export default App
