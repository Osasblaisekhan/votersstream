import React, { useState } from 'react';
import CandidateList from './candidatelist';
import RegionSelector from './regionSelector';
import Modal from './modal';
import regionsData, { createCandidates } from './regions';

const Vote = () => {
  const [regions, setRegions] = useState(regionsData);
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [voteCount, setVoteCount] = useState(0);

  const handleRegionSelect = (region) => {
    const updatedRegion = {
      ...region,
      candidates: createCandidates(region.id)
    };
    setSelectedRegion(updatedRegion);
  };

  const handleVote = (candidate) => {
    const hasAlreadyVoted = localStorage.getItem('hasVoted') === 'true';

    if (hasAlreadyVoted) {
      alert('⚠️ You have already voted! You cannot vote twice.');
      return;
    }

    if (!selectedRegion) return;

    const regionIndex = regions.findIndex(r => r.id === selectedRegion.id);
    const candidateIndex = regions[regionIndex].candidates.findIndex(c => c.id === candidate.id);

    if (candidateIndex !== -1) {
      // Increment vote
      const updatedVoteCount =
        regions[regionIndex].candidates[candidateIndex].votes + 1;

      // Save vote to localStorage
      localStorage.setItem(
        `votes_region_${selectedRegion.id}_candidate_${candidate.id}`,
        updatedVoteCount.toString()
      );
      localStorage.setItem('hasVoted', 'true');

      // Update regions
      const updatedRegions = [...regions];
      updatedRegions[regionIndex].candidates = createCandidates(selectedRegion.id);
      setRegions(updatedRegions);

      // Refresh selected region
      setSelectedRegion({
        ...selectedRegion,
        candidates: createCandidates(selectedRegion.id)
      });

      // Show modal
      setModalMessage(`🎉 You voted for ${candidate.name}`);
      setVoteCount(updatedVoteCount);
      setShowModal(true);
    }
  };

  const closeModal = () => setShowModal(false);

  return (
    <div>
      <RegionSelector regions={regions} onSelect={handleRegionSelect} />
      {selectedRegion && (
        <div>
          <h2>Candidates for {selectedRegion.name}</h2>
          <CandidateList
            candidates={selectedRegion.candidates}
            onVote={handleVote}
            disabled={localStorage.getItem('hasVoted') === 'true'}
          />
        </div>
      )}
      {showModal && (
        <Modal
          message={modalMessage}
          voteCount={voteCount}
          onClose={closeModal}
        />
      )}
    </div>
  );
};

export default Vote;
