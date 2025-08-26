import React from 'react';
import { FiUser } from 'react-icons/fi';

const CandidateList = ({ candidates, onVote, disabled, selectedRegion }) => {
  if (candidates.length === 0) {
    return (
      <div className="text-center py-12">
        <FiUser size={48} className="mx-auto text-gray-400 mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">No candidates available</h3>
        <p className="text-gray-500">There are no candidates for this campaign yet.</p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {candidates.map(candidate => (
        <div key={candidate._id} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
          <div className="text-center">
            <div className="w-24 h-24 mx-auto mb-4 bg-gray-200 rounded-full overflow-hidden">
              {candidate.profilePicture ? (
                <img 
                  src={candidate.profilePicture} 
                  alt={candidate.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <FiUser size={32} className="text-gray-400" />
                </div>
              )}
            </div>
            
            <h3 className="text-lg font-semibold text-gray-900 mb-1">{candidate.name}</h3>
            <p className="text-sm text-gray-600 mb-2">{candidate.party}</p>
            <p className="text-xs text-gray-500 mb-4">Origin: {candidate.region}</p>
            
            <button
              onClick={() => onVote(candidate)}
              disabled={disabled}
              className={`w-full py-2 px-4 rounded-lg font-medium transition-colors ${
                disabled
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-indigo-600 text-white hover:bg-indigo-700'
              }`}
            >
              {disabled ? 'Voted' : 'Vote'}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CandidateList;