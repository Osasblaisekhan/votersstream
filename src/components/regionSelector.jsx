// // src/components/RegionSelector.js
// import React from 'react';

// const RegionSelector = ({ regions, onSelect }) => {
//   return (
//     <div className='region-selector'>
//       <h2>Select Your Region</h2>
//       <select onChange={(e) => onSelect(regions[e.target.value])}>
//         <option value="">--Select a Region--</option>
//         {regions.map((region, index) => (
//           <option key={region.id} value={index}>
//             {region.name}
//           </option>
//         ))}
//       </select>
//     </div>
//   );
// };

// export default RegionSelector;

const RegionSelector = ({ regions, onSelect }) => {
  return (
    <select onChange={(e) => {
      const selected = regions.find(region => region.id === parseInt(e.target.value));
      onSelect(selected);
    }}>
      <option value="">Select a region</option>
      {regions.map(region => (
        <option key={region.id} value={region.id}>{region.name}</option>
      ))}
    </select>
  );
};
export default RegionSelector;