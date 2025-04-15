import { useContext, useState, useEffect, createContext } from 'react';
import cartItemsData from '../data/cartItems.json'; // Đường dẫn tới file JSON

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(cartItemsData); // Khởi tạo từ JSON
  const [totalPrice, setTotalPrice] = useState(0);

  // Tính tổng tiền khi giỏ hàng thay đổi
  useEffect(() => {
    setTotalPrice(cart.reduce((sum, item) => sum + item.price * item.quantity, 0));
  }, [cart]);

  // Thêm sản phẩm vào giỏ hàng
  const addToCart = (item) => {
    setCart((prevCart) => {
      const exist = prevCart.find((i) => i.id === item.id);
      if (exist) {
        return prevCart.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      } else {
        return [...prevCart, { ...item, quantity: 1 }];
      }
    });
  };

  // Giảm số lượng hoặc xóa sản phẩm
  const removeFromCart = (id) => {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  // Tăng số lượng sản phẩm
  const increaseQuantity = (id) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  // Xóa hoàn toàn sản phẩm
  const deleteItem = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        totalPrice,
        addToCart,
        removeFromCart,
        increaseQuantity,
        deleteItem,
        setCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);