import React, { useState, useEffect } from 'react';
import { getStoredData, cameroonRegions } from '../../../utils/mockData';
import { FiDownload, FiBarChart, FiTrendingUp, FiUsers, FiMapPin, FiCalendar } from 'react-icons/fi';
import Chart from 'react-apexcharts';

const Analytics = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [contestants, setContestants] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedCampaign, setSelectedCampaign] = useState('');
  const [viewType, setViewType] = useState('nationwide');

  useEffect(() => {
    setCampaigns(getStoredData('campaigns', []));
    setContestants(getStoredData('contestants', []));
    setUsers(getStoredData('users', []));
  }, []);

  const getVotingData = () => {
    if (!selectedCampaign) return { nationwide: [], regional: {} };
    
    const campaignContestants = contestants.filter(c => c.campaignId === parseInt(selectedCampaign));
    
    const contestantsWithVotes = campaignContestants.map(contestant => {
      let totalVotes = 0;
      const regionalVotes = {};
      
      cameroonRegions.forEach((region, index) => {
        const votes = parseInt(localStorage.getItem(`votes_region_${region}_candidate_${contestant.id}`)) || 0;
        regionalVotes[region] = votes;
        totalVotes += votes;
      });
      
      return {
        ...contestant,
        totalVotes,
        regionalVotes
      };
    });
    
    const nationwide = contestantsWithVotes.sort((a, b) => b.totalVotes - a.totalVotes);
    
    const regional = {};
    cameroonRegions.forEach(region => {
      regional[region] = contestantsWithVotes
        .map(c => ({ ...c, votes: c.regionalVotes[region] }))
        .sort((a, b) => b.votes - a.votes);
    });
    
    return { nationwide, regional };
  };

  const exportVotingData = () => {
    const { nationwide } = getVotingData();
    const selectedCampaignData = campaigns.find(c => c.id === parseInt(selectedCampaign));
    
    const exportData = {
      campaign: selectedCampaignData,
      results: {
        nationwide: nationwide,
        byRegion: cameroonRegions.map(region => ({
          region,
          results: nationwide.map(candidate => ({
            name: candidate.name,
            party: candidate.party,
            votes: candidate.regionalVotes[region] || 0
          }))
        }))
      },
      summary: {
        totalVotes: nationwide.reduce((sum, c) => sum + c.totalVotes, 0),
        totalCandidates: nationwide.length,
        exportDate: new Date().toISOString()
      }
    };
    
    const dataStr = JSON.stringify(exportData, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `voting_results_${selectedCampaignData?.name.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

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

  const { nationwide, regional } = getVotingData();
  const selectedCampaignData = campaigns.find(c => c.id === parseInt(selectedCampaign));

  // Chart data for nationwide results
  const chartOptions = {
    chart: {
      type: 'bar',
      height: 350,
      toolbar: {
        show: true
      }
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '55%',
        borderRadius: 4
      },
    },
    dataLabels: {
      enabled: true,
      formatter: function (val) {
        return val + " votes"
      }
    },
    stroke: {
      show: true,
      width: 2,
      colors: ['transparent']
    },
    xaxis: {
      categories: nationwide.map(c => c.name),
      title: {
        text: 'Candidates'
      }
    },
    yaxis: {
      title: {
        text: 'Number of Votes'
      }
    },
    fill: {
      opacity: 1
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return val + " votes"
        }
      }
    },
    colors: ['#4F46E5', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6']
  };

  const chartSeries = [{
    name: 'Votes',
    data: nationwide.map(c => c.totalVotes)
  }];

  // Pie chart for vote distribution
  const pieChartOptions = {
    chart: {
      type: 'pie',
      height: 350
    },
    labels: nationwide.map(c => c.name),
    colors: ['#4F46E5', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'],
    legend: {
      position: 'bottom'
    },
    dataLabels: {
      enabled: true,
      formatter: function (val) {
        return Math.round(val) + "%"
      }
    }
  };

  const pieChartSeries = nationwide.map(c => c.totalVotes);

  return (
    <div className="p-6 bg-white rounded-lg shadow-sm">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Analytics & Reports</h2>
          <p className="text-gray-600 mt-1">Comprehensive voting analytics and data insights</p>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={exportEmailList}
            className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <FiDownload size={20} />
            <span>Export Emails</span>
          </button>
          <button
            onClick={exportUserData}
            className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
          >
            <FiDownload size={20} />
            <span>Export User Data</span>
          </button>
          {selectedCampaign && (
            <button
              onClick={exportVotingData}
              className="flex items-center space-x-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
            >
              <FiDownload size={20} />
              <span>Export Results</span>
            </button>
          )}
        </div>
      </div>

      {/* Campaign Selection */}
      <div className="mb-8">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Select Campaign for Analysis
        </label>
        <select
          value={selectedCampaign}
          onChange={(e) => setSelectedCampaign(e.target.value)}
          className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        >
          <option value="">Choose a campaign to analyze</option>
          {campaigns.map(campaign => (
            <option key={campaign.id} value={campaign.id}>{campaign.name}</option>
          ))}
        </select>
      </div>

      {selectedCampaign && (
        <>
          {/* Campaign Info */}
          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-6 mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{selectedCampaignData?.name}</h3>
                <p className="text-gray-600 mb-4">{selectedCampaignData?.description}</p>
                <div className="flex items-center space-x-6 text-sm text-gray-500">
                  <div className="flex items-center space-x-1">
                    <FiCalendar size={16} />
                    <span>Start: {new Date(selectedCampaignData?.startDate).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <FiCalendar size={16} />
                    <span>End: {new Date(selectedCampaignData?.endDate).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <FiUsers size={16} />
                    <span>{nationwide.length} candidates</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-indigo-600">
                  {nationwide.reduce((sum, c) => sum + c.totalVotes, 0)}
                </div>
                <div className="text-sm text-gray-600">Total Votes</div>
              </div>
            </div>
          </div>

          {/* View Type Toggle */}
          <div className="mb-8">
            <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg w-fit">
              <button
                onClick={() => setViewType('nationwide')}
                className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${
                  viewType === 'nationwide' 
                    ? 'bg-white text-indigo-600 shadow-sm' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Nationwide Analysis
              </button>
              <button
                onClick={() => setViewType('regional')}
                className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${
                  viewType === 'regional' 
                    ? 'bg-white text-indigo-600 shadow-sm' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Regional Breakdown
              </button>
            </div>
          </div>

          {viewType === 'nationwide' ? (
            <div className="space-y-8">
              {/* Charts */}
              <div className="grid lg:grid-cols-2 gap-8">
                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <FiBarChart className="mr-2" />
                    Vote Count by Candidate
                  </h3>
                  {nationwide.length > 0 ? (
                    <Chart options={chartOptions} series={chartSeries} type="bar" height={350} />
                  ) : (
                    <div className="text-center py-12 text-gray-500">
                      No voting data available
                    </div>
                  )}
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <FiTrendingUp className="mr-2" />
                    Vote Distribution
                  </h3>
                  {nationwide.length > 0 && nationwide.some(c => c.totalVotes > 0) ? (
                    <Chart options={pieChartOptions} series={pieChartSeries} type="pie" height={350} />
                  ) : (
                    <div className="text-center py-12 text-gray-500">
                      No votes recorded yet
                    </div>
                  )}
                </div>
              </div>

              {/* Rankings */}
              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
                  <FiTrendingUp className="mr-2" />
                  Nationwide Rankings
                </h3>
                <div className="space-y-4">
                  {nationwide.map((contestant, index) => {
                    const totalVotes = nationwide.reduce((sum, c) => sum + c.totalVotes, 0);
                    const percentage = totalVotes > 0 ? ((contestant.totalVotes / totalVotes) * 100).toFixed(1) : 0;
                    
                    return (
                      <div key={contestant.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                        <div className="flex items-center space-x-4">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold ${
                            index === 0 ? 'bg-yellow-500' :
                            index === 1 ? 'bg-gray-400' :
                            index === 2 ? 'bg-orange-600' :
                            'bg-gray-300'
                          }`}>
                            {index + 1}
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900">{contestant.name}</h4>
                            <p className="text-sm text-gray-600">{contestant.party} • {contestant.region}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-xl font-bold text-gray-900">{contestant.totalVotes}</p>
                          <p className="text-sm text-gray-600">{percentage}% of total votes</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          ) : (
            /* Regional Results */
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                <FiMapPin className="mr-2" />
                Results by Region
              </h3>
              <div className="grid gap-6 md:grid-cols-2">
                {cameroonRegions.map(region => (
                  <div key={region} className="bg-white border border-gray-200 rounded-xl p-6">
                    <h4 className="font-semibold text-gray-900 mb-4 text-lg">{region} Region</h4>
                    <div className="space-y-3">
                      {regional[region]?.map((contestant, index) => (
                        <div key={contestant.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center space-x-3">
                            <span className="w-8 h-8 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center text-sm font-medium">
                              {index + 1}
                            </span>
                            <div>
                              <span className="font-medium text-gray-900">{contestant.name}</span>
                              <span className="text-sm text-gray-600 ml-2">({contestant.party})</span>
                            </div>
                          </div>
                          <div className="text-right">
                            <span className="font-semibold text-gray-900">{contestant.votes}</span>
                            <span className="text-sm text-gray-600 ml-1">votes</span>
                          </div>
                        </div>
                      ))}
                      {regional[region]?.length === 0 && (
                        <p className="text-center text-gray-500 py-4">No votes in this region</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}

      {!selectedCampaign && (
        <div className="text-center py-16">
          <FiBarChart size={64} className="mx-auto text-gray-400 mb-6" />
          <h3 className="text-xl font-medium text-gray-900 mb-2">Select a campaign to view analytics</h3>
          <p className="text-gray-500 max-w-md mx-auto">
            Choose a campaign from the dropdown above to view detailed voting results, 
            charts, and regional breakdowns.
          </p>
        </div>
      )}
    </div>
  );
};

export default Analytics;