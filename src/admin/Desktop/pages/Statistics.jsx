import React, { useEffect, useState } from 'react';
import { getStoredData, cameroonRegions } from '../../../utils/mockData';
import axios from 'axios';
import { FiUsers, FiBarChart, FiTrendingUp, FiActivity, FiMapPin, FiCalendar } from 'react-icons/fi';
import { MdHowToVote } from 'react-icons/md';
import LoadingSpinners from './loading';

const Statistics = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalCampaigns: 0,
    activeCampaigns: 0,
    totalVotes: 0,
    votingPercentage: 0,
    regionalStats: {},
    campaignStats: []
  });

  useEffect(() => {
    const fetchStats = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const users = getStoredData('users', []);
        const [campaignsRes, contestantsRes] = await Promise.all([
          axios.get('http://localhost:5001/campaigns'),
          axios.get('http://localhost:5001/contestants'),
        ]);
        const campaigns = campaignsRes.data;
        const contestants = contestantsRes.data;

        const now = new Date();
        const activeCampaigns = campaigns.filter(c => {
          const endDate = new Date(c.endDate);
          return endDate > now;
        }).length;

        const votedUsers = users.filter(u => u.hasVoted).length;
        const votingPercentage = users.length > 0 ? ((votedUsers / users.length) * 100).toFixed(1) : 0;

        // Calculate regional statistics
        const regionalStats = {};
        cameroonRegions.forEach(region => {
          let regionVotes = 0;
          contestants.forEach(contestant => {
            const votes = parseInt(localStorage.getItem(`votes_region_${region}_candidate_${contestant.id}`)) || 0;
            regionVotes += votes;
          });
          regionalStats[region] = regionVotes;
        });

        // Calculate total votes
        const totalVotes = Object.values(regionalStats).reduce((sum, votes) => sum + votes, 0);

        // Calculate campaign statistics
        const campaignStats = campaigns.map(campaign => {
          const campaignContestants = contestants.filter(c => c.campaignId === campaign.id);
          let campaignVotes = 0;
          campaignContestants.forEach(contestant => {
            cameroonRegions.forEach(region => {
              const votes = parseInt(localStorage.getItem(`votes_region_${region}_candidate_${contestant.id}`)) || 0;
              campaignVotes += votes;
            });
          });
          return {
            ...campaign,
            totalVotes: campaignVotes,
            contestants: campaignContestants.length
          };
        });

        setStats({
          totalUsers: users.length,
          totalCampaigns: campaigns.length,
          activeCampaigns,
          totalVotes,
          votingPercentage,
          regionalStats,
          campaignStats
        });
      } catch (err) {
        setError('Failed to load statistics. Please check your connection or try again later.');
        setStats({
          totalUsers: 0,
          totalCampaigns: 0,
          activeCampaigns: 0,
          totalVotes: 0,
          votingPercentage: 0,
          regionalStats: {},
          campaignStats: []
        });
      } finally {
        setIsLoading(false);
      }
    };
    fetchStats();
  }, []);


  if (isLoading) {
    return (
      <div className='flex flex-col items-center justify-center min-h-[400px]'>
        <LoadingSpinners />
        <p className='text-gray-700 mt-4 text-lg animate-pulse'>Loading Statistics, please wait...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className='flex flex-col items-center justify-center min-h-[400px]'>
        <FiBarChart size={48} className='text-red-400 mb-4 animate-bounce' />
        <p className='text-red-600 text-lg font-semibold mb-2'>Error Loading Statistics</p>
        <p className='text-gray-500'>{error}</p>
        <button
          onClick={() => window.location.reload()}
          className='mt-6 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors'
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-sm">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Platform Statistics</h2>
        <p className="text-gray-600">Comprehensive overview of voting platform performance</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm">Total Users</p>
              <p className="text-3xl font-bold">{stats.totalUsers}</p>
            </div>
            <FiUsers size={32} className="text-blue-200" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm">Active Campaigns</p>
              <p className="text-3xl font-bold">{stats.activeCampaigns}</p>
            </div>
            <FiActivity size={32} className="text-green-200" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm">Total Votes</p>
              <p className="text-3xl font-bold">{stats.totalVotes}</p>
            </div>
            <MdHowToVote size={32} className="text-purple-200" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-100 text-sm">Participation</p>
              <p className="text-3xl font-bold">{stats.votingPercentage}%</p>
            </div>
            <FiTrendingUp size={32} className="text-orange-200" />
          </div>
        </div>
      </div>

      {/* Regional Statistics */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
          <FiMapPin className="mr-2" />
          Regional Voting Statistics
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {cameroonRegions.map(region => (
            <div key={region} className="bg-gray-50 rounded-lg p-4 text-center">
              <h4 className="font-medium text-gray-900 mb-2">{region}</h4>
              <p className="text-2xl font-bold text-indigo-600">{stats.regionalStats[region] || 0}</p>
              <p className="text-sm text-gray-600">votes</p>
            </div>
          ))}
        </div>
      </div>

      {/* Campaign Performance */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
          <FiCalendar className="mr-2" />
          Campaign Performance
        </h3>
        <div className="space-y-4">
          {stats.campaignStats.map(campaign => (
            <div key={campaign.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-semibold text-gray-900">{campaign.name}</h4>
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <span>{campaign.contestants} contestants</span>
                  <span className="font-semibold text-indigo-600">{campaign.totalVotes} votes</span>
                </div>
              </div>
              <p className="text-gray-600 text-sm mb-2">{campaign.description}</p>
              <div className="flex items-center text-sm text-gray-500">
                <span>Period: {new Date(campaign.startDate).toLocaleDateString()} - {new Date(campaign.endDate).toLocaleDateString()}</span>
              </div>
            </div>
          ))}
          
          {stats.campaignStats.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <FiCalendar size={48} className="mx-auto mb-4 text-gray-400" />
              <p>No campaigns created yet</p>
            </div>
          )}
        </div>
      </div>

      {/* System Health */}
      <div>
        <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
          <FiBarChart className="mr-2" />
          System Health
        </h3>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <h4 className="font-medium text-green-800">Platform Status</h4>
            </div>
            <p className="text-green-700">System operational</p>
          </div>
          
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <h4 className="font-medium text-blue-800">Data Storage</h4>
            </div>
            <p className="text-blue-700">All data secured</p>
          </div>
          
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
              <h4 className="font-medium text-purple-800">User Activity</h4>
            </div>
            <p className="text-purple-700">{stats.votingPercentage}% engagement</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Statistics;