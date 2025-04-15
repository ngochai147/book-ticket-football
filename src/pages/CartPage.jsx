// src/components/ShoppingCart.jsx
import React, { useState } from 'react';
import { FaTrash, FaShoppingCart, FaPlus, FaMinus } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useCart } from '../context/CartContext';
import CheckoutModal from './CheckoutModal';
import ConfirmPaymentModal from './ConfirmPaymentModal';
import { createOrder } from '../services/api'; // Import the new API function

function ShoppingCart() {
  const { cart, totalPrice, increaseQuantity, removeFromCart, deleteItem, setCart } = useCart();
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

  const openConfirmModal = () => {
    setIsConfirmModalOpen(true);
  };

  const closeConfirmModal = () => {
    setIsConfirmModalOpen(false);
  };

  const openCheckoutModal = () => {
    setIsConfirmModalOpen(false);
    setIsCheckoutModalOpen(true);
  };

  const closeCheckoutModal = () => {
    setIsCheckoutModalOpen(false);
  };

  const handleConfirmCheckout = async (customerInfo) => {
    try {
      // Prepare the order data
      const orderData = {
        customerInfo,
        cartItems: cart,
        paymentMethod: customerInfo.paymentMethod,
      };

      // Send the order data to the backend
      const response = await createOrder(orderData);
      console.log('Order created:', response.data);

      // Show success message and reset cart
      toast.success('Đặt hàng thành công!');
      setCart([]); // Reset giỏ hàng
      closeCheckoutModal();
    } catch (error) {
      console.error('Error creating order:', error);
      toast.error('Có lỗi xảy ra khi đặt hàng. Vui lòng thử lại.');
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl overflow-hidden">
        <div
          style={{
            background: 'linear-gradient(to right, #EE4D2D, #FF6633)',
            color: 'white',
            padding: '1.5rem',
          }}
        >
          <h1 className="text-2xl font-bold flex items-center">
            <FaShoppingCart className="mr-2" /> Giỏ Hàng Của Bạn
          </h1>
          <p className="text-gray-200 mt-2">
            Xem lại các sản phẩm bạn đã chọn trước khi thanh toán
          </p>
        </div>
        <div className="p-6 space-y-6">
          {cart.length === 0 ? (
            <div className="text-center text-gray-600">
              <p>Giỏ hàng của bạn đang trống!</p>
              <a
                href="/shop"
                style={{ color: '#EE4D2D', textDecoration: 'underline' }}
                onMouseEnter={(e) => (e.target.style.color = '#D94429')}
                onMouseLeave={(e) => (e.target.style.color = '#EE4D2D')}
              >
                Tiếp tục mua sắm
              </a>
            </div>
          ) : (
            <>
              <div className="space-y-4">
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="flex flex-col md:flex-row items-center border-b border-gray-200 py-4"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-24 h-24 object-cover rounded-lg mr-4"
                    />
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
                      <p className="text-gray-600">Đơn giá: {formatCurrency(item.price)}</p>
                      <p className="text-gray-600">
                        Thành tiền: {formatCurrency(item.price * item.quantity)}
                      </p>
                      <div className="flex items-center mt-2">
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="p-1 border border-gray-300 rounded-full hover:bg-gray-100"
                        >
                          <FaMinus className="text-gray-600" />
                        </button>
                        <span className="mx-3 text-gray-800">{item.quantity}</span>
                        <button
                          onClick={() => increaseQuantity(item.id)}
                          className="p-1 border border-gray-300 rounded-full hover:bg-gray-100"
                        >
                          <FaPlus className="text-gray-600" />
                        </button>
                      </div>
                    </div>
                    <button
                      onClick={() => deleteItem(item.id)}
                      className="text-red-500 hover:text-red-700 mt-2 md:mt-0 md:ml-4"
                    >
                      <FaTrash />
                    </button>
                  </div>
                ))}
              </div>
              <div className="border-t border-gray-200 pt-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-gray-800">Tổng cộng:</h3>
                  <p className="text-xl font-bold text-gray-800">{formatCurrency(totalPrice)}</p>
                </div>
                <div className="flex justify-end space-x-4">
                  <a
                    href="/shop"
                    className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition flex items-center"
                  >
                    Tiếp tục mua sắm
                  </a>
                  <button
                    onClick={openConfirmModal}
                    style={{
                      backgroundColor: '#EE4D2D',
                      color: 'white',
                      padding: '0.5rem 1.5rem',
                      borderRadius: '0.5rem',
                    }}
                    onMouseEnter={(e) => (e.target.style.backgroundColor = '#D94429')}
                    onMouseLeave={(e) => (e.target.style.backgroundColor = '#EE4D2D')}
                    className="transition flex items-center"
                  >
                    Thanh Toán
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
        <ConfirmPaymentModal
          isOpen={isConfirmModalOpen}
          onClose={closeConfirmModal}
          onConfirm={openCheckoutModal}
        />
        <CheckoutModal
          isOpen={isCheckoutModalOpen}
          onClose={closeCheckoutModal}
          onConfirm={handleConfirmCheckout}
          cartItems={cart}
          formatCurrency={formatCurrency}
        />
        <ToastContainer position="top-right" autoClose={3000} />
      </div>
    </div>
  );
}

export default ShoppingCart;