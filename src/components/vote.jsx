import React, { useState, useEffect } from 'react';
import { useAuth } from '../Auth/AuthContext';
import axios from 'axios';
import { cameroonRegions } from '../utils/mockData';
import Modal from './modal';
import VotingRestrictions from './VotingRestrictions';
  //API CALLS
  const API_URL = import.meta.env.VITE_API_URL;

const Vote = () => {
  const { user, updateUser } = useAuth();
  const [campaigns, setCampaigns] = useState([]);
  const [getCampaign, setGetCampaign] = useState([]);
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [selectedRegion, setSelectedRegion] = useState('');
  const [contestants, setContestants] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingContestants, setLoadingContestants] = useState(false);
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
    const fetchCampaigns = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${API_URL}/campaigns`);
        setGetCampaign(response.data);
      } catch (error) {
        showModal('Error', 'Failed to fetch campaigns from server.', 'error');
      } finally {
        setLoading(false);
      }
    };
    fetchCampaigns();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}/users`);
      return response.data;
    } catch (error) {
      showModal('Error', 'Failed to fetch users from server.', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const loadUserData = async () => {
      const users = await fetchUsers();
      if (user) {
        const currentUser = users.find(u => u._id === user._id);
        setHasVoted(currentUser?.hasVoted || false);
      }
    };
    loadUserData();
  }, [user]);

  useEffect(() => {
    const now = new Date();
    const activeCampaigns = getCampaign.filter(campaign => {
      const endDate = new Date(campaign.endDate);
      return endDate > now;
    });
    setCampaigns(activeCampaigns);
  }, [getCampaign]);

  useEffect(() => {
    if (selectedCampaign) {
      const fetchContestants = async () => {
        setLoadingContestants(true);
        try {
          const response = await axios.get(`${API_URL}/contestants`);
          const campaignContestants = response.data.filter(
            c => c.campaignId === selectedCampaign._id
          );
          setContestants(campaignContestants);
        } catch (error) {
          showModal('Error', 'Failed to fetch contestants from server.', 'error');
        } finally {
          setLoadingContestants(false);
        }
      };
      fetchContestants();
    } else {
      setContestants([]);
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

    showModal(
      'Confirm Your Vote',
      `Are you sure you want to vote for ${contestant.name} from ${contestant.party}? This action cannot be undone.`,
      'warning',
      true,
      () => processVote(contestant)
    );
  };

  const processVote = async (contestant) => {
    try {
      await axios.patch(`${API_URL}/users/${user._id}`, {
        hasVoted: true,
        votedCampaign: selectedCampaign._id,
        votedContestant: contestant._id,
        votedRegion: selectedRegion,
        voteTimestamp: new Date().toISOString()
      });
      updateUser({
        ...user,
        hasVoted: true,
        votedCampaign: selectedCampaign._id,
        votedContestant: contestant._id,
        votedRegion: selectedRegion,
        voteTimestamp: new Date().toISOString()
      });
      setHasVoted(true);
      showModal(
        'Vote Recorded Successfully!',
        `Thank you for voting for ${contestant.name}! Your vote has been recorded.`,
        'success'
      );
    } catch {
      showModal('Error', 'Failed to update user voting status in the backend.', 'error');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (hasVoted) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <VotingRestrictions user={user} selectedCampaign={selectedCampaign} />
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
                key={campaign._id}
                onClick={() => setSelectedCampaign(campaign)}
                className={`cursor-pointer border-2 rounded-lg p-4 transition-all ${
                  selectedCampaign?._id === campaign._id 
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
                {selectedCampaign?._id === campaign._id && (
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
          {loadingContestants ? (
            <div className="text-center py-6">Loading candidates...</div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {contestants.map(candidate => (
                <div key={candidate._id} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
                  <div className="text-center">
                    <div className="w-24 h-24 mx-auto mb-4 bg-gray-200 rounded-full overflow-hidden">
                      <div>
                        {candidate.picture ? (
                          <img 
                            src={candidate.picture} 
                            alt={candidate.name}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.target.style.display = 'none';
                              e.target.nextSibling.style.display = 'flex';
                            }}
                          />
                        ) : (
                          <img 
                            src={candidate.p} 
                            alt={candidate.name}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.target.style.display = 'none';
                              e.target.nextSibling.style.display = 'flex';
                            }}
                          />
                        )}
                      </div>
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
          )}
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