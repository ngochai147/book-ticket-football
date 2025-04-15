// src/controllers/orderController.js
import Order from "../models/Order.js";

// Hàm tạo đơn hàng mới
export const createOrder = async (req, res) => {
  try {
    const { customerInfo, cartItems, paymentMethod } = req.body;
    const userId = req.user.id; // Lấy ID người dùng từ token đã xác thực

    // Kiểm tra các trường bắt buộc
    if (!customerInfo || !cartItems || !paymentMethod) {
      return res.status(400).json({ message: "Thiếu thông tin chi tiết đơn hàng bắt buộc" });
    }

    // Tính tổng số tiền (bao gồm phí vận chuyển)
    const shippingFee = 30000; // Phí vận chuyển cố định
    const totalItemsAmount = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    const totalAmount = totalItemsAmount + shippingFee;

    // Tạo đơn hàng mới
    const order = new Order({
      userId,
      customerInfo,
      items: cartItems.map((item) => ({
        productId: item.id, // ID sản phẩm
        name: item.name, // Tên sản phẩm
        quantity: item.quantity, // Số lượng
        price: item.price, // Giá
        image: item.image, // Hình ảnh
      })),
      totalAmount, // Tổng số tiền
      shippingFee, // Phí vận chuyển
      paymentMethod, // Phương thức thanh toán
      status: "pending", // Trạng thái: đang chờ xử lý
    });

    // Lưu đơn hàng vào cơ sở dữ liệu
    await order.save();

    res.status(201).json({ message: "Tạo đơn hàng thành công", orderId: order._id });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};