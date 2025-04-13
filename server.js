import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors"; // Thêm import cors
import userRoutes from "./routes/userRoutes.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Thêm middleware CORS
app.use(cors({
  origin: "http://localhost:5173", // Cho phép origin từ frontend
  methods: ["GET", "POST", "PUT", "DELETE"], // Các phương thức được phép
  allowedHeaders: ["Content-Type", "Authorization"], // Các header được phép
}));

app.use(express.json());

// Kết nối MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Định nghĩa các route
app.use("/api/users", userRoutes);

// Lắng nghe cổng
app.listen(port, () => {
  console.log(`🚀 Server is running at http://localhost:${port}`);
});