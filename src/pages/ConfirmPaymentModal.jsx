import React from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

function ConfirmPaymentModal({ isOpen, onClose, onConfirm }) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4" // Added padding for smaller screens
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0.7 }} // Added initial opacity
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }} // Spring animation
            className="bg-white rounded-lg shadow-xl w-full max-w-md p-6"
          >
            <div className="flex items-center space-x-3 mb-4"> {/* Increased space */}
              {/* Icon style remains the same */}
              <FaCheckCircle style={{ color: '#EE4D2D' }} className="text-2xl shrink-0" />
              {/* English Title */}
              <h2 className="text-xl font-semibold text-gray-800">Confirm Payment</h2>
            </div>
            {/* English Confirmation Message */}
            <p className="text-gray-600 mb-6">
              Are you sure you want to proceed with the payment for this order?
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition duration-150 ease-in-out" // Added duration
              >
                {/* English Text */}
                Cancel
              </button>
              <button
                onClick={onConfirm}
                // Button styles remain the same
                style={{
                  backgroundColor: '#EE4D2D',
                  color: 'white',
                  padding: '0.5rem 1rem',
                  borderRadius: '0.5rem',
                }}
                onMouseEnter={(e) => (e.target.style.backgroundColor = '#D94429')}
                onMouseLeave={(e) => (e.target.style.backgroundColor = '#EE4D2D')}
                className="transition duration-150 ease-in-out" // Added duration
              >
                {/* English Text */}
                Confirm
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default ConfirmPaymentModal;