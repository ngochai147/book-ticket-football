// server.js
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import userRoutes from "./src/routes/userRoutes.js";
import orderRoutes from "./src/routes/orderRoutes.js";

// Tải biến môi trường từ file .env
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Cấu hình CORS (cho phép truy cập từ frontend)
app.use(cors({
  origin: "http://localhost:5173", // Nguồn gốc được phép
  methods: ["GET", "POST", "PUT", "DELETE"], // Các phương thức HTTP được phép
  allowedHeaders: ["Content-Type", "Authorization"], // Các tiêu đề HTTP được phép
}));

// Sử dụng middleware để xử lý dữ liệu JSON
app.use(express.json());

// Kết nối đến cơ sở dữ liệu MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Đã kết nối thành công với MongoDB"))
  .catch((err) => console.error("❌ Lỗi kết nối MongoDB:", err));

// Định nghĩa các tuyến đường (routes)
app.use("/api/users", userRoutes); // Tuyến đường cho người dùng
app.use("/api/orders", orderRoutes); // Tuyến đường cho đơn hàng

// Khởi động server và lắng nghe trên cổng được chỉ định
app.listen(port, () => {
  console.log(`🚀 Server đang chạy tại http://localhost:${port}`);
});