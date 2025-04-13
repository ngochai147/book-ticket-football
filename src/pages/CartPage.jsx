import React, { useState } from 'react';
import { FaTrash, FaShoppingCart, FaPlus, FaMinus } from 'react-icons/fa';

// Dữ liệu mẫu cho giỏ hàng (có thể thay thế bằng dữ liệu từ API hoặc props)
const initialCartItems = [
  {
    id: 1,
    name: 'Áo thun nam cổ tròn',
    price: 150000, // Giá tính bằng VND
    quantity: 2,
    image: 'https://via.placeholder.com/100', // Hình ảnh placeholder
  },
  {
    id: 2,
    name: 'Quần jeans slim fit',
    price: 350000,
    quantity: 1,
    image: 'https://via.placeholder.com/100',
  },
  {
    id: 3,
    name: 'Áo khoác hoodie unisex',
    price: 450000,
    quantity: 1,
    image: 'https://via.placeholder.com/100',
  },
];

function ShoppingCart() {
  const [cartItems, setCartItems] = useState(initialCartItems);

  // Hàm tăng số lượng sản phẩm
  const increaseQuantity = (id) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  // Hàm giảm số lượng sản phẩm
  const decreaseQuantity = (id) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  // Hàm xóa sản phẩm khỏi giỏ hàng
  const removeItem = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  // Tính tổng tiền
  const calculateTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  // Định dạng tiền tệ VND
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl overflow-hidden">
        {/* Header */}
        <div
          style={{ background: 'linear-gradient(to right, #1C2526, #1C2526)' }}
          className="text-white p-6"
        >
          <h1 className="text-2xl font-bold flex items-center">
            <FaShoppingCart className="mr-2" /> Giỏ Hàng Của Bạn
          </h1>
          <p className="text-gray-200 mt-2">
            Xem lại các sản phẩm bạn đã chọn trước khi thanh toán
          </p>
        </div>

        {/* Nội dung giỏ hàng */}
        <div className="p-6 space-y-6">
          {cartItems.length === 0 ? (
            <div className="text-center text-gray-600">
              <p>Giỏ hàng của bạn đang trống!</p>
              <a
                href="/shop"
                className="text-[#1C2526] underline hover:text-[#1C2526] font-medium"
              >
                Tiếp tục mua sắm
              </a>
            </div>
          ) : (
            <>
              {/* Danh sách sản phẩm */}
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex flex-col md:flex-row items-center border-b border-gray-200 py-4"
                  >
                    {/* Hình ảnh sản phẩm */}
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-24 h-24 object-cover rounded-lg mr-4"
                    />

                    {/* Thông tin sản phẩm */}
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-800">
                        {item.name}
                      </h3>
                      <p className="text-gray-600">
                        Đơn giá: {formatCurrency(item.price)}
                      </p>
                      <p className="text-gray-600">
                        Thành tiền: {formatCurrency(item.price * item.quantity)}
                      </p>

                      {/* Điều chỉnh số lượng */}
                      <div className="flex items-center mt-2">
                        <button
                          onClick={() => decreaseQuantity(item.id)}
                          className="p-1 border border-gray-300 rounded-full hover:bg-gray-100"
                        >
                          <FaMinus className="text-gray-600" />
                        </button>
                        <span className="mx-3 text-gray-800">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => increaseQuantity(item.id)}
                          className="p-1 border border-gray-300 rounded-full hover:bg-gray-100"
                        >
                          <FaPlus className="text-gray-600" />
                        </button>
                      </div>
                    </div>

                    {/* Nút xóa */}
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-red-500 hover:text-red-700 mt-2 md:mt-0 md:ml-4"
                    >
                      <FaTrash />
                    </button>
                  </div>
                ))}
              </div>

              {/* Tổng tiền và nút thanh toán */}
              <div className="border-t border-gray-200 pt-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-gray-800">
                    Tổng cộng:
                  </h3>
                  <p className="text-xl font-bold text-gray-800">
                    {formatCurrency(calculateTotal())}
                  </p>
                </div>

                <div className="flex justify-end space-x-4">
                  <a
                    href="/shop"
                    className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition flex items-center"
                  >
                    Tiếp tục mua sắm
                  </a>
                  <button
                    style={{ backgroundColor: '#1C2526' }}
                    className="px-6 py-2 text-white font-medium rounded-lg hover:bg-[#1C2526] transition flex items-center"
                  >
                    Thanh Toán
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default ShoppingCart;