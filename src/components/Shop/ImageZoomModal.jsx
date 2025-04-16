// src/components/ImageZoomModal.js
import React from 'react';

const ImageZoomModal = ({ imageUrl, onClose }) => {
  return (
    <div
      className="fixed inset-0 z-50 bg-black bg-opacity-80 flex items-center justify-center"
      onClick={onClose}
    >
      <img
        src={imageUrl}
        alt="Zoomed"
        className="max-w-full max-h-full object-contain"
      />
    </div>
  );
};

export default ImageZoomModal;
