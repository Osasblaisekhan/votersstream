import React, { useState, useEffect } from 'react';
import { useAuth } from '../Auth/AuthContext';
import { getStoredData, setStoredData, cameroonRegions } from '../utils/mockData';
import Modal from './Modal';

const Vote = () => {
  const { user, updateUser } = useAuth();
  const [campaigns, setCampaigns] = useState([]);
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [selectedRegion, setSelectedRegion] = useState('');
  const [contestants, setContestants] = useState([]);
  const [modal, setModal] = useState({
    isOpen: false,
    title: '',
    message: '',
    type: 'info',
    showConfirm: false,
    onConfirm: null
  });
  const [hasVoted, setHasVoted] = useState(false);

  useEffect(() => {
    // Load campaigns and filter active ones
    const allCampaigns = getStoredData('campaigns', []);
    const now = new Date();
    const activeCampaigns = allCampaigns.filter(campaign => {
      const endDate = new Date(campaign.endDate);
      return endDate > now;
    });
    setCampaigns(activeCampaigns);

    // Check if user has already voted
    setHasVoted(user?.hasVoted || false);
  }, [user]);

  useEffect(() => {
    if (selectedCampaign) {
      const allContestants = getStoredData('contestants', []);
      const campaignContestants = allContestants.filter(c => c.campaignId === selectedCampaign.id);
      setContestants(campaignContestants);
    }
  }, [selectedCampaign]);

  const showModal = (title, message, type = 'info', showConfirm = false, onConfirm = null) => {
    setModal({
      isOpen: true,
      title,
      message,
      type,
      showConfirm,
      onConfirm
    });
  };

  const closeModal = () => {
    setModal({
      isOpen: false,
      title: '',
      message: '',
      type: 'info',
      showConfirm: false,
      onConfirm: null
    });
  };

  const handleVote = (contestant) => {
    if (hasVoted) {
      showModal(
        'Already Voted',
        'You have already voted! Each user can only vote once in the entire system.',
        'warning'
      );
      return;
    }

    if (!selectedRegion) {
      showModal(
        'Region Required',
        'Please select your region first before voting.',
        'warning'
      );
      return;
    }

    // Show confirmation modal
    showModal(
      'Confirm Your Vote',
      `Are you sure you want to vote for ${contestant.name} from ${contestant.party}?\n\nThis action cannot be undone and you will not be able to vote again in any campaign.`,
      'warning',
      true,
      () => processVote(contestant)
    );
  };

  const processVote = (contestant) => {
    // Update vote count in localStorage
    const voteKey = `votes_region_${selectedRegion}_candidate_${contestant.id}`;
    const currentVotes = parseInt(localStorage.getItem(voteKey)) || 0;
    localStorage.setItem(voteKey, (currentVotes + 1).toString());

    // Update user's voting status - mark as voted globally
    const users = getStoredData('users', []);
    const updatedUsers = users.map(u => 
      u.id === user.id 
        ? { 
            ...u, 
            hasVoted: true, 
            votedCampaign: selectedCampaign.id, 
            votedContestant: contestant.id,
            votedRegion: selectedRegion,
            voteTimestamp: new Date().toISOString()
          }
        : u
    );
    setStoredData('users', updatedUsers);

    // Update current user context
    updateUser({
      hasVoted: true,
      votedCampaign: selectedCampaign.id,
      votedContestant: contestant.id,
      votedRegion: selectedRegion,
      voteTimestamp: new Date().toISOString()
    });

    setHasVoted(true);
    showModal(
      'Vote Recorded Successfully!',
      `Thank you for voting for ${contestant.name}!\n\nYour vote has been recorded and you cannot vote again in any campaign.`,
      'success'
    );
  };

  if (hasVoted) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
          <div className="text-green-600 text-6xl mb-4">✅</div>
          <h2 className="text-2xl font-bold text-green-800 mb-2">Vote Recorded Successfully!</h2>
          <p className="text-green-700">
            Thank you for participating in the democratic process. Your vote has been securely recorded.
          </p>
          <p className="text-green-600 text-sm mt-2">
            You cannot vote again in any campaign. Each user is limited to one vote in the entire system.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Cast Your Vote</h1>
        <p className="text-gray-600">Select a campaign, choose your region, and vote for your preferred candidate</p>
      </div>

      {/* Voting Restriction Notice */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <div className="flex items-center space-x-2">
          <div className="text-blue-500 text-xl">ℹ️</div>
          <div>
            <h3 className="font-semibold text-blue-800">Important Notice</h3>
            <p className="text-blue-700 text-sm">
              You can only vote ONCE in the entire system. Once you vote, this action cannot be undone.
            </p>
          </div>
        </div>
      </div>

      {/* Campaign Selection */}
      {campaigns.length > 0 ? (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-900">Select a Campaign</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {campaigns.map((campaign) => (
              <div
                key={campaign.id}
                onClick={() => setSelectedCampaign(campaign)}
                className={`cursor-pointer border-2 rounded-lg p-4 transition-all hover:shadow-md ${
                  selectedCampaign?.id === campaign.id 
                    ? 'border-indigo-500 bg-indigo-50' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <h3 className="font-semibold text-lg text-gray-900 mb-2">{campaign.name}</h3>
                <p className="text-gray-600 text-sm mb-3">{campaign.description}</p>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>Ends: {new Date(campaign.endDate).toLocaleDateString()}</span>
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">Active</span>
                </div>
                {selectedCampaign?.id === campaign.id && (
                  <div className="mt-3 text-sm font-medium text-indigo-600">
                    ✓ Selected for voting
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-8">
            <div className="text-yellow-600 text-6xl mb-4">📅</div>
            <h3 className="text-xl font-semibold text-yellow-800 mb-2">No Active Campaigns</h3>
            <p className="text-yellow-700">
              There are currently no active voting campaigns. Please check back later.
            </p>
          </div>
        </div>
      )}

      {/* Region Selection */}
      {selectedCampaign && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">Select Your Region</h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {cameroonRegions.map((region) => (
              <button
                key={region}
                onClick={() => setSelectedRegion(region)}
                className={`p-3 rounded-lg border-2 transition-all ${
                  selectedRegion === region
                    ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                    : 'border-gray-200 hover:border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                <span className="text-sm font-medium">{region}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Candidate List */}
      {selectedCampaign && selectedRegion && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">
            Candidates for {selectedCampaign.name}
          </h3>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {contestants.map(candidate => (
              <div key={candidate.id} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
                <div className="text-center">
                  <div className="w-24 h-24 mx-auto mb-4 bg-gray-200 rounded-full overflow-hidden">
                    <img 
                      src={candidate.profilePicture} 
                      alt={candidate.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                    <div className="w-full h-full flex items-center justify-center text-gray-400" style={{display: 'none'}}>
                      👤
                    </div>
                  </div>
                  
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">{candidate.name}</h3>
                  <p className="text-sm text-gray-600 mb-2">{candidate.party}</p>
                  <p className="text-xs text-gray-500 mb-4">Origin: {candidate.region}</p>
                  
                  <button
                    onClick={() => handleVote(candidate)}
                    className="w-full py-2 px-4 rounded-lg font-medium transition-colors bg-indigo-600 text-white hover:bg-indigo-700"
                  >
                    Vote for {candidate.name}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Modal */}
      <Modal
        isOpen={modal.isOpen}
        onClose={closeModal}
        title={modal.title}
        message={modal.message}
        type={modal.type}
        showConfirm={modal.showConfirm}
        onConfirm={modal.onConfirm}
      />
    </div>
  );
};

export default Vote;