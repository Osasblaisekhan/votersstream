import React from 'react';
import { FiMapPin } from 'react-icons/fi';

const RegionSelector = ({ regions, selectedRegion, onSelect }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
      {regions.map((region) => (
        <button
          key={region}
          onClick={() => onSelect(region)}
          className={`p-3 rounded-lg border-2 transition-all flex items-center justify-center space-x-2 ${
            selectedRegion === region
              ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
              : 'border-gray-200 hover:border-gray-300 text-gray-700 hover:bg-gray-50'
          }`}
        >
          <FiMapPin size={16} />
          <span className="text-sm font-medium">{region}</span>
        </button>
      ))}
    </div>
  );
};

export default RegionSelector;