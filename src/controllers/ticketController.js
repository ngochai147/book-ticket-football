import mongoose from "mongoose";
import Ticket from "../models/Ticket.js";

// Tạo vé mới
export const createTicket = async (req, res) => {
  try {
    const {
      bookingCode,
      match,
      matchTime,
      stadium,
      seat,
      quantity,
      customer,
      totalPayment,
    } = req.body;

    const userId = req.user.id; // Lấy từ token qua middleware
    console.log("Tạo vé cho userId:", userId);

    // Kiểm tra dữ liệu đầu vào
    if (
      !bookingCode ||
      !match ||
      !match.home ||
      !match.away ||
      !matchTime ||
      !stadium ||
      !seat ||
      !seat.type ||
      !seat.area ||
      !quantity ||
      !customer ||
      !customer.name ||
      !totalPayment
    ) {
      return res.status(400).json({ message: "Thiếu thông tin vé cần thiết" });
    }

    // Tạo ticket mới
    const ticket = new Ticket({
      bookingCode,
      match,
      matchTime,
      stadium,
      seat,
      quantity,
      customer,
      totalPayment,
      userId,
    });

    // Lưu vào MongoDB
    await ticket.save();
    console.log("Đã tạo vé thành công, ticketId:", ticket._id);

    res.status(201).json({ message: "Lưu vé thành công", ticketId: ticket._id });
  } catch (err) {
    console.error("Lỗi khi tạo vé:", err);
    res.status(500).json({ message: `Lỗi khi lưu vé: ${err.message}` });
  }
};

// Lấy tất cả vé đã mua của user
export const getMyTickets = async (req, res) => {
  try {
    const userId = req.params.iduser;
    if (!userId) {
      return res.status(400).json({ message: "Không tìm thấy userId trong URL" });
    }
    console.log("Đang lấy vé cho userId:", userId);

    const userIdObject = new mongoose.Types.ObjectId(userId);
    const tickets = await Ticket.find({ userId: userIdObject }).sort({ purchasedAt: -1 });
    console.log("Tìm thấy vé:", tickets);

    res.status(200).json(tickets);
  } catch (err) {
    console.error("Lỗi khi lấy vé:", err);
    res.status(500).json({ message: `Lỗi khi lấy dữ liệu vé: ${err.message}` });
  }
};