import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import axios from 'axios';

const Results = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [rankedContestants, setRankedContestants] = useState([]);
  const [selectedCampaign, setSelectedCampaign] = useState('');
  const [loading, setLoading] = useState(false);

<<<<<<< HEAD
  useEffect(() => {
  if (!selectedCampaign) return;
  setLoading(true);
  fetch(`http://localhost:5000/api/results?campaignId=${selectedCampaign}`)
    .then(res => res.json())
    .then(data => {
      setContestants(data.contestants || []);
      setVotes(data.votes || []);
      setLoading(false);
    })
    .catch(err => {
      setLoading(false);
      console.error(err);
    });
}, [selectedCampaign]);
=======
  const API_BASE_URL = import.meta.env.VITE_API_URL;
>>>>>>> 081ff2bd69d7544dd6154082f4fd5d69b179f1f4

  // Fetch campaigns on mount
  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/campaigns`);
        setCampaigns(res.data || []);
      } catch (err) {
        console.error(err);
      }
    };

    fetchCampaigns();
  }, []);

  // Fetch contestants when a campaign is selected
  useEffect(() => {
    const fetchContestants = async () => {
      if (!selectedCampaign) return;

      setLoading(true);
      setRankedContestants([]); // Reset contestants on campaign change

      try {
        const res = await axios.get(`${API_BASE_URL}/contestants`, {
          params: { campaignId: selectedCampaign }
        });
        setRankedContestants(res.data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchContestants();
  }, [selectedCampaign]);

  // Chart config
  const chartOptions = {
    chart: { type: 'donut', height: 350 },
    labels: Array.isArray(rankedContestants) ? rankedContestants.map(c => c.name) : [],
    colors: ['#4F46E5', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'],
    legend: { position: 'bottom' },
    plotOptions: { pie: { donut: { size: '70%' } } },
    dataLabels: {
      enabled: true,
      formatter: val => Math.round(val) + '%'
    }
  };

  const chartSeries = Array.isArray(rankedContestants) ? rankedContestants.map(c => c.voteCount) : [];

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Voting Results</h1>
        <p className="text-gray-600">View real-time voting results and analytics</p>
      </div>

      {/* Campaign Selection */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Select Campaign
        </label>
        <select
          value={selectedCampaign}
          onChange={e => setSelectedCampaign(e.target.value)}
          className="w-full max-w-md px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="">Select a campaign</option>
          {campaigns.map(campaign => (
            <option key={campaign._id} value={campaign._id}>{campaign.name}</option>
          ))}
        </select>
      </div>

      {loading && <div className="text-center py-8 text-gray-500">Loading results...</div>}

      {selectedCampaign && !loading && (
        <>
          <div className="grid md:grid-cols-2 gap-8 mt-8">
            {/* Chart */}
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Vote Distribution</h3>
              {Array.isArray(chartSeries) && chartSeries.length > 0 && Array.isArray(chartOptions.labels) && chartOptions.labels.length > 0 ? (
                <Chart options={chartOptions} series={chartSeries} type="donut" height={350} />
              ) : (
                <div className="text-center py-12 text-gray-500">No votes recorded yet</div>
              )}
            </div>

            {/* Rankings */}
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Rankings</h3>
              <div className="space-y-3">
                {rankedContestants.map((contestant, index) => (
                  <div key={contestant._id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm ${
                        index === 0 ? 'bg-yellow-500' :
                        index === 1 ? 'bg-gray-400' :
                        index === 2 ? 'bg-orange-600' :
                        'bg-gray-300'
                      }`}>
                        {index + 1}
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">{contestant.name}</h4>
                        <p className="text-sm text-gray-600">{contestant.party}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900">{contestant.voteCount}</p>
                      <p className="text-xs text-gray-600">votes</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}

      {!selectedCampaign && (
        <div className="text-center py-12">
          <div className="text-gray-400 text-6xl mb-4">📊</div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Select a campaign</h3>
          <p className="text-gray-500">Choose a campaign above to view voting results.</p>
        </div>
      )}
    </div>
  );
};

export default Results;