import React from 'react';
import { FiAlertCircle, FiCheckCircle } from 'react-icons/fi';

const VotingRestrictions = ({ user, selectedCampaign }) => {
  const hasVotedInCampaign = user?.votedCampaign === selectedCampaign?._id; // Ensure using _id
  const hasVotedAnywhere = user?.hasVoted;

  if (hasVotedAnywhere) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
        <div className="flex items-center space-x-2">
          <FiAlertCircle className="text-red-500" size={20} />
          <div>
            <h3 className="font-semibold text-red-800">Voting Completed</h3>
            <p className="text-red-700 text-sm">
              You have already voted in the system. Each user can only vote once across all campaigns.
            </p>
            {hasVotedInCampaign && (
              <p className="text-red-600 text-sm mt-1">
                Your vote was recorded for: <strong>{selectedCampaign?.name}</strong>
              </p>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
      <div className="flex items-center space-x-2">
        <FiCheckCircle className="text-blue-500" size={20} />
        <div>
          <h3 className="font-semibold text-blue-800">Ready to Vote</h3>
          <p className="text-blue-700 text-sm">
            You can vote for one contestant. Once you vote, this action cannot be undone.
          </p>
        </div>
      </div>
    </div>
  );
};

export default VotingRestrictions;