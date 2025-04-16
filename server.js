import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import userRoutes from "./src/routes/userRoutes.js";
import orderRoutes from "./src/routes/orderRoutes.js";
import ticketRoutes from "./src/routes/ticketRoutes.js";

// Tải biến môi trường từ file .env
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Log để kiểm tra port
console.log("Port đang sử dụng:", port);

// Cấu hình CORS (cho phép truy cập từ frontend)
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Sử dụng middleware để xử lý dữ liệu JSON
app.use(express.json());

// Kết nối đến cơ sở dữ liệu MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Đã kết nối thành công với MongoDB"))
  .catch((err) => console.error("❌ Lỗi kết nối MongoDB:", err));

// Định nghĩa các tuyến đường (routes)
console.log("Đang đăng ký các route...");
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/tickets", ticketRoutes);

// Thêm route test để kiểm tra server
app.get("/api/test", (req, res) => {
  res.status(200).json({ message: "Server đang chạy!" });
});

// Khởi động server
app.listen(port, () => {
  console.log(`🚀 Server đang chạy tại http://localhost:${port}`);
});