import React, { useState, useEffect } from 'react';
import { getStoredData } from '../../../utils/mockData';
import { FiDownload, FiUsers, FiMail, FiCalendar, FiCheckCircle, FiXCircle } from 'react-icons/fi';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all'); // all, voted, not-voted

  useEffect(() => {
    const allUsers = getStoredData('users', []);
    setUsers(allUsers);
    setFilteredUsers(allUsers);
  }, []);

  useEffect(() => {
    let filtered = users;

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(user => 
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply voting status filter
    if (filterType === 'voted') {
      filtered = filtered.filter(user => user.hasVoted);
    } else if (filterType === 'not-voted') {
      filtered = filtered.filter(user => !user.hasVoted);
    }

    setFilteredUsers(filtered);
  }, [users, searchTerm, filterType]);

  const exportUserData = () => {
    const userData = users.map(user => ({
      name: user.name,
      email: user.email,
      hasVoted: user.hasVoted,
      votedCampaign: user.votedCampaign,
      votedContestant: user.votedContestant,
      votedRegion: user.votedRegion,
      voteTimestamp: user.voteTimestamp,
      createdAt: user.createdAt
    }));
    
    const dataStr = JSON.stringify(userData, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `user_data_${new Date().toISOString().split('T')[0]}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  const exportEmailList = () => {
    const emails = users.map(user => user.email).join('\n');
    const dataUri = 'data:text/plain;charset=utf-8,'+ encodeURIComponent(emails);
    
    const exportFileDefaultName = `user_emails_${new Date().toISOString().split('T')[0]}.txt`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  const getVotingStats = () => {
    const totalUsers = users.length;
    const votedUsers = users.filter(u => u.hasVoted).length;
    const notVotedUsers = totalUsers - votedUsers;
    const votingPercentage = totalUsers > 0 ? ((votedUsers / totalUsers) * 100).toFixed(1) : 0;

    return { totalUsers, votedUsers, notVotedUsers, votingPercentage };
  };

  const stats = getVotingStats();

  return (
    <div className="p-6 bg-white rounded-lg shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">User Management</h2>
        <div className="flex space-x-3">
          <button
            onClick={exportEmailList}
            className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <FiMail size={20} />
            <span>Export Emails</span>
          </button>
          <button
            onClick={exportUserData}
            className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
          >
            <FiDownload size={20} />
            <span>Export All Data</span>
          </button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-blue-50 p-4 rounded-lg">
          <div className="flex items-center space-x-2">
            <FiUsers className="text-blue-600" size={20} />
            <span className="text-blue-800 font-medium">Total Users</span>
          </div>
          <p className="text-2xl font-bold text-blue-900">{stats.totalUsers}</p>
        </div>
        
        <div className="bg-green-50 p-4 rounded-lg">
          <div className="flex items-center space-x-2">
            <FiCheckCircle className="text-green-600" size={20} />
            <span className="text-green-800 font-medium">Voted</span>
          </div>
          <p className="text-2xl font-bold text-green-900">{stats.votedUsers}</p>
        </div>
        
        <div className="bg-red-50 p-4 rounded-lg">
          <div className="flex items-center space-x-2">
            <FiXCircle className="text-red-600" size={20} />
            <span className="text-red-800 font-medium">Not Voted</span>
          </div>
          <p className="text-2xl font-bold text-red-900">{stats.notVotedUsers}</p>
        </div>
        
        <div className="bg-purple-50 p-4 rounded-lg">
          <div className="flex items-center space-x-2">
            <FiCalendar className="text-purple-600" size={20} />
            <span className="text-purple-800 font-medium">Participation</span>
          </div>
          <p className="text-2xl font-bold text-purple-900">{stats.votingPercentage}%</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="all">All Users</option>
          <option value="voted">Voted Users</option>
          <option value="not-voted">Not Voted Users</option>
        </select>
      </div>

      {/* Users Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-50">
              <th className="border border-gray-200 px-4 py-2 text-left">Name</th>
              <th className="border border-gray-200 px-4 py-2 text-left">Email</th>
              <th className="border border-gray-200 px-4 py-2 text-center">Voting Status</th>
              <th className="border border-gray-200 px-4 py-2 text-left">Vote Details</th>
              <th className="border border-gray-200 px-4 py-2 text-left">Joined</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50">
                <td className="border border-gray-200 px-4 py-2 font-medium">{user.name}</td>
                <td className="border border-gray-200 px-4 py-2">{user.email}</td>
                <td className="border border-gray-200 px-4 py-2 text-center">
                  {user.hasVoted ? (
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      <FiCheckCircle size={12} className="mr-1" />
                      Voted
                    </span>
                  ) : (
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                      <FiXCircle size={12} className="mr-1" />
                      Not Voted
                    </span>
                  )}
                </td>
                <td className="border border-gray-200 px-4 py-2 text-sm">
                  {user.hasVoted ? (
                    <div>
                      <p><strong>Campaign:</strong> {user.votedCampaign}</p>
                      <p><strong>Region:</strong> {user.votedRegion}</p>
                      {user.voteTimestamp && (
                        <p><strong>Voted:</strong> {new Date(user.voteTimestamp).toLocaleDateString()}</p>
                      )}
                    </div>
                  ) : (
                    <span className="text-gray-500">No vote recorded</span>
                  )}
                </td>
                <td className="border border-gray-200 px-4 py-2 text-sm">
                  {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {filteredUsers.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No users found matching your criteria.
          </div>
        )}
      </div>
    </div>
  );
};

export default UserManagement;