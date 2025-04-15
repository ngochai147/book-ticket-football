// src/routes/userRoutes.js
import express from "express";
import { registerUser, loginUser, getUserByToken } from "../controllers/userController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

// Tạo một router mới
const router = express.Router();

// Định nghĩa các tuyến đường
router.post("/register", registerUser); // Tuyến đường để đăng ký người dùng
router.post("/login", loginUser); // Tuyến đường để đăng nhập
router.get("/me", verifyToken, getUserByToken); // Tuyến đường để lấy thông tin người dùng (yêu cầu token xác thực)

export default router;