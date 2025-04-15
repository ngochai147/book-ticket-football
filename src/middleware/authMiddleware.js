// src/middleware/authMiddleware.js
import jwt from "jsonwebtoken";

// Hàm xác thực token
export const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; // Lấy token từ tiêu đề Authorization: Bearer <token>

  // Kiểm tra nếu không có token
  if (!token) {
    return res.status(401).json({ message: "Không có token được cung cấp" });
  }

  try {
    // Xác minh token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Gắn thông tin người dùng đã giải mã vào request
    next(); // Tiếp tục xử lý yêu cầu
  } catch (error) {
    return res.status(401).json({ message: "Token không hợp lệ" });
  }
};