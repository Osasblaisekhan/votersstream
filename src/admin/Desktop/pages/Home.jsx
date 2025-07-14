import React, { useEffect, useState } from 'react';
import { getStoredData } from '../../../utils/mockData';
import { FiUsers, FiCalendar, FiBarChart, FiTrendingUp, FiActivity, FiAward } from 'react-icons/fi';
import { MdHowToVote, MdCampaign } from 'react-icons/md';
import LoadingSpinners from './loading';

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalCampaigns: 0,
    activeCampaigns: 0,
    totalVotes: 0,
    votingPercentage: 0,
    topCandidate: null
  });

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    // Calculate comprehensive statistics
    const users = getStoredData('users', []);
    const campaigns = getStoredData('campaigns', []);
    const contestants = getStoredData('contestants', []);
    
    const now = new Date();
    const activeCampaigns = campaigns.filter(c => {
      const endDate = new Date(c.endDate);
      return endDate > now;
    }).length;
    
    const votedUsers = users.filter(u => u.hasVoted).length;
    const votingPercentage = users.length > 0 ? ((votedUsers / users.length) * 100).toFixed(1) : 0;
    
    // Calculate total votes and find top candidate
    let totalVotes = 0;
    let candidateVotes = {};
    
    contestants.forEach(contestant => {
      let contestantTotal = 0;
      for (let i = 1; i <= 10; i++) {
        const votes = parseInt(localStorage.getItem(`votes_region_${i}_candidate_${contestant.id}`)) || 0;
        contestantTotal += votes;
        totalVotes += votes;
      }
      candidateVotes[contestant.id] = { ...contestant, totalVotes: contestantTotal };
    });
    
    const topCandidate = Object.values(candidateVotes).sort((a, b) => b.totalVotes - a.totalVotes)[0];

    setStats({
      totalUsers: users.length,
      totalCampaigns: campaigns.length,
      activeCampaigns,
      totalVotes,
      votingPercentage,
      topCandidate
    });
  }, []);

  const dashboardCards = [
    {
      title: 'Total Registered Users',
      value: stats.totalUsers,
      icon: FiUsers,
      color: 'bg-blue-500',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600'
    },
    {
      title: 'Active Campaigns',
      value: stats.activeCampaigns,
      icon: MdCampaign,
      color: 'bg-green-500',
      bgColor: 'bg-green-50',
      textColor: 'text-green-600'
    },
    {
      title: 'Total Votes Cast',
      value: stats.totalVotes,
      icon: MdHowToVote,
      color: 'bg-purple-500',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-600'
    },
    {
      title: 'Voting Participation',
      value: `${stats.votingPercentage}%`,
      icon: FiTrendingUp,
      color: 'bg-orange-500',
      bgColor: 'bg-orange-50',
      textColor: 'text-orange-600'
    }
  ];

  return (
    <div className='min-h-full p-6'>
      {isLoading ? (
        <div className='flex flex-col items-center justify-center min-h-[400px]'>
          <LoadingSpinners />
          <p className='text-white mt-4 text-lg'>Loading Dashboard...</p>
        </div>
      ) : (
        <div className='space-y-8'>
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-white mb-2">Admin Dashboard</h1>
            <p className="text-gray-300 text-lg">Comprehensive overview of your voting platform</p>
          </div>

          {/* Stats Cards */}
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
            {dashboardCards.map((card, index) => (
              <div key={index} className='bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300'>
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-lg ${card.color}`}>
                    <card.icon size={24} className="text-white" />
                  </div>
                  <div className="text-right">
                    <p className="text-3xl font-bold text-gray-900">{card.value}</p>
                  </div>
                </div>
                <h3 className="text-sm font-medium text-gray-600">{card.title}</h3>
              </div>
            ))}
          </div>

          {/* Quick Overview */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* System Status */}
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                <FiActivity className="mr-2 text-green-600" />
                System Status
              </h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <span className="text-gray-700">Platform Status</span>
                  <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                    ✅ Online
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                  <span className="text-gray-700">Database</span>
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                    ✅ Connected
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                  <span className="text-gray-700">Security</span>
                  <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">
                    ✅ Secure
                  </span>
                </div>
              </div>
            </div>

            {/* Top Performing Candidate */}
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                <FiAward className="mr-2 text-yellow-600" />
                Leading Candidate
              </h2>
              {stats.topCandidate && stats.topCandidate.totalVotes > 0 ? (
                <div className="text-center">
                  <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FiAward className="text-yellow-600" size={32} />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">{stats.topCandidate.name}</h3>
                  <p className="text-gray-600 mb-2">{stats.topCandidate.party}</p>
                  <div className="bg-yellow-50 rounded-lg p-3">
                    <p className="text-2xl font-bold text-yellow-600">{stats.topCandidate.totalVotes}</p>
                    <p className="text-sm text-gray-600">Total Votes</p>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <FiBarChart className="mx-auto text-gray-400 mb-4" size={48} />
                  <p className="text-gray-500">No votes recorded yet</p>
                </div>
              )}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
              <FiCalendar className="mr-2 text-indigo-600" />
              Platform Overview
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Total Campaigns</h3>
                <p className="text-3xl font-bold text-indigo-600">{stats.totalCampaigns}</p>
                <p className="text-sm text-gray-600 mt-1">All time campaigns</p>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">User Engagement</h3>
                <p className="text-3xl font-bold text-green-600">{stats.votingPercentage}%</p>
                <p className="text-sm text-gray-600 mt-1">Users who voted</p>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">System Health</h3>
                <p className="text-3xl font-bold text-green-600">100%</p>
                <p className="text-sm text-gray-600 mt-1">Uptime status</p>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Quick Actions</h2>
            <div className="grid md:grid-cols-4 gap-4">
              <button className="p-4 bg-indigo-50 rounded-lg hover:bg-indigo-100 transition-colors text-left">
                <MdCampaign className="text-indigo-600 mb-2" size={24} />
                <h3 className="font-medium text-gray-900">Create Campaign</h3>
                <p className="text-sm text-gray-600">Start new voting</p>
              </button>
              
              <button className="p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors text-left">
                <FiUsers className="text-green-600 mb-2" size={24} />
                <h3 className="font-medium text-gray-900">Add Contestants</h3>
                <p className="text-sm text-gray-600">Manage participants</p>
              </button>
              
              <button className="p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors text-left">
                <FiBarChart className="text-purple-600 mb-2" size={24} />
                <h3 className="font-medium text-gray-900">View Analytics</h3>
                <p className="text-sm text-gray-600">Check results</p>
              </button>
              
              <button className="p-4 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors text-left">
                <FiTrendingUp className="text-orange-600 mb-2" size={24} />
                <h3 className="font-medium text-gray-900">Export Data</h3>
                <p className="text-sm text-gray-600">Download reports</p>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;