import mongoose from "mongoose";

const ticketSchema = new mongoose.Schema({
  bookingCode: { type: String, required: true },
  match: {
    home: { type: String, required: true },
    away: { type: String, required: true },
  },
  matchTime: { type: Date, required: true },
  stadium: { type: String, required: true },
  seat: {
    type: { type: String, required: true }, // e.g., premium
    area: { type: String, required: true }, // e.g., north
  },
  quantity: { type: Number, required: true },
  customer: {
    name: { type: String, required: true },
  },
  totalPayment: { type: Number, required: true },
  purchasedAt: { type: Date, default: Date.now }, // thời gian mua vé
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true, // Liên kết với người dùng đăng nhập
  },
});

// Tạo index cho userId để tối ưu truy vấn
ticketSchema.index({ userId: 1 });

export default mongoose.model("Ticket", ticketSchema);