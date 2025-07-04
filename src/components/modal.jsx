// // src/components/Modal.js
// import React from 'react';

// const Modal = ({ isOpen, onClose, onConfirm, candidate }) => {
//   if (!isOpen) return null;

//   return (
//     <div className="modal-overlay">
//       <div className="modal-content">
//         <h2>Confirm Your Vote</h2>
//         <p>Are you sure you want to vote for {candidate.name}?</p>
//         <div className="modal-buttons">
//           <button onClick={() => { onConfirm(candidate); onClose(); }}>Yes</button>
//           <button onClick={onClose}>No</button>
//         </div>
//       </div>
//     </div>
//   );
// };

import React from 'react';

const Modal = ({ message,  onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>{message}</h2>
        {/* <p>Total votes for this candidate: {voteCount}</p> */}
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default Modal;