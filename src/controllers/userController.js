// src/controllers/userController.js
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

// Hàm đăng ký người dùng
export const registerUser = async (req, res) => {
  try {
    const {
      nickname,
      firstName,
      lastName,
      email,
      repeatEmail,
      password,
      repeatPassword,
      language,
      securityAnswer,
      acceptTerms,
      acceptNewsletter,
    } = req.body;

    // Kiểm tra các trường bắt buộc
    if (
      !nickname ||
      !firstName ||
      !lastName ||
      !email ||
      !repeatEmail ||
      !password ||
      !repeatPassword ||
      !securityAnswer ||
      acceptTerms === undefined
    ) {
      return res.status(400).json({ message: "Tất cả các trường bắt buộc phải được điền đầy đủ" });
    }

    // Kiểm tra email nhập lại có khớp không
    if (email !== repeatEmail) {
      return res.status(400).json({ message: "Email không khớp" });
    }

    // Kiểm tra mật khẩu nhập lại có khớp không
    if (password !== repeatPassword) {
      return res.status(400).json({ message: "Mật khẩu không khớp" });
    }

    // Kiểm tra người dùng có đồng ý với điều khoản sử dụng không
    if (!acceptTerms) {
      return res.status(400).json({ message: "Bạn phải đồng ý với các điều khoản sử dụng" });
    }

    // Kiểm tra tên người dùng đã tồn tại chưa
    const existingNickname = await User.findOne({ nickname });
    if (existingNickname) {
      return res.status(400).json({ message: "Tên người dùng đã tồn tại" });
    }

    // Kiểm tra email đã tồn tại chưa
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ message: "Email đã tồn tại" });
    }

    // Kiểm tra câu trả lời bảo mật (tuổi của Esteban Andrada)
    const correctEstebanAndradaAge = 34; // Tính đến 11/04/2025
    if (parseInt(securityAnswer) !== correctEstebanAndradaAge) {
      return res.status(400).json({ message: "Câu trả lời sai về tuổi của Esteban Andrada" });
    }

    // Mã hóa mật khẩu
    const hashedPassword = await bcrypt.hash(password, 10);

    // Tạo người dùng mới
    const user = new User({
      nickname,
      firstName,
      lastName,
      email,
      password: hashedPassword,
      preferredLanguage: language || "English",
      estebanAndradaAge: parseInt(securityAnswer),
      acceptedTerms: acceptTerms,
      receiveNewsletters: acceptNewsletter || false,
    });

    // Lưu người dùng vào cơ sở dữ liệu
    await user.save();

    res.status(201).json({ message: "Đăng ký người dùng thành công" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Hàm đăng nhập người dùng
export const loginUser = async (req, res) => {
  try {
    const { nickname, password } = req.body;

    // Kiểm tra tên người dùng và mật khẩu
    if (!nickname || !password) {
      return res.status(400).json({ message: "Tên người dùng và mật khẩu là bắt buộc" });
    }

    // Tìm người dùng theo tên người dùng
    const user = await User.findOne({ nickname });
    if (!user) {
      return res.status(401).json({ message: "Tên người dùng hoặc mật khẩu không đúng" });
    }

    // So sánh mật khẩu
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Tên người dùng hoặc mật khẩu không đúng" });
    }

    // Tạo JWT token
    const token = jwt.sign(
      { id: user._id, nickname: user.nickname },
      process.env.JWT_SECRET,
      { expiresIn: "30d" } // Token hết hạn sau 30 ngày
    );

    // Trả về thông tin đăng nhập thành công
    res.json({
      message: "Đăng nhập thành công",
      user: {
        nickname: user.nickname,
        id: user._id,
        email: user.email,
      },
      token, // Trả về token
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Hàm lấy thông tin người dùng bằng token
export const getUserByToken = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1]; // Lấy token từ tiêu đề Authorization: Bearer <token>
    if (!token) {
      return res.status(401).json({ message: "Không có token được cung cấp" });
    }

    // Xác minh token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password"); // Không trả về mật khẩu
    if (!user) {
      return res.status(404).json({ message: "Không tìm thấy người dùng" });
    }

    // Trả về thông tin người dùng
    res.json({
      user: {
        nickname: user.nickname,
        id: user._id,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(401).json({ message: "Token không hợp lệ" });
  }
};