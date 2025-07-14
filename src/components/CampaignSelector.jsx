import React from 'react';
import { FiCalendar, FiClock, FiUsers } from 'react-icons/fi';
import { formatDateForDisplay, getDaysRemaining } from '../utils/campaignUtils';

const CampaignSelector = ({ campaigns, onCampaignSelect, selectedCampaign }) => {
  if (campaigns.length === 0) {
    return (
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 text-center">
        <FiCalendar size={48} className="mx-auto text-yellow-400 mb-4" />
        <h3 className="text-lg font-medium text-yellow-800 mb-2">No Active Campaigns</h3>
        <p className="text-yellow-600">There are currently no active voting campaigns available.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Select a Campaign to Vote</h2>
      
      <div className="grid gap-4 md:grid-cols-2">
        {campaigns.map((campaign) => {
          const daysRemaining = getDaysRemaining(campaign.endDate);
          const isSelected = selectedCampaign?.id === campaign.id;
          
          return (
            <div
              key={campaign.id}
              onClick={() => onCampaignSelect(campaign)}
              className={`cursor-pointer border-2 rounded-lg p-4 transition-all hover:shadow-md ${
                isSelected 
                  ? 'border-indigo-500 bg-indigo-50' 
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex justify-between items-start mb-3">
                <h3 className={`font-semibold text-lg ${
                  isSelected ? 'text-indigo-900' : 'text-gray-900'
                }`}>
                  {campaign.name}
                </h3>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  daysRemaining > 7 
                    ? 'bg-green-100 text-green-800'
                    : daysRemaining > 3
                    ? 'bg-yellow-100 text-yellow-800'
                    : 'bg-red-100 text-red-800'
                }`}>
                  {daysRemaining > 0 ? `${daysRemaining} days left` : 'Ending today'}
                </span>
              </div>
              
              <p className={`text-sm mb-3 ${
                isSelected ? 'text-indigo-700' : 'text-gray-600'
              }`}>
                {campaign.description}
              </p>
              
              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <div className="flex items-center space-x-1">
                  <FiCalendar size={14} />
                  <span>Ends: {formatDateForDisplay(campaign.endDate)}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <FiUsers size={14} />
                  <span>{campaign.participants?.length || 0} candidates</span>
                </div>
              </div>
              
              {isSelected && (
                <div className="mt-3 text-sm font-medium text-indigo-600">
                  ✓ Selected for voting
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CampaignSelector;