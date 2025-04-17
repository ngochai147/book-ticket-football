// src/components/ShoppingCart.jsx
import React, { useState } from 'react';
import { FaTrash, FaShoppingCart, FaPlus, FaMinus } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useCart } from '../context/CartContext';
import CheckoutModal from './CheckoutModal'; // Assuming this component is also translated or handles text via props
import ConfirmPaymentModal from './ConfirmPaymentModal'; // Assuming this component is also translated or handles text via props
import { createOrder } from '../services/api';

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
    setIsConfirmModalOpen(false); // Close confirm modal first
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
        paymentMethod: customerInfo.paymentMethod, // Make sure paymentMethod is included
      };

      // Send the order data to the backend
      const response = await createOrder(orderData);
      console.log('Order created:', response.data);

      // Show success message (English) and reset cart
      toast.success('Order placed successfully!');
      setCart([]); // Reset cart
      closeCheckoutModal(); // Close the checkout modal
    } catch (error) {
      console.error('Error creating order:', error);
      // English Error Toast
      toast.error('An error occurred while placing the order. Please try again.');
    }
  };

  // Currency formatting remains the same (en-GB, GBP)
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP',
    }).format(amount || 0); // Added fallback for undefined amount
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl overflow-hidden">
        {/* Header */}
        <div
          style={{
            // Keeping the style, adjust if needed for branding
            background: 'linear-gradient(to right, #B80000, #D24D40)',
            color: 'white',
            padding: '1.5rem',
          }}
        >
          <h1 className="text-2xl font-bold flex items-center">
             {/* English Title */}
            <FaShoppingCart className="mr-2" /> Your Shopping Cart
          </h1>
           {/* English Subtitle */}
          <p className="text-gray-200 mt-2">
            Review the items you've selected before proceeding to checkout.
          </p>
        </div>

        {/* Cart Content */}
        <div className="p-6 space-y-6">
          {cart.length === 0 ? (
            <div className="text-center text-gray-600">
              {/* English Text */}
              <p>Your shopping cart is empty!</p>
              <a
                href="/shop" // Assuming /shop is the correct path
                // Inline styles kept for consistency, adjust if needed
                style={{ color: '#FF0000', textDecoration: 'underline' }}
                onMouseEnter={(e) => (e.target.style.color = '#D94429')}
                onMouseLeave={(e) => (e.target.style.color = '#FF0000')}
              >
                {/* English Text */}
                Continue Shopping
              </a>
            </div>
          ) : (
            <>
              {/* Cart Items List */}
              <div className="space-y-4">
                {cart.map((item) => (
                  <div
                    key={item.id} // Use a unique item identifier if available (e.g., item.productId or a composite key)
                    className="flex flex-col md:flex-row items-center border-b border-gray-200 py-4 gap-4 md:gap-0" // Added gap for mobile
                  >
                    <img
                      src={item.image}
                      alt={item.name} // Alt text should describe the image
                      className="w-24 h-24 object-cover rounded-lg md:mr-4 shrink-0" // Added shrink-0
                    />
                    <div className="flex-1 text-center md:text-left"> {/* Centered text on mobile */}
                      <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
                      {/* English Text */}
                      <p className="text-gray-600">Unit Price: {formatCurrency(item.price)}</p>
                      {/* English Text */}
                      <p className="text-gray-600">
                        Subtotal: {formatCurrency(item.price * item.quantity)}
                      </p>
                      <div className="flex items-center justify-center md:justify-start mt-2"> {/* Centered controls on mobile */}
                        <button
                          onClick={() => removeFromCart(item.id)} // Assuming this decreases quantity or removes if 1
                          aria-label="Decrease quantity" // Accessibility
                          className="p-1 border border-gray-300 rounded-full hover:bg-gray-100 transition-colors"
                        >
                          <FaMinus className="text-gray-600" />
                        </button>
                        <span className="mx-3 text-gray-800 w-8 text-center">{item.quantity}</span> {/* Fixed width */}
                        <button
                          onClick={() => increaseQuantity(item.id)}
                          aria-label="Increase quantity" // Accessibility
                          className="p-1 border border-gray-300 rounded-full hover:bg-gray-100 transition-colors"
                        >
                          <FaPlus className="text-gray-600" />
                        </button>
                      </div>
                    </div>
                    <button
                      onClick={() => deleteItem(item.id)} // Assuming this removes the item entirely
                      aria-label={`Remove ${item.name} from cart`} // Accessibility
                      className="text-red-500 hover:text-red-700 mt-2 md:mt-0 md:ml-4 transition-colors"
                    >
                      <FaTrash />
                    </button>
                  </div>
                ))}
              </div>

              {/* Cart Summary and Actions */}
              <div className="border-t border-gray-200 pt-4">
                <div className="flex justify-between items-center mb-4">
                  {/* English Text */}
                  <h3 className="text-lg font-semibold text-gray-800">Total:</h3>
                  <p className="text-xl font-bold text-gray-800">{formatCurrency(totalPrice)}</p>
                </div>
                <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-4"> {/* Responsive layout */}
                  <a
                    href="/shop"
                    className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition flex items-center justify-center" // Centered text
                  >
                    {/* English Text */}
                    Continue Shopping
                  </a>
                  <button
                    onClick={openConfirmModal}
                    // Inline styles kept for consistency
                    style={{
                      backgroundColor: '#FF0000',
                      color: 'white',
                      padding: '0.5rem 1.5rem',
                      borderRadius: '0.5rem',
                    }}
                    onMouseEnter={(e) => (e.target.style.backgroundColor = '#D94429')}
                    onMouseLeave={(e) => (e.target.style.backgroundColor = '#FF0000')}
                    className="transition flex items-center justify-center" // Centered text
                  >
                     {/* English Text */}
                    Proceed to Checkout
                  </button>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Modals - Assuming text inside modals is handled via props or translated separately */}
        <ConfirmPaymentModal
          isOpen={isConfirmModalOpen}
          onClose={closeConfirmModal}
          onConfirm={openCheckoutModal}
        />
        <CheckoutModal
          isOpen={isCheckoutModalOpen}
          onClose={closeCheckoutModal}
          onConfirm={handleConfirmCheckout}
          cartItems={cart} // Pass cartItems to modal if needed for display
          formatCurrency={formatCurrency} // Pass formatter if needed
        />

        {/* Toast Container */}
        <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
      </div>
    </div>
  );
}

export default ShoppingCart;