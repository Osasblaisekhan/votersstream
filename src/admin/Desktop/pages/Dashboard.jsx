import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getStoredData } from '../../../utils/mockData';
import { FiUsers, FiCalendar, FiBarChart, FiTrendingUp } from 'react-icons/fi';
import LoadingSpinners from './loading';

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalCampaigns: 0,
    activeCampaigns: 0,
    totalVotes: 0
  });
  const navigate = useNavigate(); 

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    // Calculate statistics
    const users = getStoredData('users', []);
    const campaigns = getStoredData('campaigns', []);
    const contestants = getStoredData('contestants', []);
    
    const activeCampaigns = campaigns.filter(c => c.status === 'active').length;
    
    // Calculate total votes
    let totalVotes = 0;
    contestants.forEach(contestant => {
      for (let i = 1; i <= 10; i++) { // Assuming 10 regions
        const votes = parseInt(localStorage.getItem(`votes_region_${i}_candidate_${contestant.id}`)) || 0;
        totalVotes += votes;
      }
    });

    setStats({
      totalUsers: users.length,
      totalCampaigns: campaigns.length,
      activeCampaigns,
      totalVotes
    });
  }, []);

  const dashboardCards = [
    {
      title: 'Total Users',
      value: stats.totalUsers,
      icon: FiUsers,
      color: 'bg-blue-500',
      route: '/admin/analytics'
    },
    {
      title: 'Total Campaigns',
      value: stats.totalCampaigns,
      icon: FiCalendar,
      color: 'bg-green-500',
      route: '/admin/campaigns'
    },
    {
      title: 'Active Campaigns',
      value: stats.activeCampaigns,
      icon: FiTrendingUp,
      color: 'bg-yellow-500',
      route: '/admin/campaigns'
    },
    {
      title: 'Total Votes',
      value: stats.totalVotes,
      icon: FiBarChart,
      color: 'bg-purple-500',
      route: '/admin/analytics'
    },
    {
      title: 'Manage Campaigns',
      value: 'Create & Edit',
      icon: FiCalendar,
      color: 'bg-indigo-500',
      route: '/admin/campaigns'
    },
    {
      title: 'View Analytics',
      value: 'Reports & Data',
      icon: FiBarChart,
      color: 'bg-red-500',
      route: '/admin/analytics'
    }
  ];

  return (
    <div className='flex flex-col items-center justify-center min-h-full'>
      {isLoading ? (
        <div>
          <LoadingSpinners />
        </div>
      ) : (
        <div className='w-full max-w-6xl'>
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Admin Dashboard</h1>
            <p className="text-gray-300">Manage your voting platform efficiently</p>
          </div>
          
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {dashboardCards.map((card, index) => (
              <div
                key={index}
                onClick={() => navigate(card.route)}
                className='bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:scale-105'
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-lg ${card.color}`}>
                    <card.icon size={24} className="text-white" />
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-gray-900">{card.value}</p>
                    <p className="text-sm text-gray-600">{card.title}</p>
                  </div>
                </div>
                
                <div className="border-t pt-4">
                  <p className="text-sm text-gray-500 hover:text-indigo-600 transition-colors">
                    Click to manage →
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Actions */}
          <div className="mt-8 bg-white rounded-xl p-6 shadow-lg">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button
                onClick={() => navigate('/admin/campaigns')}
                className="p-4 bg-indigo-50 rounded-lg hover:bg-indigo-100 transition-colors text-left"
              >
                <FiCalendar className="text-indigo-600 mb-2" size={20} />
                <h3 className="font-medium text-gray-900">Create Campaign</h3>
                <p className="text-sm text-gray-600">Start a new voting campaign</p>
              </button>
              
              <button
                onClick={() => navigate('/admin/contestants')}
                className="p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors text-left"
              >
                <FiUsers className="text-green-600 mb-2" size={20} />
                <h3 className="font-medium text-gray-900">Add Contestants</h3>
                <p className="text-sm text-gray-600">Manage campaign participants</p>
              </button>
              
              <button
                onClick={() => navigate('/admin/analytics')}
                className="p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors text-left"
              >
                <FiBarChart className="text-purple-600 mb-2" size={20} />
                <h3 className="font-medium text-gray-900">View Reports</h3>
                <p className="text-sm text-gray-600">Analyze voting data</p>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;