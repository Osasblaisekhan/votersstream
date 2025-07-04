// import React from 'react';
// import regions from './regions'; // Import the regions data

// const Results = () => {
//   return (
//     <div>
//       <h2>Voting Results</h2>
//       {regions.map(region => (
//         <div key={region.id}>
//           <h3>Results for {region.name}</h3>
//           <ul>
//             {region.candidates.map(candidate => (
//               <li key={candidate.id}>
//                 {candidate.name} ({candidate.party}) - Votes: {candidate.votes}
//               </li>
//             ))}
//           </ul>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default Results;


// // import React from 'react';
// // import regions from './regions'; // Import the regions data

// // const Results = () => {
// //   const region = regions.find(region => region.name === 'Adamawa'); // Change to the desired region

// //   const candidates = region.candidates || [];
// //   const sortedCandidates = [...candidates].sort((a, b) => b.votes - a.votes);

// //   return (
// //     <div>
// //       <h2>Results for {region.name}</h2>
// //       <ul>
// //         {sortedCandidates.length > 0 ? (
// //           sortedCandidates.map(candidate => (
// //             <li key={candidate.id}>
// //               {candidate.name} ({candidate.party}) - Votes: {candidate.votes}
// //             </li>
// //           ))
// //         ) : (
// //           <li>No candidates available.</li>
// //         )}
// //       </ul>
// //     </div>
// //   );
// // };

// // export default Results;
import React, { useEffect, useState } from 'react';
import { createCandidates } from './regions';

const Results = () => {
  const [regions, setRegions] = useState([]);

  useEffect(() => {
    const updatedRegions = [
      { id: 1, name: 'Littoral', candidates: createCandidates(1) },
      { id: 2, name: 'Centre', candidates: createCandidates(2) },
      { id: 3, name: 'Southwest', candidates: createCandidates(3) },
      { id: 4, name: 'West', candidates: createCandidates(4) },
      { id: 5, name: 'Northwest', candidates: createCandidates(5) },
      { id: 6, name: 'North', candidates: createCandidates(6) },
      { id: 7, name: 'South', candidates: createCandidates(7) },
      { id: 8, name: 'East', candidates: createCandidates(8) },
      { id: 9, name: 'Adamawa', candidates: createCandidates(9) },
      { id: 10, name: 'Far North', candidates: createCandidates(10) }
    ];
    setRegions(updatedRegions);
  }, []);

  return (
    <div>
      <h2>Voting Results</h2>
      {regions.map(region => (
        <div key={region.id}>
          <h3>Results for {region.name}</h3>
          <ul>
            {region.candidates.map(candidate => (
              <li key={candidate.id}>
                {candidate.name} ({candidate.party}) - Votes: {candidate.votes}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default Results;
