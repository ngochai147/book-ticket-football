import express from "express";
import { createTicket, getMyTickets } from "../controllers/ticketController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

console.log("✅ Đang đăng ký ticket routes...");

// Tạo vé mới (yêu cầu xác thực)
router.post("/create", verifyToken, createTicket);

// Lấy danh sách vé của người dùng theo iduser (yêu cầu xác thực)
router.get("/my-tickets/:iduser", verifyToken, (req, res, next) => {
  console.log("Nhận request tới /my-tickets/:iduser với iduser:", req.params.iduser);
  next();
}, getMyTickets);

export default router;