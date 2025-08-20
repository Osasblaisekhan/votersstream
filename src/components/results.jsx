// import React, { useEffect, useState } from 'react';
// import Chart from 'react-apexcharts';

// const Results = () => {
//   const [campaigns, setCampaigns] = useState([]);
//   const [contestants, setContestants] = useState([]);
//   const [cameroonRegions, setCameroonRegions] = useState([]);
//   const [votes, setVotes] = useState([]);
//   const [selectedCampaign, setSelectedCampaign] = useState('');
//   const [viewType, setViewType] = useState('nationwide');
//   const [loadingCampaigns, setLoadingCampaigns] = useState(true);
//   const [loadingResults, setLoadingResults] = useState(false);

//   // Fetch campaigns on mount
//   useEffect(() => {
//     setLoadingCampaigns(true);
//     fetch('http://localhost:5000/campaigns')
//       .then(res => res.json())
//       .then(data => {
//         setCampaigns(data || []);
//         setLoadingCampaigns(false);
//       })
//       .catch(err => {
//         setLoadingCampaigns(false);
//         console.error(err);
//       });
//   }, []);

//   // Fetch results only when a campaign is selected
//   useEffect(() => {
//     if (!selectedCampaign) return;
//     setLoadingResults(true);
//     fetch(`http://localhost:5000/api/results?campaignId=${selectedCampaign}`)
//       .then(res => res.json())
//       .then(data => {
//         setContestants(data.contestants || []);
//         setCameroonRegions(data.regions || []);
//         setVotes(data.votes || []);
//         setLoadingResults(false);
//       })
//       .catch(err => {
//         setLoadingResults(false);
//         console.error(err);
//       });
//   }, [selectedCampaign]);

//    const getVotingResults = () => {
//     if (!selectedCampaign) return { nationwide: [], regional: {} };
    
//     const campaignContestants = contestants.filter(c => c.campaignId === parseInt(selectedCampaign));
    
//     const contestantsWithVotes = campaignContestants.map(contestant => {
//       let totalVotes = 0;
//       const regionalVotes = {};
      
//       cameroonRegions.forEach(region => {
//         const votes = parseInt(localStorage.getItem(`votes_region_${region}_candidate_${contestant.id}`)) || 0;
//         regionalVotes[region] = votes;
//         totalVotes += votes;
//       });
      
//       return {
//         ...contestant,
//         totalVotes,
//         regionalVotes
//       };
//     });
    
//     const nationwide = contestantsWithVotes.sort((a, b) => b.totalVotes - a.totalVotes);
    
//     const regional = {};
//     cameroonRegions.forEach(region => {
//       regional[region] = contestantsWithVotes
//         .map(c => ({ ...c, votes: c.regionalVotes[region] }))
//         .sort((a, b) => b.votes - a.votes);
//     });
    
//     return { nationwide, regional };
//   };

//   const { nationwide, regional } = getVotingResults();
//   const selectedCampaignData = campaigns.find(c => c.id === parseInt(selectedCampaign));

//   // Chart configuration
//   const chartOptions = {
//     chart: {
//       type: 'donut',
//       height: 350
//     },
//     labels: nationwide.map(c => c.name),
//     colors: ['#4F46E5', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'],
//     legend: {
//       position: 'bottom'
//     },
//     plotOptions: {
//       pie: {
//         donut: {
//           size: '70%'
//         }
//       }
//     },
//     dataLabels: {
//       enabled: true,
//       formatter: function (val) {
//         return Math.round(val) + "%"
//       }
//     }
//   };

//   const chartSeries = nationwide.map(c => c.totalVotes);

//   return (
//     <div className="max-w-6xl mx-auto p-6 space-y-6">
//       <div className="text-center mb-8">
//         <h1 className="text-3xl font-bold text-gray-900 mb-4">Voting Results</h1>
//         <p className="text-gray-600">View real-time voting results and analytics</p>
//       </div>

//       {/* Campaign Selection */}
//       <div>
//         <label className="block text-sm font-medium text-gray-700 mb-2">
//           Select Campaign
//         </label>
//         <select
//           value={selectedCampaign}
//           onChange={(e) => setSelectedCampaign(e.target.value)}
//           className="w-full max-w-md px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
//         >
//           <option value="">Select a campaign</option>
//           {campaigns.map(campaign => (
//             <option key={campaign.id} value={campaign.id}>{campaign.name}</option>
//           ))}
//         </select>
//       </div>

//       {selectedCampaign && (
//         <>
//           {/* Campaign Info */}
//           <div className="bg-gray-50 rounded-lg p-4">
//             <h3 className="font-semibold text-gray-900 mb-2">{selectedCampaignData?.name}</h3>
//             <p className="text-gray-600 text-sm mb-2">{selectedCampaignData?.description}</p>
//             <div className="flex items-center space-x-4 text-sm text-gray-500">
//               <span>Period: {selectedCampaignData?.startDate} - {selectedCampaignData?.endDate}</span>
//               <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
//                 Active
//               </span>
//             </div>
//           </div>

//           {/* View Type Toggle */}
//           <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg w-fit">
//             <button
//               onClick={() => setViewType('nationwide')}
//               className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
//                 viewType === 'nationwide' 
//                   ? 'bg-white text-indigo-600 shadow-sm' 
//                   : 'text-gray-600 hover:text-gray-900'
//               }`}
//             >
//               Nationwide
//             </button>
//             <button
//               onClick={() => setViewType('regional')}
//               className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
//                 viewType === 'regional' 
//                   ? 'bg-white text-indigo-600 shadow-sm' 
//                   : 'text-gray-600 hover:text-gray-900'
//               }`}
//             >
//               By Region
//             </button>
//           </div>

