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
          className="fixed inset-0 bg-black/60 flex items-center justify-center z-50"
        >
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.8 }}
            transition={{ duration: 0.2 }}
            className="bg-white rounded-lg shadow-xl w-full max-w-md p-6"
          >
            <div className="flex items-center space-x-2 mb-4">
              <FaCheckCircle style={{ color: '#EE4D2D' }} className="text-2xl" /> {/* Replace text-shopee-orange */}
              <h2 className="text-xl font-semibold text-gray-800">Xác nhận thanh toán</h2>
            </div>
            <p className="text-gray-600 mb-6">
              Bạn có chắc chắn muốn thanh toán đơn hàng này không?
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition"
              >
                Hủy
              </button>
              <button
                onClick={onConfirm}
                style={{
                  backgroundColor: '#EE4D2D', // Replace bg-shopee-orange
                  color: 'white',
                  padding: '0.5rem 1rem',
                  borderRadius: '0.5rem',
                }}
                onMouseEnter={(e) => (e.target.style.backgroundColor = '#D94429')} // Replace hover:bg-shopee-orange-hover
                onMouseLeave={(e) => (e.target.style.backgroundColor = '#EE4D2D')}
                className="transition"
              >
                Xác nhận
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default ConfirmPaymentModal;