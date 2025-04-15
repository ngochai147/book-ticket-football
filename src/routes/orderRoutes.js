// src/routes/orderRoutes.js
import express from "express";
import { createOrder } from "../controllers/orderController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

// Tạo một router mới
const router = express.Router();

// Tuyến đường để tạo đơn hàng mới (yêu cầu xác thực bằng token)
router.post("/create", verifyToken, createOrder);

export default router;