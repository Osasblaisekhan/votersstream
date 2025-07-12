const CandidateList = ({ candidates, onVote, disabled }) => {
  const sortedCandidates = [...candidates].sort((a, b) => b.votes - a.votes);

  return (
    <div className='candidates'>
      <h2>Nominees</h2>
      <div className='candidate-container'>
        {sortedCandidates.map(candidate => (
          <div key={candidate.id} className='candidate-card'>
            <img src={candidate.image} alt={candidate.name} className='candidate-image' />
            <h3 className='candidate-name'>{candidate.name}</h3>
            <p className='candidate-party'>{candidate.party}</p>
            <button
              className='vote-button'
              onClick={() => onVote(candidate)}
              disabled={disabled} // ✅ this disables button after vote
            >
               cast Vote
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CandidateList;
