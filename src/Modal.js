import React from 'react';
import './Modal.css'; // Modal styling

const Modal = ({ image, closeModal }) => {
  return (
    <div className="modal-overlay" onClick={closeModal}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <img src={image.photoUrl} alt={image.title} className="modal-image" />
        <button onClick={closeModal} className="modal-close-btn">X</button>
      </div>
    </div>
  );
};

export default Modal;