//           {viewType === 'nationwide' ? (
//             <div className="grid md:grid-cols-2 gap-8">
//               {/* Chart */}
//               <div className="bg-white p-6 rounded-lg border border-gray-200">
//                 <h3 className="text-lg font-semibold text-gray-900 mb-4">Vote Distribution</h3>
//                 {nationwide.length > 0 && nationwide.some(c => c.totalVotes > 0) ? (
//                   <Chart options={chartOptions} series={chartSeries} type="donut" height={350} />
//                 ) : (
//                   <div className="text-center py-12 text-gray-500">
//                     No votes recorded yet
//                   </div>
//                 )}
//               </div>

//               {/* Rankings */}
//               <div className="bg-white p-6 rounded-lg border border-gray-200">
//                 <h3 className="text-lg font-semibold text-gray-900 mb-4">Rankings</h3>
//                 <div className="space-y-3">
//                   {nationwide.map((contestant, index) => (
//                     <div key={contestant.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
//                       <div className="flex items-center space-x-3">
//                         <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm ${
//                           index === 0 ? 'bg-yellow-500' :
//                           index === 1 ? 'bg-gray-400' :
//                           index === 2 ? 'bg-orange-600' :
//                           'bg-gray-300'
//                         }`}>
//                           {index + 1}
//                         </div>
//                         <div>
//                           <h4 className="font-medium text-gray-900">{contestant.name}</h4>
//                           <p className="text-sm text-gray-600">{contestant.party}</p>
//                         </div>
//                       </div>
//                       <div className="text-right">
//                         <p className="font-semibold text-gray-900">{contestant.totalVotes}</p>
//                         <p className="text-xs text-gray-600">votes</p>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           ) : (
//             /* Regional Results */
//             <div className="grid gap-6 md:grid-cols-2">
//               {cameroonRegions.map(region => (
//                 <div key={region} className="bg-white p-6 rounded-lg border border-gray-200">
//                   <h4 className="font-semibold text-gray-900 mb-4">{region} Region</h4>
//                   <div className="space-y-2">
//                     {regional[region]?.map((contestant, index) => (
//                       <div key={contestant.id} className="flex items-center justify-between p-2 bg-gray-50 rounded">
//                         <div className="flex items-center space-x-2">
//                           <span className="w-6 h-6 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center text-xs font-medium">
//                             {index + 1}
//                           </span>
//                           <div>
//                             <span className="text-sm font-medium text-gray-900">{contestant.name}</span>
//                             <span className="text-xs text-gray-600 ml-1">({contestant.party})</span>
//                           </div>
//                         </div>
//                         <span className="text-sm font-semibold text-gray-900">{contestant.votes}</span>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </>
//       )}

//       {!selectedCampaign && (
//         <div className="text-center py-12">
//           <div className="text-gray-400 text-6xl mb-4">📊</div>
//           <h3 className="text-lg font-medium text-gray-900 mb-2">Select a campaign</h3>
//           <p className="text-gray-500">Choose a campaign above to view voting results.</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Results;

import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';

const Results = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [contestants, setContestants] = useState([]);
  const [votes, setVotes] = useState([]);
  const [selectedCampaign, setSelectedCampaign] = useState('');
  const [loading, setLoading] = useState(false);

  // Fetch campaigns on mount
  useEffect(() => {
    fetch('http://localhost:5000/campaigns')
      .then(res => res.json())
      .then(data => setCampaigns(data || []))
      .catch(err => console.error(err));
  }, []);

  // Fetch contestants and votes when a campaign is selected
  useEffect(() => {
    if (!selectedCampaign) return;
    setLoading(true);
    Promise.all([
      fetch(`http://localhost:5000/contestants?campaignId=${selectedCampaign}`).then(res => res.json()),
      fetch(`http://localhost:5000/votes?campaignId=${selectedCampaign}`).then(res => res.json())
    ])
      .then(([contestantsData, votesData]) => {
        setContestants(contestantsData || []);
        setVotes(votesData || []);
        setLoading(false);
      })
      .catch(err => {
        setLoading(false);
        console.error(err);
      });
  }, [selectedCampaign]);

  // Rank contestants by vote count
  const rankedContestants = contestants
    .map(contestant => ({
      ...contestant,
      voteCount: votes.filter(v => v.candidateId === contestant.id).length
    }))
    .sort((a, b) => b.voteCount - a.voteCount);

  // Chart config
  const chartOptions = {
    chart: { type: 'donut', height: 350 },
    labels: rankedContestants.map(c => c.name),
    colors: ['#4F46E5', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'],
    legend: { position: 'bottom' },
    plotOptions: { pie: { donut: { size: '70%' } } },
    dataLabels: {
      enabled: true,
      formatter: val => Math.round(val) + '%'
    }
  };
  const chartSeries = rankedContestants.map(c => c.voteCount);

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
            <option key={campaign.id} value={campaign.id}>{campaign.name}</option>
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
              {rankedContestants.length > 0 && rankedContestants.some(c => c.voteCount > 0) ? (
                <Chart options={chartOptions} series={chartSeries} type="donut" height={350} />
              ) : (
                <div className="text-center py-12 text-gray-500">
                  No votes recorded yet
                </div>
              )}
            </div>

            {/* Rankings */}
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Rankings</h3>
              <div className="space-y-3">
                {rankedContestants.map((contestant, index) => (
                  <div key={contestant.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
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