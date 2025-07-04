// // import React, { useEffect, useState } from 'react';
// // import axios from 'axios';

// // const Fetch = () => {
// //     const [data, setData] = useState([]);
// //     console.log('yoo data', data);
// //     const fetchData = async()=>{
// //         const response = axios.get('http://localhost:3000/users');
// //         setData((await response).data)
// //     };

// //     useEffect(()=>{
// //         fetchData();
// //     },[]);
// //   return (
// //     <div>
// //       <h1>hello khan</h1>
// //       <div className='grid grid-cols-2 gap-4'>
// //         {
// //             data.map((data)=>
// //                 <div key={data.id}>
// //                     <h2>{data.name}</h2>
// //                     <h2>{data.party}</h2>
// //                     <h2>{data.image}</h2>
// //                     <h2>{data.vote}</h2>
// //                 </div>
// //             )
// //         }
// //       </div>
// //     </div>
// //   )
// // }

// // export default Fetch;

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const Fetch = () => {
//     const [data, setData] = useState([]);
//     console.log('yoo data', data);

//     const fetchData = async () => {
//         try {
//             const response = await axios.get('http://localhost:3000/contestants'); 
//             setData(response.data.contestants); 
//         } catch (error) {
//             console.error("Error fetching data:", error);
//         }
//     };

//     useEffect(() => {
//         fetchData();
//     }, []);

//     return (
//         <div>
//             <h1>Hello world</h1>
//             <div className='grid grid-cols-2 gap-4'>
//                 {
//                     data.map(contestant => (
//                         <div key={contestant.id}>
//                             <h2>{contestant.name}</h2>
//                             <h2>{contestant.party}</h2>
//                             <img src={contestant.image} alt={contestant.name} />
//                             <h2>Votes: {contestant.votes}</h2>
//                         </div>
//                     ))
//                 }
//             </div>
//         </div>
//     );
// };

// export default Fetch;
